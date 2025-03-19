const express = require("express");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const createAksesoris = async (req, res) => {
    try {
        const lastAksesoris = await prisma.aksesoris.findFirst({
            orderBy: {
                id: "desc",
            },
        });

        const aksesoris = await prisma.aksesoris.create({
            data: {
                name: req.body.name,
            },
        });

        res.status(201).send({
            meta: {
                success: true,
                message: "Aksesoris berhasil ditambahkan"
            },
            data: aksesoris
        });
    } catch (error) {
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

const allAksesoris = async (req, res) => {
    try {
        // Ambil kategori
        const aksesoris = await prisma.aksesoris.findMany({
            select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        // Kirim respons
        res.status(200).send({
            // Meta untuk respons dalam format JSON
            meta: {
                success: true,
                message: "Berhasil mendapatkan semua jenis aksesoris",
            },
            // Data aksesoris
            data: aksesoris,
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
};

module.exports = {
    createAksesoris,
    allAksesoris
}