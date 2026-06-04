"use client";

import { register } from "@/src/app/(auth)/action";
import { AuthFormState } from "@/src/types/auth";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthFormState = {
  status: undefined,
  errors: {},
};

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(register, initialState);

  useEffect(() => {
    if (state?.status === "success") {
      router.push("/login?registered=true");
    }
  }, [state?.status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Daftar</CardTitle>
          <CardDescription>Buat akun baru Anda</CardDescription>
        </CardHeader>

        <form action={formAction} className="space-y-4 p-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              disabled={isPending}
              aria-describedby="name-error"
            />
            {state?.errors?.name && (
              <p id="name-error" className="text-sm text-red-500">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
              disabled={isPending}
              aria-describedby="email-error"
            />
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="space-y-2">
            <Label htmlFor="phone_number">Nomor Telepon</Label>
            <Input
              id="phone_number"
              name="phone_number"
              type="tel"
              placeholder="+62812345678"
              required
              disabled={isPending}
              aria-describedby="phone-error"
            />
            {state?.errors?.phone_number && (
              <p id="phone-error" className="text-sm text-red-500">
                {state.errors.phone_number[0]}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isPending}
              aria-describedby="password-error"
            />
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )}
            <p className="text-xs text-gray-500">Minimal 8 karakter</p>
          </div>

          {/* Form Error */}
          {state?.errors?._form && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
              <p className="text-sm text-red-600 dark:text-red-400">
                {state.errors._form[0]}
              </p>
            </div>
          )}

          {/* Register Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Sedang mendaftar..." : "Daftar"}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Login di sini
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
