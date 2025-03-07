//import express validator
const { body } = require('express-validator');

//import prisma
const prisma = require('../../prisma/client');

//definisikan validasi untuk login
const validateLogin = [
    body('email').notEmpty().withMessage('Email tidak boleh kosong'),
    body('password').isLength({ min: 6 }).withMessage('Password harus minimal 6 karakter'),
];

// Middleware untuk memeriksa kecocokan email dan password
const checkLoginCredentials = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Cari pengguna berdasarkan email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Bandingkan password yang dimasukkan dengan password yang di-hash di database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Jika email dan password valid, lanjutkan ke middleware atau handler berikutnya
        req.user = user; // Anda bisa menyimpan data pengguna di req untuk digunakan di handler berikutnya
        next();
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat memproses login' });
    }
};

module.exports = { validateLogin, checkLoginCredentials };