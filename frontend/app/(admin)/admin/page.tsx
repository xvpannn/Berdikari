"use client";

import React, { useState, useEffect } from 'react';
import BookingTable from './BookingTable';
import AvailabilityCalendar from './AvailabilityCalendar';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Apabila sudah ada key tersimpan di session, langsung boleh masuk
    const savedKey = sessionStorage.getItem('adminKey');
    if (savedKey) {
      setIsAuthenticated(true);
      return;
    }

    // Jika belum ada, munculkan prompt untuk input API KEY (bukan password lama)
    const pass = prompt("Masukkan Kunci Rahasia Admin:");
    if (pass) {
      sessionStorage.setItem('adminKey', pass);
      setIsAuthenticated(true);
    } else {
      alert("Akses Ditolak.");
      window.location.href = '/';
    }
  }, []);

  if (!isAuthenticated) return <div className="min-h-screen bg-cakep-maroon-dark flex items-center justify-center text-white font-bold text-2xl tracking-widest animate-pulse">MEMBUTUHKAN AKSES ADMIN...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="container mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b-2 border-slate-200 pb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-cakep-maroon-dark tracking-tighter notranslate" translate="no">
              CAKEP <span className="text-slate-300 font-light mx-2">|</span> <span className="text-cakep-maroon font-bold">Berdikari Consultant Admin</span>
            </h1>
            <p className="text-sm text-slate-400 mt-2 font-medium tracking-wide">Business Licensing & Strategic Consultancy Management</p>
          </div>
          <div className="mt-6 md:mt-0 flex gap-4">
            <a href="/" className="px-6 py-2 border border-cakep-maroon-dark text-cakep-maroon-dark text-[10px] font-black uppercase tracking-widest hover:bg-cakep-maroon-dark hover:text-white transition rounded-full">Lihat Website Utama</a>
            <button onClick={() => { sessionStorage.removeItem('adminKey'); window.location.reload(); }} className="px-6 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition rounded-full">Keluar</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <BookingTable />
          <AvailabilityCalendar />
        </div>

        <footer className="mt-16 text-center text-slate-400 text-[10px]">
          <p className="font-black tracking-[0.3em] uppercase mb-1 notranslate" translate="no">CAKEP | Berdikari Consultant Internal System</p>
          <p>© 2026 Powered by Gemini CLI Strategy.</p>
        </footer>
      </div>
    </div>
  );
}
