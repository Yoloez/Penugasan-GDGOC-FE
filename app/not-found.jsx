"use client"; // Wajib ada untuk mengakses usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Animasi/Visual Angka 404 */}
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 select-none drop-shadow-sm">404</h1>
          {/* Dekorasi kecil di belakang */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-400/20 blur-3xl rounded-full -z-10"></div>
        </div>

        {/* Pesan Utama */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Halaman Hilang!</h2>

          {/* Menampilkan URL Route yang tidak ditemukan */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm inline-block mx-auto max-w-full overflow-hidden">
            <p className="text-gray-500 text-sm">
              Maaf, halaman <code className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-mono break-all">{pathname}</code> belum tersedia
            </p>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/30"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Kembali ke Beranda
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Sebelumnya
          </button>
        </div>
      </div>

      {/* Footer kecil */}
      <div className="mt-12 text-gray-400 text-sm">
        Butuh bantuan?{" "}
        <Link href="/contact" className="text-blue-600 hover:underline">
          Hubungi Support
        </Link>
      </div>
    </div>
  );
}
