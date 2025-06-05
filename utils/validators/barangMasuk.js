// Import express validator
const { body } = require("express-validator");

// Import prisma client
const prisma = require("../../prisma/client");

const validateBarangMasuk = [
    body("supplier_id").notEmpty().withMessage("Supplier tidak boleh kosong"),
    body("imei_id").notEmpty().withMessage("Imei tidak boleh kosong"),
    body("kodenegara_id").notEmpty().withMessage("Kode negara tidak boleh kosong"),
    body("warna_id").notEmpty().withMessage("Warna tidak boleh kosong"),
    body("kapasitas_id").notEmpty().withMessage("Kapasitas tidak boleh kosong"),
    body("handphone_id").notEmpty().withMessage("Handphone tidak boleh kosong"),
    body("namehandphone_id")
    .notEmpty()
    .withMessage("Nama tipe handphone tidak boleh kosong"),
    body("harga_pembelian")
    .notEmpty()
    .withMessage("Harga pembelian tidak boleh kosong"),
    body("sales").notEmpty().withMessage("Sales tidak boleh kosong"),
    body("tanggal_pembelian")
    .notEmpty()
    .withMessage("Tanggal pembelian tidak boleh kosong"),
    body("jenis_pembelian")
    .notEmpty()
    .withMessage("Jenis pembelian tidak boleh kosong"),
    body("catatan_awal").notEmpty().withMessage("Catatan tidak boleh kosong"),
];

module.exports = { validateBarangMasuk };