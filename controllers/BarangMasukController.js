// Import express untuk membuat server web
const express = require("express");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const findBarangMasuk = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    // mengambil semua barang masuk
    const barangMasuk = await prisma.barang_masuk.findMany({
      where: {
        imei: {
          barcode: {
            contains: search,
            // mode: 'insensitive' dihapus karena tidak didukung
          },
        },
      },
      select: {
        id: true,
        imei_id: true,
        namehandphone_id: true,
        kodenegara_id: true,
        harga_pembelian: true,
        quality_control: true,
        unit: true,
        tanggal_pembelian: true,
        jenis_pembelian: true,
        catatan_awal: true,
        catatan_selesai: true,
        created_at: true,
        updated_at: true,
        supplier: {
          select: {
            kode: true,
            name: true,
            no_hp: true,
          },
        },
        handphone: {
          select: {
            name: true,
          },
        },
        imei: {
          select: {
            imei: true,
            barcode: true,
          },
        },
        tipe_handphone: {
          select: {
            name: true,
          },
        },
        kode_negara: {
          select: {
            name: true,
          },
        },
        warna: {
          select: {
            name: true,
          },
        },
        kapasitas: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      skip: skip,
      take: limit,
    });

    // Mengambil jumlah total produk untuk paginasi
    const totalBarangMasuk = await prisma.barang_masuk.count({
      where: {
        imei: {
          imei: {
            contains: search,
          },
        },
      },
    });

    const totalPages = Math.ceil(totalBarangMasuk / limit);

    res.status(200).send({
      meta: {
        success: true,
        message: "Berhasil mengambil semua produk barang masuk",
      },
      data: barangMasuk,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        perPage: limit,
        total: totalBarangMasuk,
      },
    });
  } catch (error) {
    res.status(500).send({
      meta: {
        success: false,
        message: "Kesalahan internal server",
      },
      errors: error.message,
    });
  }
};

const createBarangMasuk = async (req, res) => {
  try {
    const barangMasuk = await prisma.barang_masuk.create({
      data: {
        supplier_id: parseInt(req.body.supplier_id),
        handphone_id: parseInt(req.body.handphone_id),
        imei_id: parseInt(req.body.imei_id),
        kodenegara_id: parseInt(req.body.kodenegara_id),
        warna_id: parseInt(req.body.warna_id),
        kapasitas_id: parseInt(req.body.kapasitas_id),
        namehandphone_id: parseInt(req.body.namehandphone_id),
        harga_pembelian: parseInt(req.body.harga_pembelian),
        quality_control: req.body.quality_control,
        unit: req.body.unit,
        tanggal_pembelian: req.body.tanggal_pembelian ?
          new Date(req.body.tanggal_pembelian) : new Date(),
        jenis_pembelian: req.body.jenis_pembelian,
        catatan_awal: req.body.catatan_awal,
      },
      include: {
        supplier: true,
        handphone: true,
        tipe_handphone: true,
        imei: true,
        kode_negara: true,
        warna: true,
        kapasitas: true,
      },
    });

    // mengirimkan respons
    res.status(201).send({
      // meta untuk response json
      meta: {
        success: true,
        message: "Data barang masuk berhasil di tambahkan",
      },
      //data
      data: barangMasuk,
    });
  } catch (error) {
    // Jika terjadi kesalahan, kirim respons kesalahan internal server
    res.status(500).send({
      meta: {
        success: false,
        message: "Terjadi kesalahan di server",
      },
      errors: error,
    });
  }
};

const findBarangMasukById = async (req, res) => {
  // mendapatkan id parameter
  const { id } = req.params;

  try {
    // mengambil barang masuk bedasarkan ID
    const barangMasuk = await prisma.barang_masuk.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        supplier: {
          select: {
            id: true,
            kode: true,
            name: true,
            no_hp: true,
          },
        },
        handphone: {
          select: {
            id: true,
            name: true,
          },
        },
        imei: {
          select: {
            id: true,
            imei: true,
            barcode: true,
          },
        },
        kapasitas: {
          select: {
            id: true,
            name: true,
          },
        },
        kode_negara: {
          select: {
            id: true,
            name: true,
          },
        },
        tipe_handphone: {
          select: {
            id: true,
            name: true,
          },
        },
        warna: {
          select: {
            id: true,
            name: true,
          },
        },
        harga_pembelian: true,
        quality_control: true,
        unit: true,
        tanggal_pembelian: true,
        jenis_pembelian: true,
        catatan_awal: true,
        catatan_selesai: true,
        created_at: true,
        updated_at: true,
      },
    });

    // // jika barang masuk tidak ada
    if (!barangMasuk) {
      return res.status(404).send({
        // meta response json
        meta: {
          success: false,
          message: `barang masuk dengan ID: ${id} tidak ditemukan`,
        },
      });
    }

    res.status(200).send({
      // meta untuk response json
      meta: {
        success: true,
        message: `Berhasil mengambil data barang masuk dengan ID: ${id}`,
      },
      // data
      data: barangMasuk,
    });
  } catch (error) {
    res.status(500).send({
      // meta untuk response json
      meta: {
        success: false,
        message: "Terjadi kesalahan server",
      },
      // data
      errors: error,
    });
  }
};

const updateBarangMasuk = async (req, res) => {
  const { id } = req.params;

  try {
    const dataBarangMasuk = {
      supplier_id: parseInt(req.body.supplier_id),
      handphone_id: parseInt(req.body.handphone_id),
      imei_id: parseInt(req.body.imei_id),
      kodenegara_id: parseInt(req.body.kodenegara_id),
      warna_id: parseInt(req.body.warna_id),
      kapasitas_id: parseInt(req.body.kapasitas_id),
      namehandphone_id: parseInt(req.body.namehandphone_id),
      harga_pembelian: parseInt(req.body.harga_pembelian),
      quality_control: req.body.quality_control,
      unit: req.body.unit,
      tanggal_pembelian: new Date(req.body.tanggal_pembelian),
      jenis_pembelian: req.body.jenis_pembelian,
      jenis_pembelian: req.body.jenis_pembelian,
      catatan_awal: req.body.catatan_awal,
      catatan_selesai: req.body.catatan_selesai,
      updated_at: new Date(),
    };

    // Mengupdate barang masuk
    const barangMasuk = await prisma.barang_masuk.update({
      where: {
        id: Number(id),
      },
      data: dataBarangMasuk,
      include: {
        supplier: true,
        handphone: true,
        tipe_handphone: true,
        imei: true,
        kode_negara: true,
        warna: true,
        kapasitas: true,
      },
    });

    // Mengirim respons
    res.status(200).send({
      //meta untuk respons JSON
      meta: {
        success: true,
        message: "Barang masuk berhasil diperbarui",
      },
      //data barang masuk
      data: barangMasuk,
    });
  } catch (error) {
    // Mengirim respons jika terjadi kesalahan
    res.status(500).send({
      //meta untuk respons JSON
      meta: {
        success: false,
        message: "Kesalahan internal server",
      },
      //data kesalahan
      errors: error,
    });
  }
};

module.exports = {
  createBarangMasuk,
  findBarangMasuk,
  findBarangMasukById,
  updateBarangMasuk,
};