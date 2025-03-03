// Import express validator
const { body } = require("express-validator");

// Import prisma client
const prisma = require('../../prisma/client');

const validateBarangMasuk = [
    body("supplier_id").notEmpty().withMessage("Supplier tidak boleh kosong"),
    body("imei").notEmpty().withMessage("Imei tidak boleh kosong")
    .custom(async(imei, { req }) => {
        const existingImei = await prisma.barang_masuk.findFirst({
            where: { imei: imei },
        });

        if (existingImei && (!req.params.id || existingImei.id !== parseInt(req.params.id))) {
            throw new ERROR("IMEI handphone sudah terdaftar")
        }

        return true;
    }),
    body("handphone_id").notEmpty().withMessage("Handphone tidak boleh kosong"),
    body("harga_pembelian").notEmpty().withMessage("Harga pembelian tidak boleh kosong"),
    body("catatan_awal").notEmpty().withMessage("Catatan tidak boleh kosong"),
]

module.exports = { validateBarangMasuk }