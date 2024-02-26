const { Pool,  types} = require("pg");

require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

// connection string for development
const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

// cast numeric (OID 1700) AS FLOAT (STRING IS DEFAULT IN NODE-POSTGRES)
types.setTypeParser(1700, function(val){
    return parseFloat(val);
})

// instantiate pool

const pool = new Pool({
    connnectionString : isProduction ? process.env.DATABASE_URL : devConfig,
    ssl : isProduction ? { rejectUnauthorized : false} : false,

});

module.exports = pool;
