const Minio = require("minio");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT) || 9000,
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const uploadFileToMinIO = (file) => {
    const metaData = {
        "Content-Type": file.mimetype, // Ensure correct MIME type
    };

    const fileName = Date.now() + path.extname(file.originalname);

    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(file.path);
        fileStream.on("error", (err) => {
            console.error("File stream error:", err);
            reject(err);
        });

        minioClient.putObject("movie", fileName, fileStream, metaData, (err, etag) => {
            if (err) {
                console.error("MinIO upload error:", err);
                return reject(err);
            }
            const fileUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/movie/${fileName}`;
            console.log("File uploaded successfully. URL:", fileUrl); // Log the URL for debugging
            resolve(fileUrl);
        });
    });
};

const getVideoUrlFromMinIO = (fileName) => {
    return new Promise((resolve, reject) => {
        minioClient.presignedUrl(
            "GET",
            "movie",
            fileName,
            24 * 60 * 60,
            (err, presignedUrl) => {
                if (err) {
                    return reject(err);
                }
                resolve(presignedUrl);
            }
        );
    });
};

module.exports = { minioClient, uploadFileToMinIO, getVideoUrlFromMinIO };