const { body } = require("express-validator");

const validateWarna = [
    body("name").notEmpty().withMessage("Warna tipe handphone tidak boleh kosong"),
]

module.exports = { validateWarna }