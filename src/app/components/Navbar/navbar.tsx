"use client";
import Link, { LinkProps } from "next/link";
import React, { HtmlHTMLAttributes, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";

import clsx from "clsx";
import { Courgette } from "next/font/google";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const courgette = Courgette({ weight: "400", subsets: ["latin"] });
const Navbar = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <nav className="flex justify-between max-w-[900px] m-auto py-4 items-center">
        <Link className={`${courgette.className} text-4xl`} href="/">
          TripShop
        </Link>
        <div className="space-x-6">
          <Link
            className={clsx("hover:border-b-2 border-primary max-md:hidden", {
              "border-b-2": pathname === "/products",
            })}
            href="/products"
          >
            Products
          </Link>

          {user ? (
            <Link
              className={`hover:border-b-2 border-primary max-md:hidden`}
              href="/api/auth/logout"
            >
              Logout
            </Link>
          ) : (
            <Link
              className="hover:border-b-2 border-primary max-md:hidden"
              href="/api/auth/login"
            >
              Login
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
