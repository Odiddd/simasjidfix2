'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tempat-reservasi`)
      .then(res => res.json())
      .then(setData);
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tempat-reservasi/${id}`, {
      method: 'DELETE',
    });
    setData(data.filter(item => item.tempat_reservasi_id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Daftar Tempat Reservasi</h1>
      <Link href="/tempat-reservasi/create" className="bg-blue-500 text-white px-4 py-2 rounded">+ Tambah</Link>
      <ul className="mt-4 space-y-4">
        {data.map(item => (
          <li key={item.tempat_reservasi_id} className="border p-4 rounded shadow">
            <p><strong>Lokasi:</strong> {item.lokasi}</p>
            <p><strong>Kapasitas:</strong> {item.kapasitas}</p>
            <p><strong>Biaya:</strong> Rp{item.biaya}</p>
            <div className="mt-2 space-x-2">
              <Link href={`/tempat-reservasi/edit/${item.tempat_reservasi_id}`} className="text-blue-600 underline">Edit</Link>
              <button onClick={() => handleDelete(item.tempat_reservasi_id)} className="text-red-600">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
