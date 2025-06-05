const express = require("express");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const createKodeNegara = async(req, res) => {
    try {
        // Mencari id terakhir yang ada di database
        const lastKodeNegara = await prisma.kode_negara.findFirst({
            orderBy: {
                id: "desc",
            },
        });

        // Menyisipkan data  dengan kode negara yang telah dihasilkan
        const kode_negaras = await prisma.kode_negara.create({
            data: {
                name: req.body.name,
            },
        });

        //mengirimkan response
        res.status(201).send({
            meta: {
                success: true,
                message: "Kode negara berhasil ditambahkan",
            },
            data: kode_negaras,
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

const allKodeNegara = async(req, res) => {
    try {
        // Ambil kategori kode negara
        const kode_negaras = await prisma.kode_negara.findMany({
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
                message: "Berhasil mendapatkan semua kode negara",
            },
            // Data kode negara
            data: kode_negaras,
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
    createKodeNegara,
    allKodeNegara
}