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
          imei: {
            contains: search,
            // mode: 'insensitive' dihapus karena tidak didukung
          }
        },
      },
      select: {
        id: true,
        imei_id: true,
        namehandphone_id: true,
        harga_pembelian: true,
        sales: true,
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
          },
        },
        tipe_handphone: {
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
          }
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
        imei_id: parseInt(req.body.imei_id),
        handphone_id: parseInt(req.body.handphone_id),
        kode_negara: req.body.kode_negara,
        warna: req.body.warna,
        kapasitas: req.body.kapasitas,
        namehandphone_id: parseInt(req.body.namehandphone_id),
        harga_pembelian: parseInt(req.body.harga_pembelian),
        sales: req.body.sales,
        tanggal_pembelian: req.body.tanggal_pembelian
          ? new Date(req.body.tanggal_pembelian)
          : null,
        jenis_pembelian: req.body.jenis_pembelian,
        catatan_awal: req.body.catatan_awal,
      },
      include: {
        supplier: true,
        handphone: true,
        tipe_handphone: true,
        imei: true,
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
        imei: true,
        handphone: {
          select: {
            id: true,
            name: true,
          },
        },
        harga_pembelian: true,
        name_handphone: true,
        sales: true,
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
      imei: req.body.imei,
      handphone_id: parseInt(req.body.handphone_id),
      name_handphone: req.body.name_handphone,
      harga_pembelian: parseInt(req.body.harga_pembelian),
      sales: req.body.sales,
      tanggal_pembelian: new Date(req.body.tanggal_pembelian),
      jenis_pembelian: req.body.jenis_pembelian,
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
