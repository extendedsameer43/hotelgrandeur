import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Rooms } from "@/components/sections/rooms";
import { Restaurant } from "@/components/sections/restaurant";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Awards } from "@/components/sections/awards";
import { Story } from "@/components/sections/story";
import { BookingForm } from "@/components/sections/booking-form";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { SectionSeparator } from "@/components/section-separator";

export default function Home() {
  return (
    <>
      {/* Fixed Background for entire page */}
      <div className="fixed inset-0 -z-50">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070"
            alt="Luxury Hotel Background"
            className="h-full w-full object-cover brightness-[0.4]"
          />
        </div>
        
        {/* Enhanced gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        
        {/* Subtle noise texture for premium feel */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section - Full Screen */}
        <Hero />

        {/* Rooms Section */}
        <div className="relative">
          <Rooms />
          <SectionSeparator />
        </div>

        {/* Restaurant Section */}
        <div className="relative">
          <Restaurant />
          <SectionSeparator />
        </div>

        {/* Gallery Section */}
        <div className="relative">
          <Gallery />
          <SectionSeparator />
        </div>

        {/* Testimonials Section */}
        <div className="relative">
          <Testimonials />
          <SectionSeparator />
        </div>

        {/* Awards Section */}
        <div className="relative">
          <Awards />
          <SectionSeparator />
        </div>

        {/* Story Section */}
        <div className="relative">
          <Story />
          <SectionSeparator />
        </div>

        {/* Booking Form Section */}
        <div className="relative">
          <BookingForm />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}
