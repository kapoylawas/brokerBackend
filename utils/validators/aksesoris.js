const { body } = require("express-validator");

const validateAksesoris = [
    body("name").notEmpty().withMessage("Nama aksesoris tidak boleh kosong"),
]

module.exports = { validateAksesoris }