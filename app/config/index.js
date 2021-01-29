import Dotenv from 'dotenv'

Dotenv.config()

export default {
    site_name: process.env.SITE_NAME,
    port: process.env.PORT,
}