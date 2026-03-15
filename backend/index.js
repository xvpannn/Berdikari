const express = require('express');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.get('/api/availability', async (req, res) => {
  try {
    const blockedDates = await prisma.blockedDate.findMany();
    res.json(blockedDates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bookings/occupied', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "Date is required" });

  try {
    const searchDate = new Date(date);
    // Set range untuk satu hari penuh
    const startOfDay = new Date(searchDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(searchDate);
    endOfDay.setHours(23, 59, 59, 999);

    const bookings = await prisma.booking.findMany({
      where: {
        bookingDate: {
          gte: startOfDay,
          lte: endOfDay
        },
        status: { not: 'CANCELLED' }
      },
      select: { bookingTime: true }
    });

    const occupiedSlots = bookings.map(b => b.bookingTime);
    res.json(occupiedSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  const { name, company, email, whatsapp, topic, description, bookingDate, bookingTime } = req.body;
  try {
    const newBooking = await prisma.booking.create({
      data: {
        name,
        company,
        email,
        whatsapp,
        topic,
        description,
        bookingDate: new Date(bookingDate),
        bookingTime,
      },
    });

    const mailToAdmin = {
      from: process.env.MAIL_USER,
      to: 'pandukusumautama@gmail.com',
      subject: `New Lead: ${topic} - ${name}`,
      text: `Name: ${name}
    Company: ${company}
    Email: ${email}
    WhatsApp: ${whatsapp}
    Topic: ${topic}
    Date: ${bookingDate}
    Time: ${bookingTime} WITA
    Description: ${description}`,
    };

    const mailToClient = {
      from: process.env.MAIL_USER,
      to: email,
      subject: `Konfirmasi Konsultasi: ${topic} - CAKEP Strategic Support`,
      text: `Halo ${name},
    
Terima kasih telah menjadwalkan sesi konsultasi strategis bersama kami.
Kami telah menerima detail jadwal Anda sebagai berikut:

Topik: ${topic}
Tanggal: ${bookingDate}
Waktu: ${bookingTime} WITA

Tim kami akan segera menghubungi Anda melalui WhatsApp atau Email untuk detail pertemuan selanjutnya.

Salam,
CAKEP Strategic Support Team
Denpasar, Bali, Indonesia`,
    };

    // Kirim email ke Admin
    transporter.sendMail(mailToAdmin, (error, info) => {
      if (error) console.error('Admin Email Error:', error);
      else console.log('Admin Email sent: ' + info.response);
    });

    // Kirim email ke Client
    transporter.sendMail(mailToClient, (error, info) => {
      if (error) console.error('Client Email Error:', error);
      else console.log('Client Email sent: ' + info.response);
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware for Admin Routes
const authenticateAdmin = (req, res, next) => {
  // Allow preflight requests to cross CORS securely
  if (req.method === 'OPTIONS') {
    return next();
  }

  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
  }
  next();
};

app.use('/api/admin', authenticateAdmin);

app.get('/api/admin/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/admin/bookings/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk Approve Booking + Kirim Link Zoom
app.post('/api/admin/bookings/:id/approve', async (req, res) => {
  const { id } = req.params;
  const { zoomUrl, customMessage } = req.body;

  const topicMap = {
    'BUILDING': 'Perizinan Bangunan (PBG/SLF)',
    'LEGAL': 'Legalitas Usaha (PT/CV/NIB)',
    'FOREIGN': 'Tenaga Kerja Asing (KITAS)',
    'CONSULTANCY': 'Konsultasi Bisnis Strategis'
  };
  
  try {
    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { 
        status: 'APPROVED',
        zoomUrl: zoomUrl 
      },
    });

    const humanTopic = topicMap[booking.topic] || booking.topic;
    const formattedDate = new Date(booking.bookingDate).toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const isLink = zoomUrl.startsWith('http');

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: booking.email,
      subject: `[CONFIRMED] Agenda Konsultasi ${humanTopic} - ${booking.name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #f1f5f9; border-radius: 24px;">
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: -0.025em;">Halo ${booking.name},</h2>
          </div>
          
          <p style="font-size: 15px; margin-bottom: 24px;">
            Senang melihat langkah strategis Anda dalam mengamankan aspek <strong>${humanTopic}</strong> untuk bisnis Anda. Kami memahami bahwa ketepatan regulasi adalah pondasi utama untuk pertumbuhan skala besar.
          </p>

          <p style="font-size: 15px; margin-bottom: 24px;">
            Kami telah meninjau detail permohonan Anda dan mengonfirmasi jadwal pertemuan sebagai berikut:
          </p>
          
          <div style="background-color: #f8fafc; padding: 24px; border-radius: 16px; margin-bottom: 32px; border: 1px solid #e2e8f0;">
             <table style="width: 100%; font-size: 14px; color: #64748b;">
                <tr>
                   <td style="padding-bottom: 8px;"><strong>Agenda:</strong></td>
                   <td style="padding-bottom: 8px; color: #0f172a;">Strategi & Kepatuhan ${humanTopic}</td>
                </tr>
                <tr>
                   <td style="padding-bottom: 8px;"><strong>Waktu:</strong></td>
                   <td style="padding-bottom: 8px; color: #0f172a;">${formattedDate}</td>
                </tr>
                <tr>
                   <td><strong>Jam:</strong></td>
                   <td style="color: #0f172a;">${booking.bookingTime} WITA</td>
                </tr>
             </table>
          </div>

          ${customMessage ? `<p style="font-style: italic; color: #475569; font-size: 14px; margin-bottom: 32px; border-left: 3px solid #800000; padding-left: 16px;">"${customMessage}"</p>` : ''}
          
          <div style="text-align: center; margin-bottom: 40px;">
            ${isLink ? `
              <a href="${zoomUrl}" style="display: inline-block; padding: 16px 32px; background-color: #800000; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; box-shadow: 0 10px 15px -3px rgba(128, 0, 0, 0.2);">
                GABUNG ZOOM MEETING
              </a>
            ` : `
              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; border: 1px dashed #cbd5e1;">
                <p style="margin: 0; font-[10px]; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Lokasi / Instruksi Pertemuan:</p>
                <p style="margin: 0; font-size: 16px; font-weight: 700; color: #800000;">${zoomUrl}</p>
              </div>
            `}
          </div>

          <hr style="border: 0; border-top: 1px solid #f1f5f9; margin-bottom: 32px;" />

          <p style="font-size: 13px; color: #94a3b8; margin: 0;">
            Sampai jumpa di sesi pertemuan nanti.<br />
            <strong>CAKEP | Berdikari Consultant</strong><br />
            Denpasar, Bali
          </p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error('Approval Email Error:', error);
      else console.log('Approval Email sent: ' + info.response);
    });

    res.json({ message: "Booking approved and email sent", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/block-date', async (req, res) => {
  const { date, reason } = req.body;
  try {
    const newBlock = await prisma.blockedDate.create({
      data: {
        date: new Date(date),
        reason,
      },
    });
    res.status(201).json(newBlock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/block-date/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.blockedDate.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
