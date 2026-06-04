"use server";

import { createClient } from "@/src/lib/supabase/server";
import { AuthFormState } from "@/src/types/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Validasi email
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validasi password (minimal 8 karakter)
const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

// Validasi nomor telepon (minimal 10 digit)
const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\d{10,}$/;
  return phoneRegex.test(phoneNumber.replace(/\D/g, ""));
};

/**
 * Register user baru dengan nama, email, password, dan nomor telepon
 */
export async function register(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const supabase = await createClient();

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const phoneNumber = formData.get("phone_number")?.toString().trim();

  // Validasi input
  const errors: Record<string, string[]> = {};

  if (!name || name.length < 2) {
    errors.name = ["Nama minimal 2 karakter"];
  }

  if (!email || !validateEmail(email)) {
    errors.email = ["Email tidak valid"];
  }

  if (!password || !validatePassword(password)) {
    errors.password = ["Password minimal 8 karakter"];
  }

  if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
    errors.phone_number = ["Nomor telepon tidak valid (minimal 10 digit)"];
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  try {
    // 1. Cek apakah email sudah terdaftar
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email!)
      .single();

    if (existingUser) {
      return {
        status: "error",
        errors: { email: ["Email sudah terdaftar"] },
      };
    }

    // 2. Daftar user di Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email!,
      password: password!,
      options: {
        data: {
          name: name,
          phone_number: phoneNumber,
        },
      },
    });

    if (authError || !authData.user) {
      return {
        status: "error",
        errors: { _form: [authError?.message || "Gagal mendaftarkan akun"] },
      };
    }

    // 3. Simpan profil user di tabel profiles
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email: email,
      name: name,
      phone_number: phoneNumber,
      role: "user",
    });

    if (profileError) {
      // Hapus user yang baru dibuat jika gagal menyimpan profil
      await supabase.auth.admin.deleteUser(authData.user.id);
      return {
        status: "error",
        errors: {
          _form: ["Gagal menyimpan profil pengguna"],
        },
      };
    }

    // Redirect ke halaman login atau verifikasi email
    return {
      status: "success",
    };
  } catch (error) {
    console.error("Register error:", error);
    return {
      status: "error",
      errors: {
        _form: ["Terjadi kesalahan saat mendaftar"],
      },
    };
  }
}

/**
 * Login user dengan email dan password
 */
export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const supabase = await createClient();

  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  // Validasi input
  const errors: Record<string, string[]> = {};

  if (!email || !validateEmail(email)) {
    errors.email = ["Email tidak valid"];
  }

  if (!password || password.length === 0) {
    errors.password = ["Password harus diisi"];
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  try {
    // 1. Login dengan email dan password
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: email!,
        password: password!,
      });

    if (authError || !authData.user) {
      return {
        status: "error",
        errors: {
          _form: [authError?.message || "Email atau password salah"],
        },
      };
    }

    // 2. Ambil profil user
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      return {
        status: "error",
        errors: {
          _form: ["Gagal mengambil data profil"],
        },
      };
    }

    // 3. Simpan profil di cookie
    const cookiesStore = await cookies();
    cookiesStore.set("user_profile", JSON.stringify(profile), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    revalidatePath("/", "layout");
    return { status: "success" };
  } catch (error) {
    console.error("Login error:", error);
    return {
      status: "error",
      errors: {
        _form: ["Terjadi kesalahan saat login"],
      },
    };
  }
}

export async function signOut() {
  const supabase = await createClient();
  const cookiesStore = await cookies();

  try {
    await supabase.auth.signOut();
    cookiesStore.delete("user_profile");
    revalidatePath("/", "layout");
  } catch (error) {
    console.error("Error signing out:", error);
  }
  redirect("/login");
}
