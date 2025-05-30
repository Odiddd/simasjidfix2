'use client';

import Header from '@/components/admin/tempatreservasi/Header';
import Sidebar from '@/components/admin/tempatreservasi/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Search, MapPin, Users, DollarSign, Edit, Trash2 } from 'lucide-react';

interface TempatReservasi {
  tempat_reservasi_id: number;
  lokasi: string;
  kapasitas: number;
  image?: string;
  keterangan?: string;
  biaya: number;
}

export default function TempatReservasiList() {
  const [data, setData] = useState<TempatReservasi[]>([]);
  const [filteredData, setFilteredData] = useState<TempatReservasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/admin/login'); 
    }
  }, [router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:8000/api/tempatReservasi');
      if (!response.ok) {
        throw new Error('Gagal mengambil data');
      }
      const result = await response.json();
      setData(result);
      setFilteredData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(item =>
      item.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keterangan?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tempatReservasi/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Gagal menghapus data');
      }
      
      setData(data.filter(item => item.tempat_reservasi_id !== id));
      alert('Data berhasil dihapus');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus data');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-red-400 text-lg">Error: {error}</div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-white">Daftar Tempat Reservasi</h1>
              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <span>Next.js Admin Dashboard Solution</span>
              </div>
            </div>
            <p className="text-slate-400">Kelola semua tempat reservasi di sini</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-slate-400 text-sm">Total Tempat</p>
                  <p className="text-2xl font-bold text-white">{data.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-slate-400 text-sm">Total Kapasitas</p>
                  <p className="text-2xl font-bold text-white">
                    {data.reduce((sum, item) => sum + item.kapasitas, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-slate-400 text-sm">Rata-rata Biaya</p>
                  <p className="text-2xl font-bold text-white">
                    Rp {data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.biaya, 0) / data.length).toLocaleString('id-ID') : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 mb-6">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari lokasi atau keterangan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Add Button */}
                <Link
                  href="/admin/tempatreservasi/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Tambah Tempat Reservasi
                </Link>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700/50 border-b border-slate-600">
                    <th className="text-left px-6 py-4 text-slate-300 font-semibold">Tempat</th>
                    <th className="text-left px-6 py-4 text-slate-300 font-semibold">Keterangan</th>
                    <th className="text-left px-6 py-4 text-slate-300 font-semibold">Kapasitas</th>
                    <th className="text-left px-6 py-4 text-slate-300 font-semibold">Biaya</th>
                    <th className="text-center px-6 py-4 text-slate-300 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center">
                          <MapPin className="h-12 w-12 text-slate-600 mb-3" />
                          <p className="text-lg font-medium mb-1">Tidak ada tempat reservasi</p>
                          <p className="text-sm">
                            {searchTerm ? 'Tidak ditemukan hasil pencarian' : 'Belum ada data tempat reservasi'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr
                        key={item.tempat_reservasi_id}
                        className={`border-b border-slate-700 hover:bg-slate-700/30 transition-colors duration-150 ${
                          index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold mr-3 ${
                              index % 4 === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 
                              index % 4 === 1 ? 'bg-gradient-to-br from-green-500 to-green-600' : 
                              index % 4 === 2 ? 'bg-gradient-to-br from-purple-500 to-purple-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'
                            }`}>
                              {item.lokasi.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">{item.lokasi}</p>
                              <p className="text-slate-400 text-sm">ID: {item.tempat_reservasi_id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-slate-300">{item.keterangan || 'Tidak ada keterangan'}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                            <span className="text-slate-300">{item.kapasitas} orang</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                            <span className="text-slate-300">Rp {item.biaya.toLocaleString('id-ID')}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Link
                              href={`/admin/tempatreservasi/edit/${item.tempat_reservasi_id}`}
                              className="inline-flex items-center px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 rounded-lg transition-colors duration-200 text-sm font-medium"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(item.tempat_reservasi_id)}
                              className="inline-flex items-center px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg transition-colors duration-200 text-sm font-medium"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Stats */}
          {filteredData.length > 0 && (
            <div className="mt-6 flex justify-between items-center text-sm text-slate-400">
              <span>
                Menampilkan {filteredData.length} dari {data.length} tempat reservasi
              </span>
              <span>
                {searchTerm && `Hasil pencarian untuk "${searchTerm}"`}
              </span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}