'use client';

import TempatReservasiForm from '@/components/admin/tempatreservasi/tempatReservasiForm';

export default function CreatePage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tambah Tempat Reservasi</h1>
      <TempatReservasiForm />
    </div>
  );
}
