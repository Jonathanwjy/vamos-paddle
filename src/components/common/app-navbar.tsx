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
        <Link href="/" className="flex items-center gap-1">
          <span className="text-sm font-black tracking-tight text-foreground">
            Court
          </span>
          <span className="text-sm font-black tracking-tight text-primary">
            Book
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
                        "group/navlink relative inline-flex h-9 items-center rounded-lg px-2.5 py-1.5 text-xs/relaxed font-medium transition-colors focus:outline-none",
                        "hover:bg-transparent focus:bg-transparent",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {link.title}
                      <span
                        className={cn(
                          "absolute bottom-0.5 left-2.5 h-[2px] rounded-full bg-primary transition-all duration-300 ease-out",
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
                  <NavigationMenuTrigger className="gap-2 px-2.5 text-foreground">
                    <Avatar className="size-6">
                      <AvatarImage
                        src={profile.avatar_url ?? undefined}
                        alt={profile.name ?? "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
                        {profile.name?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-xs text-foreground sm:inline">
                      {profile.name?.split(" ")[0] ?? "Profile"}
                    </span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="left-auto right-0 min-w-48 rounded-xl border border-border bg-popover text-popover-foreground shadow-md">
                    {/* User info header */}
                    <div className="border-b border-border px-3 py-2.5">
                      <p className="text-xs font-semibold text-popover-foreground">
                        {profile.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-1">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <User className="size-4 text-muted-foreground" />
                          Lihat Profil
                        </Link>
                      </NavigationMenuLink>

                      <button
                        onClick={() => signOut()}
                        className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <LogOut className="size-4" />
                        Logout
                      </button>
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <>
                  <NavigationMenuTrigger className="gap-2 px-2.5 text-foreground">
                    <UserCircle className="size-4 text-muted-foreground" />
                    <span className="hidden text-xs text-foreground sm:inline">
                      Login
                    </span>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="left-auto right-0 min-w-40 rounded-xl border border-border bg-popover text-popover-foreground shadow-md">
                    <div className="p-1">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/login"
                          className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <LogIn className="size-4 text-muted-foreground" />
                          Login
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/register"
                          className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
