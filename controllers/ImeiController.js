const express = require("express");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const createImei = async (req, res) => {
  try {
    // Mencari id terakhir yang ada di database
    const lastImei = await prisma.imei.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    // Menyisipkan data imei dengan kode yang telah dihasilkan
    const imeis = await prisma.imei.create({
      data: {
        imei: req.body.imei,
      },
    });

    //mengirimkan response
    res.status(201).send({
      meta: {
        success: true,
        message: "Imei berhasil ditambahkan",
      },
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

const allImei= async (req, res) => {
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
    allImei
}