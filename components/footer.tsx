"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only preview
    alert(`Thank you for subscribing!\nEmail: ${email}\n\n(This is a UI preview - no actual subscription created)`);
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-b from-black/80 to-black border-t border-white/10 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Column 1: Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-6">
              <h3 className="font-display text-3xl font-semibold tracking-wider text-white">
                GRANDEUR
              </h3>
            </Link>
            <p className="text-white/70 leading-relaxed mb-6 font-light">
              Experience timeless luxury and unparalleled hospitality in the heart
              of elegance. Where every moment becomes a cherished memory.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-card/50 text-white/70 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-display text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Rooms & Suites", href: "#rooms" },
                { label: "Restaurant", href: "#restaurant" },
                { label: "Gallery", href: "#gallery" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Our Story", href: "#story" },
                { label: "Book Now", href: "#booking" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 transition-colors duration-300 hover:text-primary inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 group">
                <MapPin className="h-5 w-5 text-primary mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                <span className="leading-relaxed">
                  123 Luxury Boulevard,
                  <br />
                  Beverly Hills, CA 90210
                </span>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-white/70 transition-colors duration-300 hover:text-primary group"
                >
                  <Phone className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@grandeur.com"
                  className="flex items-center gap-3 text-white/70 transition-colors duration-300 hover:text-primary group"
                >
                  <Mail className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <span>info@grandeur.com</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-sm text-white/70">
                <strong className="text-white">Hours:</strong>
                <br />
                24/7 Front Desk Service
                <br />
                Restaurant: 7 AM - 11 PM
              </p>
            </div>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-display text-lg font-semibold text-white mb-4">
              Newsletter
            </h4>
            <p className="text-white/70 mb-4">
              Subscribe to receive exclusive offers, updates, and travel inspiration.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pr-12 bg-background/50 focus:bg-background/80 transition-all duration-300"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 bg-primary hover:bg-primary/90 transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-white/70">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>

            {/* Legal Links */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Cookie Policy", href: "#" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 transition-colors duration-300 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <Separator className="mb-8 bg-border/50" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70"
        >
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Grandeur Hotel. All rights reserved.
            <span className="hidden sm:inline">• Made with</span>
            <Heart className="h-3 w-3 fill-primary text-primary hidden sm:inline" />
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-primary"
            >
              Sitemap
            </Link>
            <span>•</span>
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-primary"
            >
              Accessibility
            </Link>
            <span>•</span>
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-primary"
            >
              Careers
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
}



