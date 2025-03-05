// Import express untuk membuat server web
const express = require("express");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const createBarangMasuk = async(req, res) => {
    try {
        const barangMasuk = await prisma.barang_masuk.create({
            data: {
                supplier_id: parseInt(req.body.supplier_id),
                imei: req.body.imei,
                handphone_id: parseInt(req.body.handphone_id),
                harga_pembelian: parseInt(req.body.harga_pembelian),
                sales: req.body.sales,
                tanggal_pembelian: new Date(req.body.tanggal_pembelian),
                jenis_pembelian: req.body.jenis_pembelian,
                catatan_awal: req.body.catatan_awal,
            },
            include: {
                supplier: true,
                handphone: true
            }
        })

        // mengirimkan respons
        res.status(201).send({
            // meta untuk response json
            meta: {
                success: true,
                message: "Data barang masuk berhasil di tambahkan"
            },
            //data
            data: barangMasuk,
        })
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
}

module.exports = {
    createBarangMasuk
}