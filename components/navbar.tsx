"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, User, Bell, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Rooms", href: "#rooms" },
  { name: "Restaurant", href: "#restaurant" },
  { name: "Gallery", href: "#gallery" },
  { name: "Story", href: "#story" },
  { name: "Contact", href: "#booking" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      {/* Main Navigation Bar */}
      <motion.nav
        animate={{
          backgroundColor: scrolled 
            ? "rgba(0, 0, 0, 0.65)" 
            : "rgba(0, 0, 0, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.4 }}
        style={{
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            {/* Logo - Aligned Left */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center gap-3"
              >
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="font-brand text-3xl font-semibold tracking-wider text-white">
                  GRANDEUR
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center ml-12">
              {navLinks.map((link, index) => (
                <Link key={link.name} href={link.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="relative px-1 py-2 text-base font-medium text-white/90 transition-all duration-300 hover:text-white group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Desktop Icons - Notification & User */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden lg:flex items-center gap-2"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full text-white hover:bg-white/10 transition-colors duration-300"
              >
                <Phone className="h-[29px] w-[29px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full text-white hover:bg-white/10 transition-colors duration-300"
              >
                <Mail className="h-[29px] w-[29px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full text-white hover:bg-white/10 transition-colors duration-300"
              >
                <Bell className="h-[29px] w-[29px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full text-white hover:bg-white/10 transition-colors duration-300"
              >
                <User className="h-[29px] w-[29px]" />
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full text-white hover:bg-white/10"
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isOpen ? (
                        <X className="h-5 w-5" />
                      ) : (
                        <Menu className="h-5 w-5" />
                      )}
                    </motion.div>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] bg-black/95 backdrop-blur-xl border-white/10"
                >
                  <SheetHeader>
                    <SheetTitle className="font-display text-2xl font-bold text-white">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <Separator className="my-6 bg-white/10" />
                  <nav className="flex flex-col space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white hover:pl-6"
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                  <Separator className="my-6 bg-white/10" />
                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-white/10"
                    >
                      <Link href="#booking" onClick={() => setIsOpen(false)}>
                        <User className="mr-2 h-4 w-4" />
                        Account
                      </Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
}

