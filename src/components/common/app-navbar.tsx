"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LogIn, LogOut, UserPlus, UserCircle, User } from "lucide-react";
import { NAVBAR_LIST } from "@/src/constants/navbar-constant";
import { useAuthStore } from "@/src/stores/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/src/app/(auth)/action";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../dark-mode-toggle";

const NAV_LINKS = NAVBAR_LIST.filter(
  (item) => item.title !== "Login" && item.title !== "Register",
);

export default function Navbar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  const isLoggedIn = !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight">
            🏸 CourtBook
          </span>
        </Link>

        {/* Nav Links */}
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.url;
              return (
                <NavigationMenuItem key={link.url}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.url}
                      className={cn(
                        // Base
                        "relative inline-flex h-9 items-center rounded-lg px-2.5 py-1.5 text-xs/relaxed font-medium transition-colors focus:outline-none",
                        // Warna teks
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                        // Hapus bg hover bawaan, kita pakai underline
                        "hover:bg-transparent focus:bg-transparent",
                        // Group untuk animasi underline
                        "group/navlink",
                      )}
                    >
                      {link.title}

                      {/* Animated underline */}
                      <span
                        className={cn(
                          "absolute bottom-0.5 left-2.5 h-[2px] rounded-full bg-primary transition-all duration-300 ease-out",
                          // Active: garis penuh, Hover: animasi dari 0 ke penuh
                          isActive
                            ? "w-[calc(100%-20px)]"
                            : "w-0 group-hover/navlink:w-[calc(100%-20px)]",
                        )}
                      />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
            <ModeToggle />
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Section */}
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              {isLoggedIn ? (
                <>
                  <NavigationMenuTrigger className="gap-2 px-2.5">
                    <Avatar className="size-6">
                      <AvatarImage
                        src={profile.avatar_url ?? undefined}
                        alt={profile.name ?? "User"}
                      />
                      <AvatarFallback className="text-[10px] font-semibold">
                        {profile.name?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-xs sm:inline">
                      {profile.name?.split(" ")[0] ?? "Profile"}
                    </span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="right-0 left-auto min-w-48">
                    <div className="border-b border-border/60 px-3 py-2.5">
                      <p className="text-xs font-medium">{profile.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-1">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs transition-colors hover:bg-muted"
                        >
                          <User className="size-4 text-muted-foreground" />
                          Lihat Profil
                        </Link>
                      </NavigationMenuLink>

                      <button
                        onClick={() => signOut()}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="size-4" />
                        Logout
                      </button>
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <>
                  <NavigationMenuTrigger className="gap-2 px-2.5">
                    <UserCircle className="size-4" />
                    <span className="hidden text-xs sm:inline">Login</span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="right-0 left-auto min-w-40">
                    <div className="p-1">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/login"
                          className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs transition-colors hover:bg-muted"
                        >
                          <LogIn className="size-4 text-muted-foreground" />
                          Login
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/register"
                          className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs transition-colors hover:bg-muted"
                        >
                          <UserPlus className="size-4 text-muted-foreground" />
                          Register
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
