"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, Clock, Video, Send, X, ExternalLink } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function BookingTable() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [zoomUrl, setZoomUrl] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [isApproving, setIsApproving] = useState(false);

  const fetchBookings = async () => {
    try {
      const savedKey = sessionStorage.getItem('adminKey');
      const res = await axios.get(`${API_BASE}/admin/bookings`, {
        headers: { 'x-api-key': savedKey }
      });
      setBookings(res.data);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        alert("Sandi Admin salah, silahkan muat ulang halaman.");
        sessionStorage.removeItem('adminKey');
        window.location.reload();
      } else {
        console.error("Gagal mengambil data booking", err);
      }
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await axios.patch(`${API_BASE}/admin/bookings/${id}/status`, { status: newStatus }, {
        headers: { 'x-api-key': sessionStorage.getItem('adminKey') }
      });
      fetchBookings();
    } catch (err) {
      alert("Gagal memperbarui status.");
    }
  };

  const handleApproveSubmit = async () => {
    if (!zoomUrl) return alert("Harap masukkan Link Zoom!");
    setIsApproving(true);
    try {
      await axios.post(`${API_BASE}/admin/bookings/${selectedBooking.id}/approve`, 
        { zoomUrl, customMessage },
        { headers: { 'x-api-key': sessionStorage.getItem('adminKey') } }
      );
      alert("Booking berhasil disetujui & Email Zoom terkirim!");
      setSelectedBooking(null);
      setZoomUrl('');
      setCustomMessage('');
      fetchBookings();
    } catch (err) {
      alert("Gagal memproses persetujuan.");
    } finally {
      setIsApproving(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-xl overflow-x-auto border border-slate-100 relative">
      <h2 className="text-2xl font-black mb-8 text-cakep-maroon-dark tracking-tighter uppercase">Daftar Leads (Booking)</h2>
      
      {/* Approval Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-10 max-w-lg w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300">
             <div className="flex justify-between items-start mb-8">
                <div>
                   <h3 className="text-2xl font-black text-cakep-heading tracking-tight uppercase">Approve & Send Zoom</h3>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Konfirmasi jadwal untuk {selectedBooking.name}</p>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="p-2 text-slate-400 hover:text-cakep-maroon transition-all">
                   <X size={24} />
                </button>
             </div>

             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Zoom / Meeting Link</label>
                   <input 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-cakep-heading focus:outline-none focus:border-cakep-maroon transition-all text-sm" 
                      placeholder="https://zoom.us/j/..."
                      value={zoomUrl}
                      onChange={(e) => setZoomUrl(e.target.value)}
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Pesan Tambahan (Opsional)</label>
                   <textarea 
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-bold text-cakep-heading focus:outline-none focus:border-cakep-maroon transition-all text-sm resize-none" 
                      placeholder="Halo, sudah siap diskusi? Klik link dibawah..."
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                   />
                </div>

                <div className="pt-4">
                   <button 
                      onClick={handleApproveSubmit}
                      disabled={isApproving}
                      className="w-full bg-cakep-maroon hover:bg-cakep-heading text-white font-black py-5 rounded-2xl transition-all duration-700 shadow-xl shadow-cakep-maroon/20 flex items-center justify-center gap-4 text-[10px] tracking-[0.3em] uppercase"
                   >
                      {isApproving ? "MENGIRIM..." : "SETUJUI & KIRIM EMAIL"} <Send size={16} />
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50 text-cakep-maroon-dark uppercase text-[10px] tracking-[0.3em] border-b border-slate-100">
            <th className="px-6 py-5 font-black">Nama</th>
            <th className="px-6 py-5 font-black">Email / WA</th>
            <th className="px-6 py-5 font-black">Topik</th>
            <th className="px-6 py-5 font-black">Jadwal (WITA)</th>
            <th className="px-6 py-5 font-black text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="text-slate-600 text-sm">
          {bookings.map((b) => (
            <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition duration-150 group">
              <td className="px-6 py-6 border-r border-transparent group-hover:border-slate-50">
                 <div className="font-black text-cakep-maroon-dark text-base tracking-tighter">{b.name}</div>
                 <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">{b.company || 'Personal'}</div>
              </td>
              <td className="px-6 py-6">
                 <div className="text-slate-400 font-medium text-xs lowercase">{b.email}</div>
                 <div className="font-black text-cakep-maroon text-xs mt-0.5 tracking-wider">{b.whatsapp}</div>
              </td>
              <td className="px-6 py-6">
                 <span className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-200">
                    {b.topic}
                 </span>
              </td>
              <td className="px-6 py-6">
                <div className="flex flex-col">
                  <span className="font-black text-xs text-cakep-maroon-dark">{format(new Date(b.bookingDate), 'PP')}</span>
                  <span className="text-[10px] font-bold text-cakep-maroon uppercase tracking-widest mt-1">
                     <span className="inline-block w-1 h-1 bg-cakep-maroon rounded-full mr-2 mb-0.5" />
                     {b.bookingTime} WITA
                  </span>
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="flex items-center justify-center gap-3">
                  {b.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="flex items-center gap-2 px-4 py-2 bg-cakep-maroon text-white rounded-xl hover:bg-cakep-heading transition-all shadow-lg shadow-cakep-maroon/20 group/btn"
                      >
                        <Video size={16} className="group-hover/btn:scale-110 transition-transform" /> 
                        <span className="text-[10px] font-black uppercase tracking-wider">Approve</span>
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(b.id, 'CANCELLED')}
                        className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <XCircle size={20} />
                      </button>
                    </>
                  ) : b.status === 'APPROVED' ? (
                    <div className="flex flex-col items-center gap-2">
                       <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100 flex items-center gap-2">
                          <CheckCircle2 size={12} /> APPROVED
                       </span>
                       {b.zoomUrl && (
                         <a href={b.zoomUrl} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-slate-400 hover:text-cakep-maroon flex items-center gap-1 transition-colors">
                            <ExternalLink size={10} /> View Zoom
                         </a>
                       )}
                       <button
                         onClick={() => handleStatusUpdate(b.id, 'DONE')}
                         className="text-[9px] font-black text-slate-300 hover:text-green-500 uppercase tracking-widest mt-1"
                       >
                         Mark as Done
                       </button>
                    </div>
                  ) : (
                    <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl ${
                      b.status === 'DONE' ? 'bg-slate-100 text-slate-400' : 'bg-red-50 text-red-500 border border-red-100'
                    }`}>
                      {b.status}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-24">
                 <div className="flex flex-col items-center gap-4 text-slate-300">
                    <Clock size={48} strokeWidth={1} />
                    <p className="font-serif italic text-lg">Belum ada booking yang masuk.</p>
                 </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
