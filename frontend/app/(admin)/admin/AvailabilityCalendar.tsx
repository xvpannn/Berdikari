"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

const API_BASE = "http://localhost:5000/api";

export default function AvailabilityCalendar() {
  const [blockedDates, setBlockedDates] = useState<any[]>([]);
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState("");

  const fetchBlocked = async () => {
    try {
      const res = await axios.get(`${API_BASE}/availability`);
      setBlockedDates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlocked();
  }, []);

  const handleBlock = async () => {
    if (!selected) return;
    try {
      await axios.post(`${API_BASE}/admin/block-date`, {
        date: selected,
        reason
      }, {
        headers: { 'x-api-key': sessionStorage.getItem('adminKey') }
      });
      setSelected(undefined);
      setReason("");
      fetchBlocked();
    } catch (err) {
      alert("Gagal memblokir tanggal.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/admin/block-date/${id}`, {
        headers: { 'x-api-key': sessionStorage.getItem('adminKey') }
      });
      fetchBlocked();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl border border-slate-50 h-full">
      <h2 className="text-2xl font-bold mb-6 text-cakep-maroon-dark">Manajemen Ketersediaan</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex justify-center">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            modifiersClassNames={{
              selected: 'bg-red-500 text-white',
              today: 'font-bold border-b-2 border-cakep-maroon'
            }}
          />
        </div>
        <div className="flex-1 space-y-4">
          {selected && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-md">
              <p className="text-sm font-bold text-red-800 mb-2">Blokir Tanggal: {format(selected, 'PP')}</p>
              <input
                placeholder="Alasan (misal: Libur Nasional)"
                className="w-full p-2 text-sm border border-red-200 rounded outline-none focus:border-red-400 mb-3"
                value={reason}
                onChange={e => setReason(e.target.value)}
              />
              <button onClick={handleBlock} className="w-full bg-red-600 text-white py-2 rounded text-[10px] font-black uppercase tracking-widest">Konfirmasi Blokir</button>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Tanggal Terblokir</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {blockedDates.map(b => (
                <div key={b.id} className="flex justify-between items-center p-3 bg-slate-50 rounded border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-cakep-maroon-dark">{format(new Date(b.date), 'PP')}</p>
                    <p className="text-[10px] text-slate-500 italic">{b.reason || "Tanpa Alasan"}</p>
                  </div>
                  <button onClick={() => handleDelete(b.id)} className="text-[10px] text-red-500 font-black hover:underline uppercase tracking-widest">Hapus</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
