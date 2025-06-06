const express = require("express");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const createImei = async (req, res) => {
  try {
    const imeiInput = req.body.imei;

    // Validasi bahwa input tidak kosong dan berupa string
    if (!imeiInput || typeof imeiInput !== "string" || imeiInput.length < 8) {
      return res.status(400).send({
        meta: {
          success: false,
          message: "Input IMEI harus berupa string dengan minimal 8 karakter",
        },
      });
    }

    // Mengambil 8 karakter terakhir (bisa angka/huruf/simbol)
    const barcode = imeiInput.slice(-8);

    // Menyimpan data ke database
    const imeis = await prisma.imei.create({
      data: {
        imei: imeiInput,
        barcode: barcode, // 8 karakter terakhir dari input
      },
    });

    // Mengirimkan response
    res.status(201).send({
      meta: {
        success: true,
        message: "IMEI berhasil ditambahkan",
      },
      data: imeis,
    });
  } catch (error) {
    res.status(500).send({
      meta: {
        success: false,
        message: "Terjadi kesalahan di server",
      },
      errors: error.message,
    });
  }
};

const allImei = async (req, res) => {
  try {
    // Ambil kategori imei
    const imeis = await prisma.imei.findMany({
      select: {
        id: true,
        imei: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    // Kirim respons
    res.status(200).send({
      // Meta untuk respons dalam format JSON
      meta: {
        success: true,
        message: "Berhasil mendapatkan semua imei",
      },
      // Data tipe handphone
      data: imeis,
    });
  } catch (error) {
    // Jika terjadi kesalahan, kirim respons kesalahan internal server
    res.status(500).send({
      // Meta untuk respons dalam format JSON
      meta: {
        success: false,
        message: "Terjadi kesalahan di server",
      },
      // Data kesalahan
      errors: error,
    });
  }
};

module.exports = {
  createImei,
  allImei,
};
