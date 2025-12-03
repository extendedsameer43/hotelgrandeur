"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Hotel, Mail, Phone, User, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Reveal } from "@/components/magicui/reveal";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  checkIn: z.date({
    message: "Please select a check-in date",
  }),
  checkOut: z.date({
    message: "Please select a check-out date",
  }),
  guests: z.string({
    message: "Please select number of guests",
  }).min(1, "Please select number of guests"),
  roomType: z.string({
    message: "Please select a room type",
  }).min(1, "Please select a room type"),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number",
  }),
});

export function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: "",
      roomType: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!formRef.current) return;

    const fields = formRef.current.querySelectorAll(".form-field");

    // Sequential input reveals
    gsap.fromTo(
      fields,
      { opacity: 0, x: -30, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // UI-only: Show alert with form data
    alert(
      `Booking Preview:\n\nCheck-in: ${format(values.checkIn, "PPP")}\nCheck-out: ${format(values.checkOut, "PPP")}\nGuests: ${values.guests}\nRoom: ${values.roomType}\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\n\n(This is a UI preview - no actual booking created)`
    );
    console.log(values);
  }

  return (
    <section
      id="booking"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Section Header */}
        <Reveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 bg-primary/5 text-primary"
            >
              <Hotel className="mr-1 h-3 w-3" />
              Book Your Stay
            </Badge>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
              Reserve Your
              <span className="block text-primary">Perfect Escape</span>
            </h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-white">
              Complete the form below to check availability and reserve your luxury
              accommodation. Our team will confirm your booking within 24 hours.
            </p>
          </motion.div>
        </Reveal>

        {/* Booking Form Card */}
        <Reveal delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Glassmorphism Card */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/50 via-black/40 to-black/50 backdrop-blur-2xl p-8 md:p-12 shadow-2xl">
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 h-20 w-20 border-t-2 border-l-2 border-primary/20 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 h-20 w-20 border-b-2 border-r-2 border-primary/20 rounded-br-3xl" />

              <Form {...form}>
                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Date Selection */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Check-in Date */}
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem className="form-field flex flex-col">
                          <FormLabel className="text-white font-semibold flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                            Check-in Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal h-12 bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30 text-white transition-all duration-300",
                                    !field.value && "text-white/60"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date(new Date().setHours(0, 0, 0, 0))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Check-out Date */}
                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem className="form-field flex flex-col">
                          <FormLabel className="text-white font-semibold flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                            Check-out Date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal h-12 bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30 text-white transition-all duration-300",
                                    !field.value && "text-white/60"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date(new Date().setHours(0, 0, 0, 0))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Room & Guests Selection */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Number of Guests */}
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem className="form-field">
                          <FormLabel className="text-white font-semibold flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            Number of Guests
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30 text-white transition-all duration-300">
                                <SelectValue placeholder="Select guests" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Guest</SelectItem>
                              <SelectItem value="2">2 Guests</SelectItem>
                              <SelectItem value="3">3 Guests</SelectItem>
                              <SelectItem value="4">4 Guests</SelectItem>
                              <SelectItem value="5+">5+ Guests</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Room Type */}
                    <FormField
                      control={form.control}
                      name="roomType"
                      render={({ field }) => (
                        <FormItem className="form-field">
                          <FormLabel className="text-white font-semibold flex items-center gap-2">
                            <Hotel className="h-4 w-4 text-primary" />
                            Room Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30 text-white transition-all duration-300">
                                <SelectValue placeholder="Select room type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="deluxe">
                                Deluxe Room - $299/night
                              </SelectItem>
                              <SelectItem value="super-deluxe">
                                Super Deluxe - $499/night
                              </SelectItem>
                              <SelectItem value="suite">
                                Luxury Suite - $899/night
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Guest Information */}
                  <div className="space-y-6">
                    <div className="border-t border-border/50 pt-6">
                      <h3 className="font-display text-xl font-semibold text-white mb-6">
                        Guest Information
                      </h3>
                    </div>

                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="form-field">
                          <FormLabel className="text-white font-semibold flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="h-12 bg-white/5 focus:bg-white/10 border-white/20 focus:border-white/30 text-white placeholder:text-white/40 transition-all duration-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email & Phone */}
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="form-field">
                            <FormLabel className="text-white font-semibold flex items-center gap-2">
                              <Mail className="h-4 w-4 text-primary" />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                className="h-12 bg-white/5 focus:bg-white/10 border-white/20 focus:border-white/30 text-white placeholder:text-white/40 transition-all duration-300"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Phone */}
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="form-field">
                            <FormLabel className="text-white font-semibold flex items-center gap-2">
                              <Phone className="h-4 w-4 text-primary" />
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                className="h-12 bg-white/5 focus:bg-white/10 border-white/20 focus:border-white/30 text-white placeholder:text-white/40 transition-all duration-300"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pt-6"
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Check Availability & Reserve
                    </Button>
                    <p className="text-center text-sm text-white mt-4">
                      💳 No payment required now • Free cancellation up to 24 hours
                      before check-in
                    </p>
                  </motion.div>
                </form>
              </Form>
            </div>

            {/* Quick Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-white mb-3">
                Need assistance? Our team is here to help
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-primary hover:underline transition-all duration-300"
                >
                  <Phone className="h-4 w-4" />
                  +1 (234) 567-890
                </a>
                <a
                  href="mailto:reservations@hotel.com"
                  className="flex items-center gap-2 text-primary hover:underline transition-all duration-300"
                >
                  <Mail className="h-4 w-4" />
                  reservations@hotel.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}






