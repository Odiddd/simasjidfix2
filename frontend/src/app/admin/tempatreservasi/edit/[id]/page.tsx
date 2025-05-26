'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TempatReservasiForm from '@/components/admin/tempatreservasi/tempatReservasiForm';

export default function EditPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tempat-reservasi/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Tempat Reservasi</h1>
      <TempatReservasiForm editData={data} />
    </div>
  );
}
