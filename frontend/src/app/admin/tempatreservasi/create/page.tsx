'use client';

import TempatReservasiForm from '@/components/admin/tempatreservasi/tempatReservasiForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="p-6">
        <div className="mb-6">
          <Link 
            href="/admin/tempatreservasi" 
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar
          </Link>
          <h1 className="text-3xl font-bold text-white">Tambah Tempat Reservasi</h1>
          <p className="text-slate-400 mt-2">Isi form berikut untuk menambah tempat reservasi baru</p>
        </div>
        <div className="max-w-2xl">
          <TempatReservasiForm />
        </div>
      </div>
    </div>
  );
}