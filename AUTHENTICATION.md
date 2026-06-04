# Dokumentasi Sistem Autentikasi

## Overview
Sistem autentikasi aplikasi ini menggunakan Supabase dengan field:
- **Nama** (name)
- **Email** (email)
- **Password** (password)
- **Nomor Telepon** (phone_number)

---

## Fungsi-Fungsi Autentikasi

### 1. **register()**
Fungsi untuk mendaftarkan user baru.

**Lokasi:** `src/app/(auth)/action.ts`

**Parameter:**
- `_prevState: AuthFormState` - State sebelumnya
- `formData: FormData` - Form data yang berisi:
  - `name` - Nama lengkap (min 2 karakter)
  - `email` - Email yang valid
  - `password` - Password (min 8 karakter)
  - `phone_number` - Nomor telepon (min 10 digit)

**Return Value:**
```typescript
{
  status: "success" | "error",
  errors?: {
    name?: string[],
    email?: string[],
    password?: string[],
    phone_number?: string[],
    _form?: string[]
  }
}
```

**Validasi:**
- Nama minimal 2 karakter
- Email harus format valid
- Password minimal 8 karakter
- Nomor telepon minimal 10 digit

**Contoh Penggunaan:**
```typescript
import { register } from "@/src/app/(auth)/action";

const [state, formAction, isPending] = useActionState(register, initialState);

// Dalam form
<form action={formAction}>
  <input name="name" required />
  <input name="email" type="email" required />
  <input name="password" type="password" required />
  <input name="phone_number" type="tel" required />
  <button type="submit">Daftar</button>
</form>
```

---

### 2. **login()**
Fungsi untuk login dengan email dan password.

**Lokasi:** `src/app/(auth)/action.ts`

**Parameter:**
- `_prevState: AuthFormState` - State sebelumnya
- `formData: FormData` - Form data yang berisi:
  - `email` - Email user
  - `password` - Password user

**Return Value:**
```typescript
{
  status: "success" | "error",
  errors?: {
    email?: string[],
    password?: string[],
    _form?: string[]
  }
}
```

**Proses:**
1. Validasi email dan password
2. Autentikasi dengan Supabase
3. Ambil data profil dari tabel `profiles`
4. Simpan profil di HTTP-only cookie (7 hari)

**Contoh Penggunaan:**
```typescript
import { login } from "@/src/app/(auth)/action";

const [state, formAction, isPending] = useActionState(login, initialState);

// Dalam form
<form action={formAction}>
  <input name="email" type="email" required />
  <input name="password" type="password" required />
  <button type="submit">Login</button>
</form>
```

---

### 3. **signOut()**
Fungsi untuk logout.

**Lokasi:** `src/app/(auth)/action.ts`

**Proses:**
1. Hapus session dari Supabase
2. Hapus cookie `user_profile`
3. Redirect ke halaman login

**Contoh Penggunaan:**
```typescript
import { signOut } from "@/src/app/(auth)/action";

// Dalam button
<form action={signOut}>
  <button type="submit">Logout</button>
</form>
```

---

## Komponen Form

### LoginPage Component
**Lokasi:** `src/app/(auth)/login/_components/login-page.tsx`

Komponen form login dengan:
- Field: Email, Password
- Validasi client dan server
- Loading state
- Error handling
- Link ke halaman register

**Penggunaan:**
```typescript
import LoginPage from "@/src/app/(auth)/login/_components/login-page";

export default function Page() {
  return <LoginPage />;
}
```

---

### RegisterPage Component
**Lokasi:** `src/app/(auth)/register/_components/register-page.tsx`

Komponen form register dengan:
- Field: Nama, Email, Nomor Telepon, Password
- Validasi client dan server
- Loading state
- Error handling
- Link ke halaman login

**Penggunaan:**
```typescript
import RegisterPage from "@/src/app/(auth)/register/_components/register-page";

export default function Page() {
  return <RegisterPage />;
}
```

---

## Struktur Database (Supabase)

### Table: profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL,
  avatar_url VARCHAR,
  role VARCHAR DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### RLS (Row Level Security) Policy
```sql
-- Semua user bisa baca profil mereka sendiri
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Semua user bisa update profil mereka sendiri
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admin bisa baca semua profil
CREATE POLICY "Admin can read all profiles" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated');
```

---

## Type Definitions

### AuthFormState
```typescript
type AuthFormState = {
  status?: "success" | "error" | "pending";
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    phone_number?: string[];
    role?: string[];
    avatar_url?: string[];
    _form?: string[];
  };
  message?: string;
};
```

### Profile
```typescript
type Profile = {
  id?: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  phone_number?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
};
```

### LoginFormData
```typescript
type LoginFormData = {
  email: string;
  password: string;
};
```

### RegisterFormData
```typescript
type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
};
```

---

## Best Practices

1. **Password Security**
   - Selalu gunakan HTTPS di production
   - Password disimpan ter-hash oleh Supabase
   - Minimal 8 karakter untuk password

2. **Cookie Management**
   - Cookie menggunakan `httpOnly` flag
   - Cookie `secure` hanya di production
   - Cookie expired setelah 7 hari

3. **Validasi**
   - Validasi server-side adalah mandatory
   - Client-side validasi untuk UX yang lebih baik

4. **Error Handling**
   - Jangan expose detail error yang sensitive
   - Tampilkan pesan yang user-friendly

5. **Session Management**
   - Profil disimpan di cookie untuk quick access
   - Gunakan `revalidatePath()` untuk sync state

---

## Flow Diagram

### Register Flow
```
User Input
   ↓
Form Submit
   ↓
Server Action (register)
   ↓
Validate Input
   ↓
Check Email Already Exists
   ↓
Create Auth User (Supabase)
   ↓
Create Profile (profiles table)
   ↓
Redirect to Login
```

### Login Flow
```
User Input (email, password)
   ↓
Form Submit
   ↓
Server Action (login)
   ↓
Validate Input
   ↓
Authenticate (Supabase Auth)
   ↓
Fetch Profile from DB
   ↓
Store Profile in Cookie
   ↓
Redirect to Dashboard
```

---

## Testing Checklist

- [ ] Register dengan data valid
- [ ] Register dengan email yang sudah ada
- [ ] Register dengan password kurang dari 8 karakter
- [ ] Register dengan nomor telepon kurang dari 10 digit
- [ ] Login dengan email dan password valid
- [ ] Login dengan password salah
- [ ] Login dengan email yang tidak terdaftar
- [ ] Logout berhasil
- [ ] Cookie tersimpan dengan benar
- [ ] Redirect sesuai status

---

## Troubleshooting

### "Email sudah terdaftar"
- Gunakan email yang berbeda
- Atau reset password jika lupa

### "Email atau password salah"
- Pastikan email dan password benar
- Case-sensitive untuk password

### "Nomor telepon tidak valid"
- Gunakan format internasional atau lokal
- Minimal 10 digit

### Cookie tidak tersimpan
- Pastikan menggunakan HTTPS di production
- Check browser settings untuk cookie
