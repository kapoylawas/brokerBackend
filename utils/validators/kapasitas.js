const { body } = require("express-validator");

const validateKapasitas = [
    body("name").notEmpty().withMessage("Kapsitas tipe handphone tidak boleh kosong"),
]

module.exports = { validateKapasitas }