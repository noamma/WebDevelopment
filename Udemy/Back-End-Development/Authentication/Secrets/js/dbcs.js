require("dotenv").config();
exports.getConnectionString = ()=>{return process.env.CONNECTION_STRING;};
exports.getCryptoString = ()=>{return process.env.CRYPTO_STRING;};
