'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditReservasi() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [nama_pemesan, setNamaPemesan] = useState('');
  const [nama_acara, setNamaAcara] = useState('');
  const [tanggal_acara, setTanggalAcara] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/api/reservasi/${id}`)
      .then(res => res.json())
      .then(data => {
        setNamaPemesan(data.nama_pemesan);
        setNamaAcara(data.nama_acara);
        setTanggalAcara(data.tanggal_acara);
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`http://localhost:8000/api/reservasi/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama_pemesan, nama_acara, tanggal_acara }),
    });

    router.push('/reservasi');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Reservasi</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={nama_pemesan}
          onChange={(e) => setNamaPemesan(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={nama_acara}
          onChange={(e) => setNamaAcara(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={tanggal_acara}
          onChange={(e) => setTanggalAcara(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
