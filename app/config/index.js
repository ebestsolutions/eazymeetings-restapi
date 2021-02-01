import Dotenv from 'dotenv'

Dotenv.config()

export const corsOptionsDelegate = (req, callback) => {
    const corsOptions = { origin: (process.env.WHITELIST.indexOf(req.header('Origin')) !== -1) }

    console.log('corsOptions: ', corsOptions)

    callback(null, corsOptions)
}

export default {
    site_name: process.env.SITE_NAME,
    port: process.env.PORT,
}