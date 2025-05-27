// Import express validator
const { body } = require("express-validator");

// Import prisma client
const prisma = require('../../prisma/client');

const validateBarangMasuk = [
    body("supplier_id").notEmpty().withMessage("Supplier tidak boleh kosong"),
    body("imei")
    .notEmpty().withMessage("Imei tidak boleh kosong")
    .custom(async(imei, { req }) => {
        const existingImei = await prisma.barang_masuk.findFirst({
            where: { imei: imei },
        });

        // Jika IMEI sudah ada dan bukan untuk update (tidak ada req.params.id)
        if (existingImei && (!req.params.id || existingImei.id !== parseInt(req.params.id))) {
            throw new Error("IMEI handphone sudah terdaftar");
        }

        return true;
    }),
    body("kode_negara").notEmpty().withMessage("Kode negara tidak boleh kosong"),
    body("handphone_id").notEmpty().withMessage("Handphone tidak boleh kosong"),
    body("name_handphone").notEmpty().withMessage("Nama handphone tidak boleh kosong"),
    body("harga_pembelian").notEmpty().withMessage("Harga pembelian tidak boleh kosong"),
    body("sales").notEmpty().withMessage("Sales tidak boleh kosong"),
    body("tanggal_pembelian").notEmpty().withMessage("Tanggal pembelian tidak boleh kosong"),
    body("jenis_pembelian").notEmpty().withMessage("Jenis pembelian tidak boleh kosong"),
    body("catatan_awal").notEmpty().withMessage("Catatan tidak boleh kosong"),
];

module.exports = { validateBarangMasuk }