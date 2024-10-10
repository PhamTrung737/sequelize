import dotenv from "dotenv"

dotenv.config()

export default {
    user:process.env.DB_NAME,
    pass:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:process.env.DB_DIALECT,
    root:process.env.DB_ROOT,
   
}