const { Pool } = require('pg');

const config = {
    user: "avnadmin",
    password: "AVNS_kZHTh4zPBibIJydzVu0",
    host: "pg-neuroflash-neuroflash.h.aivencloud.com",
    port: 25710,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIETTCCArWgAwIBAgIUXHxrIhoBS7+irFo7lxWY4Irdlw8wDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1YjBiODkwM2ItNjA2NC00NTBmLWExYTUtMWY0Zjc1ZTU1
MzM3IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwNTE0MjEzNDEyWhcNMzUwNTEyMjEz
NDEyWjBAMT4wPAYDVQQDDDViMGI4OTAzYi02MDY0LTQ1MGYtYTFhNS0xZjRmNzVl
NTUzMzcgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAMe4xMA9Q0vUqS1Fv83tjbh5MPGw07ItpmzrJOfYWltOnlF8Gra9DXpP
fZL5w25IGrqIdV1o/7vo/CQeNuf2DU57F3rXjNq4QiLx3J/0kUNIKYP0groQQWBl
GrN/pzuTnQ2WSJr3OGE/6qEQHNm2XRA5iGxSi2yphN+x9YjlyrES5mX/jovDSd6c
EHdTgz8Q1o6/0pIan9uSbddZuZ3N+9V0oJiSesPwC20Fz3Enlc1JQP3vt7xsDEQS
NzZsgMMcmZqXz1VSNCtj7QXyDVhCHEPdt3tScBjnEqNZbfZbRmkBT4c1NAzMKXl1
+0ZKHlhcMbDnrPuo53CZQbsaRrG8Bz3n0qU3GhePMQ5F0ojwLRFERdPyC4VBQLxw
0D/5ce8x+oPnaI8HVy3oREaPb7OM1l8CMgkPcC129nWos7CEXSAilF5qW7875jCv
NH6KoHMMQPvZ/t+qRr9y39j3EwnNYCPZ7xbby0LaevxfdW2jU4S0uZQrLFhGNjX6
hStp7FiymQIDAQABoz8wPTAdBgNVHQ4EFgQUWX6G+PybgacqZDOPu4Ooy1fzhc4w
DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
AEdpeXlNuUejOZtlxJQ72TNRMJgazJr0W9HQ1RlhE/P/7IO6cOT68MHT0KCvOHK2
zmJncagJPm0oaCcC3DsMLakmSXfrOoQmhQquYWnwAXJcm/nqfWIqffUTFgTuXJ5W
EUakfXHvOy5rwoz5l8iE3lkH1VLX4Af01RzeoHHEVi4BwFRoDD0GW9MRnALZJ65+
qESeGbdVHKJj8zg0BUundwjJS77j+WjMtjVobd8ytkIuCFcnm+sElRQOkwWhQjEC
+2BYkKSy9gsugZONMbfjPq/vFcHS4easHr4DBUtxBDe/jHvV1JzYA9a74wz2qlr3
GIJRkURrik5XjIYm78A9zWzhoB3sjXNNIiZmbGiCJDoxL8g9FmquaafM1sCy8aDt
rtvVlkXhOp+5JympSZrpidbS9ds5hLckH8Q/Kou3aG8w6JMt4nZrT4AcU4XAcbZi
t2dVgx6Ew13YHKGH4UlVzppEIgnrpdBcbuxNRcEV0SRtyovCBurSwuJe+WG2WApD
YQ==
-----END CERTIFICATE-----`,
    },
};

// Create a connection pool instead of a single client
const pool = new Pool(config);

// Test the connection
pool.connect()
    .then(() => console.log("✅ Connected to Aiven PostgreSQL"))
    .catch(err => console.error("❌ PostgreSQL Connection Error:", err));

// Export the pool to be used in other files
module.exports = pool;