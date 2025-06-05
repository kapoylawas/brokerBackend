const express = require("express");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const createKapasitas = async(req, res) => {
    try {
        // Mencari id terakhir yang ada di database
        const lastKapasitas = await prisma.kapasitas.findFirst({
            orderBy: {
                id: "desc",
            },
        });

        // Menyisipkan data tipe kapasitas yang telah dihasilkan
        const kapasitas = await prisma.kapasitas.create({
            data: {
                name: req.body.name,
            },
        });

        //mengirimkan response
        res.status(201).send({
            meta: {
                success: true,
                message: "Tipe kapasitas berhasil ditambahkan",
            },
            data: kapasitas,
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

const allKapasitas = async(req, res) => {
    try {
        // Ambil kategori kapasitas
        const kapasitas = await prisma.kapasitas.findMany({
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
                message: "Berhasil mendapatkan semua jenis kapasitas",
            },
            // Data tipe handphone
            data: kapasitas,
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
    createKapasitas,
    allKapasitas
}