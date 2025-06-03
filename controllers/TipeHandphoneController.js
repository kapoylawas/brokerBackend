const express = require("express");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const createTipePhone = async (req, res) => {
  try {
    // Mencari id terakhir yang ada di database
    const lastTipeHanphone = await prisma.tipe_handphone.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    // Menyisipkan data tipe handphone dengan kode yang telah dihasilkan
    const tipe_handphones = await prisma.tipe_handphone.create({
      data: {
        name: req.body.name,
      },
    });

    //mengirimkan response
    res.status(201).send({
      meta: {
        success: true,
        message: "Tipe hanphone berhasil ditambahkan",
      },
      data: tipe_handphones,
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

const allTipeHandPhone = async (req, res) => {
  try {
    // Ambil kategori Tipe handphone
    const tipe_handphones = await prisma.tipe_handphone.findMany({
      select: {
        id: true,
        name: true,
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
        message: "Berhasil mendapatkan semua jenis tipe-hand-phone",
      },
      // Data tipe handphone
      data: tipe_handphones,
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
    createTipePhone,
    allTipeHandPhone
}