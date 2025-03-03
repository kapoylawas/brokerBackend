//import express validator
const { body } = require('express-validator');

//import prisma
const prisma = require('../../prisma/client');

//definisikan validasi untuk login
const validateLogin = [
    body('email').notEmpty().withMessage('Email tidak boleh kosong'),
    body('password').isLength({ min: 6 }).withMessage('Password harus minimal 6 karakter'),
];

module.exports = { validateLogin };