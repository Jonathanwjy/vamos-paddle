import {
  Clock,
  CloudRain,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Sun,
  Trophy,
  Users,
} from "lucide-react";

export const ABOUT_US_CONTENT = [
  {
    icon: Trophy,
    num: "01",
    title: "Premium Quality",
    description:
      "Rumput sintetis dan kaca berstandar turnamen internasional — setiap detail lapangan dirancang untuk performa.",
  },
  {
    icon: Users,
    num: "02",
    title: "Active Community",
    description:
      "Bergabunglah dengan ribuan pemain padel dari berbagai level. Arena kami adalah titik temu komunitas.",
  },
  {
    icon: Star,
    num: "03",
    title: "Top Tier Gear",
    description:
      "Penyewaan raket dan bola premium selalu tersedia. Fokus bermain, bukan soal perlengkapan.",
  },
  {
    icon: ShieldCheck,
    num: "04",
    title: "Easy Booking",
    description:
      "Sistem reservasi instan, bebas antri, bebas ribet. Lapangan terbaikmu hanya beberapa ketuk saja.",
  },
];

export const TIMELINE = [
  {
    year: "2018",
    label: "Berdiri",
    desc: "CourtBook dibuka dengan 2 lapangan pertama di Palembang.",
  },
  {
    year: "2020",
    label: "Ekspansi",
    desc: "Penambahan 4 lapangan baru dan sistem booking digital pertama.",
  },
  {
    year: "2022",
    label: "Komunitas",
    desc: "Lebih dari 5.000 anggota aktif dan turnamen bulanan perdana.",
  },
  {
    year: "2025",
    label: "Kini",
    desc: "Standar WPT, 3 tipe lapangan, dan rating 4.9 dari 1.280+ ulasan.",
  },
];

export const COURTS = [
  {
    id: 1,
    name: "VIP Panoramic Indoor",
    type: "Indoor",
    price: "Rp 250.000",
    period: "/ jam",
    surface: "Mondo Supercourt XN",
    description:
      "Lapangan premium dengan kaca panoramik penuh untuk pengalaman bermain dan menonton terbaik. Bebas cuaca panas dan hujan.",
    features: [
      "Full AC",
      "Kaca Panoramik 360°",
      "Lampu LED Standar WPT",
      "Tribun Mini",
    ],
    icon: CloudRain,
    tag: "PALING POPULER",
    imageUrl:
      "https://images.unsplash.com/photo-1628292262973-10d937a098ed?w=800&q=80",
  },
  {
    id: 2,
    name: "Pro Outdoor Blue",
    type: "Outdoor",
    price: "Rp 150.000",
    period: "/ jam",
    surface: "Texturized Artificial Grass",
    description:
      "Nikmati bermain di bawah langit terbuka. Sangat cocok untuk sesi pagi atau sore hari dengan sirkulasi udara alami yang segar.",
    features: [
      "Udara Terbuka",
      "Lampu Sorot 800W",
      "Area Duduk Santai",
      "Kaca Standar 12mm",
    ],
    icon: Sun,
    tag: null,
    imageUrl:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a631d6?w=800&q=80",
  },
  {
    id: 3,
    name: "Standard Semi-Indoor",
    type: "Semi-Indoor",
    price: "Rp 200.000",
    period: "/ jam",
    surface: "Synthetic Turf",
    description:
      "Solusi sempurna: sirkulasi udara luar ruangan dengan atap kanopi tinggi yang melindungimu dari hujan dan terik matahari langsung.",
    features: [
      "Atap Kanopi Tinggi",
      "Kipas Angin Besar",
      "Pencahayaan Optimal",
      "Kaca Standar 10mm",
    ],
    icon: MapPin,
    tag: null,
    imageUrl:
      "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800&q=80",
  },
];
export const REVIEWS = [
  {
    id: 1,
    name: "Aditya Pratama",
    initials: "AP",
    court: "VIP Panoramic Indoor",
    date: "28 Mei 2025",
    rating: 5,
    helpful: 42,
    tag: "Fasilitas",
    body: "Lapangannya luar biasa! Kaca panoramik 360° beneran bikin sensasi main jadi beda — terasa profesional banget. AC-nya juga dingin merata, nggak ada sudut yang gerah. Sudah main di sini berkali-kali dan tidak pernah kecewa.",
  },
  {
    id: 2,
    name: "Sari Dewi",
    initials: "SD",
    court: "Pro Outdoor Blue",
    date: "14 Mei 2025",
    rating: 5,
    helpful: 31,
    tag: "Suasana",
    body: "Main pagi-pagi di lapangan outdoor ini beneran refreshing. Udara segar, lampu sorotnya terang banget buat main malam hari. Worth banget dengan harga segitu. Highly recommended buat yang suka sensasi outdoor!",
  },
  {
    id: 3,
    name: "Budi Santoso",
    initials: "BS",
    court: "Standard Semi-Indoor",
    date: "2 Mei 2025",
    rating: 4,
    helpful: 18,
    tag: "Value",
    body: "Pilihan yang tepat untuk budget yang lebih terjangkau. Atap kanopinya melindungi dari panas matahari langsung. Kipas anginnya cukup membantu sirkulasi udara. Satu hal kecil: pencahayaan di sudut tertentu bisa lebih ditingkatkan.",
  },
  {
    id: 4,
    name: "Rina Kusuma",
    initials: "RK",
    court: "VIP Panoramic Indoor",
    date: "19 Apr 2025",
    rating: 5,
    helpful: 56,
    tag: "Pelayanan",
    body: "Proses booking sangat mudah dan staff-nya super ramah! Lapangannya selalu bersih dan terawat setiap kali kami datang. Fasilitas loker dan shower-nya juga memuaskan. Kami rutin pakai untuk latihan tim setiap minggu.",
  },
];

