const express = require("express");

// Import prisma client untuk berinteraksi dengan database
const prisma = require("../prisma/client");

const createWarna = async(req, res) => {
    try {
        // Mencari id terakhir yang ada di database
        const lastWarna = await prisma.warna.findFirst({
            orderBy: {
                id: "desc",
            },
        });

        // Menyisipkan data tipe warna yang telah dihasilkan
        const warnas = await prisma.warna.create({
            data: {
                name: req.body.name,
            },
        });

        //mengirimkan response
        res.status(201).send({
            meta: {
                success: true,
                message: "Tipe warna berhasil ditambahkan",
            },
            data: warnas,
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

const allWarna = async(req, res) => {
    try {
        // Ambil kategori warna
        const warnas = await prisma.warna.findMany({
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
                message: "Berhasil mendapatkan semua jenis warna",
            },
            // Data tipe handphone
            data: warnas,
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
    createWarna,
    allWarna
}