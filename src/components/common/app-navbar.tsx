"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  LogIn,
  LogOut,
  UserPlus,
  UserCircle,
  User,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { NAVBAR_LIST } from "@/src/constants/navbar-constant";
import { useAuthStore } from "@/src/stores/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/src/app/(auth)/action";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../dark-mode-toggle";
import { useActiveSection } from "@/src/hooks/use-active-session";

const NAV_LINKS = NAVBAR_LIST.filter(
  (item) => item.title !== "Login" && item.title !== "Register",
);

const HOME_SECTION_IDS = NAV_LINKS.filter((l) => l.sectionId).map(
  (l) => l.sectionId as string,
);

export default function Navbar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = !!user;
  const isHomePage = pathname === "/";

  const activeSection = useActiveSection(isHomePage ? HOME_SECTION_IDS : []);

  // Tutup mobile menu saat route berubah
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Cegah scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isLinkActive = (link: (typeof NAV_LINKS)[0]): boolean => {
    if (isHomePage && link.sectionId) {
      return activeSection === link.sectionId;
    }
    return pathname === link.url;
  };

  const getLinkHref = (link: (typeof NAV_LINKS)[0]): string => {
    if (isHomePage && link.sectionId) {
      return `#${link.sectionId}`;
    }
    return link.url;
  };

  return (
    <>
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

          {/* Desktop Nav Links */}
          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList className="gap-0.5">
              {NAV_LINKS.map((link) => {
                const isActive = isLinkActive(link);
                const href = getLinkHref(link);
                return (
                  <NavigationMenuItem key={link.url}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
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

          {/* Desktop Auth Section */}
          <NavigationMenu viewport={false} className="hidden md:flex">
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

          {/* Mobile Right Side: ModeToggle + Hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <ModeToggle />
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  "absolute transition-all duration-200",
                  mobileOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90",
                )}
              >
                <X className="size-5" />
              </span>
              <span
                className={cn(
                  "absolute transition-all duration-200",
                  mobileOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0",
                )}
              >
                <Menu className="size-5" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel */}
      <aside
        className={cn(
          "fixed right-0 top-14 z-40 h-[calc(100dvh-3.5rem)] w-72 border-l border-border bg-background transition-transform duration-300 ease-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto px-4 py-5">
          {/* Nav Links */}
          <nav className="flex flex-col gap-1">
            <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Menu
            </p>
            {NAV_LINKS.map((link, i) => {
              const isActive = isLinkActive(link);
              const href = getLinkHref(link);
              return (
                <Link
                  key={link.url}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={cn(
                    "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <span>{link.title}</span>
                  <ChevronRight
                    className={cn(
                      "size-3.5 transition-transform duration-200 group-hover:translate-x-0.5",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-4 h-px w-full bg-border" />

          {/* Auth Section Mobile */}
          {isLoggedIn ? (
            <div className="flex flex-col gap-1">
              <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Akun
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2.5">
                <Avatar className="size-8">
                  <AvatarImage
                    src={profile.avatar_url ?? undefined}
                    alt={profile.name ?? "User"}
                  />
                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    {profile.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {profile.name}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <User className="size-4 text-muted-foreground" />
                Lihat Profil
              </Link>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  signOut();
                }}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Akun
              </p>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <LogIn className="size-4 text-muted-foreground" />
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <UserPlus className="size-4 text-muted-foreground" />
                Register
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
