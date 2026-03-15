"use client";

import React from 'react';
import HeroSection from '../../components/HeroSection';
import ServicesGrid from '../../components/ServicesGrid';
import AboutSection from '../../components/AboutSection';
import RecentCases from '../../components/RecentCases';
import PanicBanner from '../../components/PanicBanner';
import BookingForm from '../../components/BookingForm';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-cakep-maroon selection:text-white">
      <HeroSection />
      <ServicesGrid />
      <AboutSection />
      <RecentCases />
      <PanicBanner />
      <BookingForm />
      <Footer />
    </main>
  );
}
