"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TempatReservasi {
  tempat_reservasi_id: number;
  lokasi: string;
}

export default function CreateReservasi() {
  const router = useRouter();
  const [tempatList, setTempatList] = useState<TempatReservasi[]>([]);
  const [formData, setFormData] = useState({
    nama_pemesan: "",
    kontak_pemesan: "",
    tempat_reservasi_id: "",
    nama_acara: "",
    tanggal_acara: "",
    waktu_mulai: "",
    waktu_selesai: "",
    jumlah_tamu: "",
    mengetahui: "",
    tagihan: "",
    status_reservasi: "menunggu",
    status_pembayaran: "pending",
    keterangan: "",
    masuk_transaksi: false,
  });
  
  useEffect(() => {
    fetch("http://localhost:8000/api/tempatReservasi")
      .then((res) => res.json())
      .then((data) => setTempatList(data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    setFormData({
    ...formData,
    [name]:
      type === "checkbox" && target instanceof HTMLInputElement
        ? target.checked
        : name === "tempat_reservasi_id"
        ? Number(value) 
        : value,
  });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/reservasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.push("/admin/reservasi");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Reservasi</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input type="text" name="nama_pemesan" value={formData.nama_pemesan} onChange={handleChange} placeholder="Nama Pemesan" required className="border p-2 rounded" />
        <input type="text" name="kontak_pemesan" value={formData.kontak_pemesan} onChange={handleChange} placeholder="Kontak Pemesan" required className="border p-2 rounded" />

        <select name="tempat_reservasi_id" value={formData.tempat_reservasi_id} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Pilih Tempat</option>
          {tempatList.map((tempat) => (
            <option key={tempat.tempat_reservasi_id} value={tempat.tempat_reservasi_id}>
              {tempat.lokasi}
            </option>
          ))}
        </select>

        <input type="text" name="nama_acara" value={formData.nama_acara} onChange={handleChange} placeholder="Nama Acara" required className="border p-2 rounded" />
        <input type="date" name="tanggal_acara" value={formData.tanggal_acara} onChange={handleChange} required className="border p-2 rounded" />
        <input type="time" name="waktu_mulai" value={formData.waktu_mulai} onChange={handleChange} required className="border p-2 rounded" />
        <input type="time" name="waktu_selesai" value={formData.waktu_selesai} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="jumlah_tamu" value={formData.jumlah_tamu} onChange={handleChange} placeholder="Jumlah Tamu" required className="border p-2 rounded" />
        <input type="text" name="mengetahui" value={formData.mengetahui} onChange={handleChange} placeholder="Mengetahui" className="border p-2 rounded" />
        <input type="number" name="tagihan" value={formData.tagihan} onChange={handleChange} placeholder="Tagihan" className="border p-2 rounded" />

        <select name="status_reservasi" value={formData.status_reservasi} onChange={handleChange} className="border p-2 rounded">
          <option value="menunggu">Menunggu</option>
          <option value="dikonfirmasi">Dikonfirmasi</option>
          <option value="dijadwalkan">Dijadwalkan</option>
          <option value="dilaksanakan">Dilaksanakan</option>
          <option value="selesai">Selesai</option>
          <option value="batal">Batal</option>
        </select>

        <select name="status_pembayaran" value={formData.status_pembayaran} onChange={handleChange} className="border p-2 rounded">
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>

        <textarea name="keterangan" value={formData.keterangan} onChange={handleChange} placeholder="Keterangan" className="border p-2 rounded" />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="masuk_transaksi"
            checked={formData.masuk_transaksi}
            onChange={handleChange}
            className="mr-2"
          />
          Masuk Transaksi
        </label>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Simpan</button>
      </form>
    </div>
  );
}
