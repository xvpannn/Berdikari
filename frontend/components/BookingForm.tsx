"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ArrowRight, Calendar, CheckCircle2, PhoneCall, Send, RotateCcw, X, Info, Clock } from 'lucide-react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const API_BASE = "http://localhost:5000/api";

export default function BookingForm() {
  const { scrollToId } = useSmoothScroll();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [blockedDates, setBlockedDates] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ date: '', reason: '' });
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', whatsapp: '', topic: 'BUILDING', description: '', bookingTime: '09:00'
  });
  const [occupiedSlots, setOccupiedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  useEffect(() => {
    const fetchBlocked = async () => {
      try {
        const res = await axios.get(`${API_BASE}/availability`);
        setBlockedDates(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlocked();
  }, []);

  useEffect(() => {
    const fetchOccupied = async () => {
      if (!selectedDate) {
        setOccupiedSlots([]);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE}/bookings/occupied?date=${selectedDate.toISOString()}`);
        setOccupiedSlots(res.data);
        const available = timeSlots.find(slot => !res.data.includes(slot));
        if (available) {
          setFormData(prev => ({ ...prev, bookingTime: available }));
        }
      } catch (err) {
        console.error("Gagal mengecek jadwal terisi:", err);
      }
    };
    fetchOccupied();
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Silakan pilih tanggal konsultasi.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/bookings`, {
        ...formData,
        bookingDate: selectedDate,
        bookingTime: formData.bookingTime
      });
      setMessage(`Jadwal terkirim untuk jam ${formData.bookingTime} WITA! Kami akan segera menghubungi Anda.`);
      setFormData({ name: '', company: '', email: '', whatsapp: '', topic: 'BUILDING', description: '', bookingTime: '09:00' });
      setSelectedDate(undefined);
    } catch (err) {
      alert("Gagal mengirim jadwal.");
    } finally {
      setLoading(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    // Blokir Sabtu (6) dan Minggu (0)
    const day = date.getDay();
    if (day === 0 || day === 6) return true;

    return !!blockedDates.find(b => {
      const d = new Date(b.date);
      return d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate();
    });
  };

  const handleDayClick = (day: Date) => {
    // Cek apakah weekend
    const dayOfWeek = day.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setModalContent({
        date: format(day, 'PPPP'),
        reason: "Kantor kami tutup pada hari Sabtu & Minggu. Silakan pilih hari kerja (Senin - Jumat) untuk sesi konsultasi."
      });
      setShowModal(true);
      return;
    }

    const blocked = blockedDates.find(b => {
      const d = new Date(b.date);
      return d.getFullYear() === day.getFullYear() && d.getMonth() === day.getMonth() && d.getDate() === day.getDate();
    });
    if (blocked) {
      setModalContent({
        date: format(day, 'PPPP'),
        reason: blocked.reason || "Tanggal ini sedang tidak tersedia."
      });
      setShowModal(true);
    }
  };

  return (
    <section id="booking-card" className="py-24 bg-white relative overflow-hidden">
      
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-cakep-maroon transition-colors">
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-50 text-cakep-maroon p-4 rounded-2xl">
                <Info size={32} />
              </div>
              <h3 className="text-2xl font-black text-cakep-heading tracking-tight uppercase">Jadwal Tutup</h3>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
              <span className="font-black text-cakep-heading block mb-2 text-sm">{modalContent.date}</span>
              <p className="text-sm text-slate-500 italic font-serif leading-relaxed">{modalContent.reason}</p>
            </div>
            <button onClick={() => setShowModal(false)} className="w-full py-5 text-[10px] font-black tracking-[0.2em] text-white bg-cakep-maroon hover:bg-cakep-heading rounded-xl transition-all duration-500 uppercase">
              Pilih Tanggal Lain
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row bg-white rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-100">
          
          {/* Left Side: Form */}
          <div className="lg:w-3/5 p-10 lg:p-20">
            <div className="space-y-12">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                     <span className="w-1.5 h-1.5 bg-cakep-maroon rounded-full animate-pulse" />
                     <span className="text-[9px] font-black tracking-[0.3em] text-slate-400 uppercase">Strategic Meeting</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-cakep-heading tracking-tighter uppercase leading-none">
                     Jadwalkan <br />
                     <span className="text-cakep-maroon italic font-serif font-light lowercase">Konsultasi Anda</span>
                  </h2>
                  <div className="flex flex-col gap-4">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={14} className="text-cakep-maroon" /> Operasional: Senin - Jumat (09:00 - 17:00 WITA)
                     </p>
                     
                     <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                           <span className="text-[9px] font-black tracking-[0.2em] text-cakep-heading uppercase">Live Support Available</span>
                        </div>
                        <h4 className="font-bold text-cakep-heading text-sm">Ada Pertanyaan Mendalam?</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                           Bagi Anda yang berada di Denpasar dan ingin konsultasi tatap muka langsung di kantor kami, harap hubungi tim kami melalui WhatsApp terlebih dahulu untuk pengaturan jadwal pertemuan offline.
                        </p>
                        <a 
                           href="https://wa.me/628976767762" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-3 text-cakep-maroon font-black text-[10px] tracking-[0.2em] uppercase hover:gap-5 transition-all duration-300"
                        >
                           WhatsApp Berdikari Consultant <ArrowRight size={14} />
                        </a>
                        <p className="text-[8px] font-bold text-slate-300 italic uppercase">Respons cepat dalam jam kerja operasional (WITA)</p>
                     </div>
                  </div>
               </div>

               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Layanan</label>
                        <select 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-cakep-heading focus:outline-none focus:border-cakep-maroon transition-all text-sm appearance-none"
                          value={formData.topic}
                          onChange={e => setFormData({ ...formData, topic: e.target.value })}
                        >
                           <option value="BUILDING">Perizinan Bangunan (PBG/SLF)</option>
                           <option value="LEGAL">Legalitas Usaha (PT/CV/NIB)</option>
                           <option value="FOREIGN">Tenaga Kerja Asing (KITAS)</option>
                           <option value="CONSULTANCY">Konsultasi Bisnis Strategis</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Nama Lengkap</label>
                        <input 
                          required 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-cakep-heading focus:outline-none focus:border-cakep-maroon transition-all text-sm placeholder:text-slate-300" 
                          placeholder="Nama Anda"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Email Address</label>
                        <input 
                          required 
                          type="email"
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-cakep-heading focus:outline-none focus:border-cakep-maroon transition-all text-sm placeholder:text-slate-300" 
                          placeholder="email@perusahaan.com"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Whatsapp / Telepon</label>
                        <input 
                          required 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-cakep-heading focus:outline-none focus:border-cakep-maroon transition-all text-sm placeholder:text-slate-300" 
                          placeholder="0812..."
                          value={formData.whatsapp}
                          onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Perusahaan (Opsional)</label>
                        <input 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-cakep-heading focus:outline-none focus:border-cakep-maroon transition-all text-sm placeholder:text-slate-300" 
                          placeholder="Nama PT/CV"
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Kebutuhan Detail</label>
                     <textarea 
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-cakep-heading focus:outline-none focus:border-cakep-maroon transition-all text-sm placeholder:text-slate-300 resize-none" 
                        placeholder="Contoh: Pengurusan SLF untuk Villa di Canggu..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                     />
                  </div>

                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full group bg-cakep-heading hover:bg-cakep-maroon text-white font-black py-6 rounded-2xl transition-all duration-700 shadow-xl shadow-cakep-heading/20 hover:shadow-cakep-maroon/20 flex items-center justify-center gap-4 text-[10px] tracking-[0.3em] uppercase"
                  >
                    {loading ? "MENGIRIM..." : "KONFIRMASI JADWAL"} <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>

                  {message && (
                    <div className="p-5 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-4 animate-fade-in">
                       <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                          <CheckCircle2 size={20} />
                       </div>
                       <p className="text-sm font-bold text-green-700">{message}</p>
                    </div>
                  )}
               </form>
            </div>
          </div>

          {/* Right Side: Calendar */}
          <div className="lg:w-2/5 bg-slate-50 p-10 lg:p-16 flex flex-col items-center">
            <div className="w-full space-y-10">
               <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-cakep-heading tracking-tight uppercase">Pilih Waktu</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Sesuaikan dengan ketersediaan Anda</p>
               </div>

               <div className="bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-xl inline-block w-full scale-100 lg:scale-110 origin-top">
                  <style>{`
                    .rdp { --rdp-cell-size: 42px; margin: 0; }
                    .rdp-day_selected { background-color: #800000 !important; color: white !important; font-weight: 900; border-radius: 12px; }
                    .rdp-day:hover:not(.rdp-day_selected) { background-color: #F1F5F9 !important; border-radius: 12px; }
                    .rdp-month { width: 100%; display: flex; flex-direction: column; align-items: center; }
                  `}</style>
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onDayClick={handleDayClick}
                    onSelect={setSelectedDate}
                    disabled={isDateDisabled}
                  />
               </div>

               {selectedDate && (
                 <div className="space-y-6 animate-fade-in-up">
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl">
                       <span className="font-black text-cakep-heading text-sm px-4">{format(selectedDate, 'PP')}</span>
                       <button onClick={() => setSelectedDate(undefined)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                          <RotateCcw size={18} />
                       </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                       {timeSlots.map((time) => {
                         const isOccupied = occupiedSlots.includes(time);
                         return (
                           <button
                             key={time}
                             type="button"
                             disabled={isOccupied}
                             onClick={() => setFormData({ ...formData, bookingTime: time })}
                             className={`py-3 rounded-xl text-[10px] font-black transition-all border ${
                               isOccupied 
                               ? 'bg-slate-100 text-slate-300 border-slate-100 opacity-50 cursor-not-allowed'
                               : formData.bookingTime === time
                               ? 'bg-cakep-maroon text-white border-cakep-maroon shadow-lg shadow-cakep-maroon/20'
                               : 'bg-white text-slate-400 border-slate-200 hover:border-cakep-maroon hover:text-cakep-maroon'
                             }`}
                           >
                             {time}
                           </button>
                         );
                       })}
                    </div>
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* Floating Map Anchor */}
        <div className="mt-12 text-center">
           <div className="inline-flex items-center gap-6 px-10 py-5 bg-white border border-slate-100 rounded-full shadow-lg">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-cakep-maroon animate-ping" />
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Head Office — Denpasar, Bali</p>
              </div>
              <a href="https://maps.app.goo.gl/aVF2ixGZfSrQU3tB6" target="_blank" rel="noopener noreferrer" className="text-cakep-heading font-black text-[10px] uppercase tracking-widest hover:text-cakep-maroon transition-colors">BUKA GOOGLE MAPS</a>
           </div>
        </div>
      </div>

      {/* Google Maps Section */}
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl mt-12 mb-24">
        <div className="rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-100 relative h-[450px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.2013165416483!2d115.21452149999999!3d-8.672396099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd240eaf170c5a5%3A0xd44a7367f47fa1e1!2sJl.%20Pulau%20Selayar%20No.18%2C%20Dauh%20Puri%20Klod%2C%20Kec.%20Denpasar%20Bar.%2C%20Kota%20Denpasar%2C%20Bali%2080113!5e0!3m2!1sid!2sid!4v1773538072860!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Berdikari Consultant - Jl. Pulau Selayar No.18 Denpasar"
          />
        </div>
      </div>
    </section>
  );
}
