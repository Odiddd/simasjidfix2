<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TempatReservasiModel;
use Illuminate\Http\Request;

class TempatReservasiController extends Controller
{
    public function index()
    {
        return response()->json(TempatReservasiModel::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lokasi' => 'required|string|max:255',
            'kapasitas' => 'nullable|numeric',
            'image' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
            'biaya' => 'nullable|numeric',
        ]);

        $data = TempatReservasiModel::create($validated);
        return response()->json($data, 201);
    }

    public function show($id)
    {
        $data = TempatReservasiModel::findOrFail($id);
        return response()->json($data);
    }

    public function update(Request $request, $id)
    {
        $data = TempatReservasiModel::findOrFail($id);
        $data->update($request->only([
            'lokasi', 'kapasitas', 'image', 'keterangan', 'biaya'
        ]));

        return response()->json($data);
    }

    public function destroy($id)
    {
        $data = TempatReservasiModel::findOrFail($id);
        $data->delete();

        return response()->json(['message' => 'Tempat reservasi berhasil dihapus']);
    }
}
