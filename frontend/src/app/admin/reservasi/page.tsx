'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  DocumentTextIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Import components (sesuaikan dengan struktur folder Anda)
import Header from '@/components/admin/reservasi/Header';
import Sidebar from '@/components/admin/reservasi/Sidebar';

type Reservasi = {
  reservasi_id: number;
  nama_pemesan: string;
  nama_acara: string;
  tanggal_acara: string;
  tempat?: string;
  jam_acara?: string;
};

export default function ReservasiPage() {
  const [data, setData] = useState<Reservasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<Reservasi[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(item =>
      item.nama_pemesan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nama_acara.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.tempat && item.tempat.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/reservasi');
      const result = await res.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus reservasi ini?')) {
      try {
        const res = await fetch(`http://localhost:8000/api/reservasi/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setData(data.filter(item => item.reservasi_id !== id));
        }
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '-';
    
    // Jika format sudah HH:MM
    if (timeString.includes(':')) {
      return timeString;
    }
    
    // Jika format timestamp, konversi ke HH:MM
    try {
      const time = new Date(`2000-01-01T${timeString}`);
      return time.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return timeString;
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

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-white">Daftar Reservasi</h1>
              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <span>Next.js Admin Dashboard Solution</span>
              </div>
            </div>
            <p className="text-slate-400">Kelola semua reservasi acara di sini</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-slate-400 text-sm">Total Reservasi</p>
                  <p className="text-2xl font-bold text-white">{data.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-slate-400 text-sm">Hari Ini</p>
                  <p className="text-2xl font-bold text-white">
                    {data.filter(item => 
                      new Date(item.tanggal_acara).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <UserIcon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-slate-400 text-sm">Minggu Ini</p>
                  <p className="text-2xl font-bold text-white">
                    {data.filter(item => {
                      const itemDate = new Date(item.tanggal_acara);
                      const now = new Date();
                      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
                      return itemDate >= weekStart;
                    }).length}
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
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama, acara, atau tempat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Add Button */}
                <Link
                  href="/admin/reservasi/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Tambah Reservasi
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
                    <th className="text-left px-6 py-4 text-slate-300 font-semibold">Nama Pemesan</th>
                    <th className="text-left px-6 py-4 text-slate-300 font-semibold">Nama Acara</th>
                    <th className="text-left px-6 py-4 text-slate-300 font-semibold">Tempat</th>
                    <th className="text-left px-6 py-4 text-slate-300 font-semibold">Tanggal & Jam</th>
                    <th className="text-center px-6 py-4 text-slate-300 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center">
                          <DocumentTextIcon className="h-12 w-12 text-slate-600 mb-3" />
                          <p className="text-lg font-medium mb-1">Tidak ada reservasi</p>
                          <p className="text-sm">
                            {searchTerm ? 'Tidak ditemukan hasil pencarian' : 'Belum ada data reservasi'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr
                        key={item.reservasi_id}
                        className={`border-b border-slate-700 hover:bg-slate-700/30 transition-colors duration-150 ${
                          index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                              {item.nama_pemesan.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">{item.nama_pemesan}</p>
                              <p className="text-slate-400 text-sm">ID: {item.reservasi_id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-white font-medium">{item.nama_acara}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                            <span className="text-slate-300">
                              {item.tempat || 'Belum ditentukan'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                              <span className="text-slate-300 text-sm">
                                {formatDate(item.tanggal_acara)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
                              <span className="text-slate-300 text-sm">
                                {formatTime(item.jam_acara || '')}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Link
                              href={`/reservasi/edit/${item.reservasi_id}`}
                              className="inline-flex items-center px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 rounded-lg transition-colors duration-200 text-sm font-medium"
                            >
                              <PencilIcon className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(item.reservasi_id)}
                              className="inline-flex items-center px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg transition-colors duration-200 text-sm font-medium"
                            >
                              <TrashIcon className="h-4 w-4 mr-1" />
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
                Menampilkan {filteredData.length} dari {data.length} reservasi
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