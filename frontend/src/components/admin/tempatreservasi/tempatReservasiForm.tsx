'use client';

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import { Save, X, MapPin, Users, DollarSign, Image, FileText } from 'lucide-react';

interface Props {
  editData?: any;
}

export default function TempatReservasiForm({ editData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    lokasi: editData?.lokasi || '',
    kapasitas: editData?.kapasitas || '',
    keterangan: editData?.keterangan || '',
    biaya: editData?.biaya || '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.lokasi.trim()) {
      newErrors.lokasi = 'Lokasi harus diisi';
    }

    if (!form.kapasitas || parseInt(form.kapasitas) <= 0) {
      newErrors.kapasitas = 'Kapasitas harus berupa angka positif';
    }

    if (!form.biaya || parseInt(form.biaya) < 0) {
      newErrors.biaya = 'Biaya harus berupa angka non-negatif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);

    try {
      const method = editData ? 'PUT' : 'POST';
      const url = editData
        ? `http://127.0.0.1:8000/api/tempatReservasi/${editData.tempat_reservasi_id}`
        : 'http://127.0.0.1:8000/api/tempatReservasi';

      const formData = new FormData();
      formData.append('lokasi', form.lokasi);
      formData.append('kapasitas', form.kapasitas);
      formData.append('biaya', form.biaya);
      formData.append('keterangan', form.keterangan);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menyimpan data');
      }

      alert(editData ? 'Data berhasil diupdate' : 'Data berhasil disimpan');
      router.push('/admin/tempatreservasi');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Lokasi */}
        <div>
          <label htmlFor="lokasi" className="block text-sm font-medium text-slate-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Lokasi *
          </label>
          <input
            id="lokasi"
            name="lokasi"
            type="text"
            value={form.lokasi}
            onChange={handleChange}
            className={`w-full bg-slate-700 border ${
              errors.lokasi ? 'border-red-500' : 'border-slate-600'
            } rounded-lg px-4 py-3 text-white placeholder-slate-400`}
            required
          />
          {errors.lokasi && <p className="text-red-400 text-sm mt-2">{errors.lokasi}</p>}
        </div>

        {/* Kapasitas */}
        <div>
          <label htmlFor="kapasitas" className="block text-sm font-medium text-slate-300 mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Kapasitas *
          </label>
          <input
            id="kapasitas"
            name="kapasitas"
            type="number"
            value={form.kapasitas}
            onChange={handleChange}
            min="1"
            className={`w-full bg-slate-700 border ${
              errors.kapasitas ? 'border-red-500' : 'border-slate-600'
            } rounded-lg px-4 py-3 text-white placeholder-slate-400`}
            required
          />
          {errors.kapasitas && <p className="text-red-400 text-sm mt-2">{errors.kapasitas}</p>}
        </div>

        {/* Biaya */}
        <div>
          <label htmlFor="biaya" className="block text-sm font-medium text-slate-300 mb-2">
            <DollarSign className="w-4 h-4 inline mr-2" />
            Biaya *
          </label>
          <input
            id="biaya"
            name="biaya"
            type="number"
            value={form.biaya}
            onChange={handleChange}
            min="0"
            className={`w-full bg-slate-700 border ${
              errors.biaya ? 'border-red-500' : 'border-slate-600'
            } rounded-lg px-4 py-3 text-white placeholder-slate-400`}
            required
          />
          {errors.biaya && <p className="text-red-400 text-sm mt-2">{errors.biaya}</p>}
        </div>

        {/* File Gambar */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-slate-300 mb-2">
            <Image className="w-4 h-4 inline mr-2" />
            Gambar Tempat (.jpg, .jpeg, .png)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white file:text-white file:bg-blue-600 file:border-none file:px-4 file:py-2 file:rounded file:cursor-pointer"
          />
        </div>

        {/* Keterangan */}
        <div>
          <label htmlFor="keterangan" className="block text-sm font-medium text-slate-300 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Keterangan
          </label>
          <textarea
            id="keterangan"
            name="keterangan"
            value={form.keterangan}
            onChange={handleChange}
            rows={4}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 resize-vertical"
          />
        </div>

        {/* Tombol */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
              loading
                ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {editData ? 'Update Data' : 'Simpan Data'}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push('/admin/tempatreservasi')}
            className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg"
          >
            <X className="w-4 h-4" />
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
