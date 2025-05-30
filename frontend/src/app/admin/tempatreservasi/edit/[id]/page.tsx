'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TempatReservasiForm from '@/components/admin/tempatreservasi/tempatReservasiForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/tempatReservasi/${id}`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 text-lg">Loading...</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400 text-lg">Error: {error}</div>
      </div>
    </div>
  );
  
  if (!data) return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 text-lg">Data tidak ditemukan</div>
      </div>
    </div>
  );

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
          <h1 className="text-3xl font-bold text-white">Edit Tempat Reservasi</h1>
          <p className="text-slate-400 mt-2">Edit informasi tempat reservasi</p>
        </div>
        <div className="max-w-2xl">
          <TempatReservasiForm editData={data} />
        </div>
      </div>
    </div>
  );
}