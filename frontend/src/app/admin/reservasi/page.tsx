'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Reservasi = {
  reservasi_id: number;
  nama_pemesan: string;
  nama_acara: string;
  tanggal_acara: string;
};

export default function ReservasiPage() {
  const [data, setData] = useState<Reservasi[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/reservasi')
      .then(res => res.json())
      .then(setData);
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus reservasi ini?')) {
      const res = await fetch(`http://localhost:8000/api/reservasi/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setData(data.filter(item => item.reservasi_id !== id));
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Daftar Reservasi</h1>
      <Link href="/admin/reservasi/create" className="bg-blue-500 text-white px-4 py-2 rounded">
        + Tambah Reservasi
      </Link>
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama Pemesan</th>
            <th className="border p-2">Nama Acara</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.reservasi_id}>
              <td className="border p-2">{item.nama_pemesan}</td>
              <td className="border p-2">{item.nama_acara}</td>
              <td className="border p-2">{item.tanggal_acara}</td>
              <td className="border p-2 space-x-2">
                <Link href={`/reservasi/edit/${item.reservasi_id}`} className="text-blue-500">
                  Edit
                </Link>
                <button onClick={() => handleDelete(item.reservasi_id)} className="text-red-500">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
