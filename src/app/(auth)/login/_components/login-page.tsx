"use client";

import { login } from "@/src/app/(auth)/action";
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

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(login, initialState);

  useEffect(() => {
    if (state?.status === "success") {
      router.push("/dashboard");
    }
  }, [state?.status, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Masukkan email dan password Anda</CardDescription>
        </CardHeader>

        <form action={formAction} className="space-y-4 p-6">
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
          </div>

          {/* Form Error */}
          {state?.errors?._form && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
              <p className="text-sm text-red-600 dark:text-red-400">
                {state.errors._form[0]}
              </p>
            </div>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? "Sedang login..." : "Login"}
          </Button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Daftar di sini
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