export const STATS = [
  { value: 4.9, label: "Rating Rata-rata", suffix: "", decimals: 1 },
  { value: 1280, label: "Total Ulasan", suffix: "+", decimals: 0 },
  { value: 98, label: "Kepuasan Pelanggan", suffix: "%", decimals: 0 },
  { value: 7, label: "Tahun Beroperasi", suffix: "+", decimals: 0 },
];

export const BREAKDOWN = [
  { stars: 5, count: 1024, pct: 80 },
  { stars: 4, count: 179, pct: 14 },
  { stars: 3, count: 51, pct: 4 },
  { stars: 2, count: 13, pct: 1 },
  { stars: 1, count: 13, pct: 1 },
];

export const CONTACT_INFO = [
  {
    icon: Phone,
    title: "WhatsApp / Telepon",
    details: "+62 812-3456-7890",
    description:
      "Admin kami siap merespon pesan Anda dengan cepat untuk reservasi.",
    actionText: "Chat WhatsApp",
    actionLink: "https://wa.me/6281234567890",
  },
  {
    icon: MapPin,
    title: "Lokasi Kami",
    details: "Jl. Olahraga No. 88, Palembang",
    description:
      "Kunjungi fasilitas padel kami. Tersedia area parkir yang luas dan aman.",
    actionText: "Buka Google Maps",
    actionLink: "#", // Ganti dengan link Google Maps tempatmu
  },
  {
    icon: Mail,
    title: "Email Bantuan",
    details: "hello@courtbook.com",
    description:
      "Untuk pertanyaan kerja sama, sponsor, atau turnamen skala besar.",
    actionText: "Kirim Email",
    actionLink: "mailto:hello@courtbook.com",
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    details: "06:00 - 23:00 WIB",
    description:
      "Buka setiap hari, termasuk hari libur nasional dan akhir pekan.",
    actionText: "Lihat Jadwal",
    actionLink: "/courts",
  },
];
