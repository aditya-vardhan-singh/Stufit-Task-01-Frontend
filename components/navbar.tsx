"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import { useAuthStore } from "@/store/authStore";

export const Navbar = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const verify = async () => {
      await checkAuth();
    };
    verify();
  }, []);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("isLoggedIn"));
    const handler = () => setLoggedIn(!!localStorage.getItem("isLoggedIn"));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [setLoggedIn]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    window.location.href = "/login";
  };

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Brand & Desktop Nav */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Stufit</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Desktop Auth Buttons */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-default-300 bg-white px-4 py-2 text-sm font-semibold text-primary-600 shadow-sm hover:bg-default-100"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700"
              style={{ border: "none" }}
            >
              Logout
            </button>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu Items */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                href={item.href}
                color="foreground"
                size="lg"
                onClick={() => setIsMenuOpen(false)} // ✅ Auto-close on click
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {!isLoggedIn ? (
            <>
              <NavbarMenuItem>
                <Link
                  href="/login"
                  className="text-primary"
                  size="lg"
                  onClick={() => setIsMenuOpen(false)} // ✅ Auto-close
                >
                  Login
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  href="/signup"
                  className="text-primary"
                  size="lg"
                  onClick={() => setIsMenuOpen(false)} // ✅ Auto-close
                >
                  Signup
                </Link>
              </NavbarMenuItem>
            </>
          ) : (
            <NavbarMenuItem>
              <button
                onClick={handleLogout} // ✅ Auto-close in `handleLogout`
                className="text-danger text-left w-full text-lg"
              >
                Logout
              </button>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
