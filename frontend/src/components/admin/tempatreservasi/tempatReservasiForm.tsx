'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  editData?: any;
}

export default function TempatReservasiForm({ editData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    lokasi: editData?.lokasi || '',
    kapasitas: editData?.kapasitas || '',
    image: editData?.image || '',
    keterangan: editData?.keterangan || '',
    biaya: editData?.biaya || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editData ? 'PUT' : 'POST';
    const url = editData
      ? `${process.env.NEXT_PUBLIC_API_URL}/tempat-reservasi/${editData.tempat_reservasi_id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/tempat-reservasi`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    router.push('/tempat-reservasi');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="lokasi" placeholder="Lokasi" value={form.lokasi} onChange={handleChange} className="border w-full p-2 rounded" required />
      <input name="kapasitas" type="number" placeholder="Kapasitas" value={form.kapasitas} onChange={handleChange} className="border w-full p-2 rounded" />
      <input name="image" placeholder="URL Gambar" value={form.image} onChange={handleChange} className="border w-full p-2 rounded" />
      <textarea name="keterangan" placeholder="Keterangan" value={form.keterangan} onChange={handleChange} className="border w-full p-2 rounded" />
      <input name="biaya" type="number" placeholder="Biaya" value={form.biaya} onChange={handleChange} className="border w-full p-2 rounded" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {editData ? 'Update' : 'Simpan'}
      </button>
    </form>
  );
}
