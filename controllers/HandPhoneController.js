// Import express untuk membuat server web
const express = require("express");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const allHandPhone = async(req, res) => {
    try {
        // Ambil kategori 
        const handPhone = await prisma.handphone.findMany({
            select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
            },
            orderBy: {
                id: "desc",
            }
        });

        // Kirim respons
        res.status(200).send({
            // Meta untuk respons dalam format JSON
            meta: {
                success: true,
                message: "Berhasil mendapatkan semua jenis hand-phone",
            },
            // Data supplier
            data: handPhone,
        });
    } catch (error) {
        // Jika terjadi kesalahan, kirim respons kesalahan internal server
        res.status(500).send({
            // Meta untuk respons dalam format JSON
            meta: {
                success: false,
                message: "Terjadi kesalahan di server",
            },
            // Data kesalahan
            errors: error,
        });
    }
}

module.exports = {
    allHandPhone
}