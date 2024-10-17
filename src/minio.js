const Minio = require("minio");
require("dotenv").config();

const minioClient = new Minio.Client({
    endPoint: "",
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
});

module.exports = minioClient;