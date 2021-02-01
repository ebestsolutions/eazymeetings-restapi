const dotenv = require('dotenv')

dotenv.config()

const corsOptionsDelegate = (req, callback) => {
    const corsOptions = { origin: (process.env.WHITELIST.indexOf(req.header('Origin')) !== -1) }

    console.log('corsOptions: ', corsOptions)

    callback(null, corsOptions)
}

module.exports = {
    site_name: process.env.SITE_NAME,
    port: process.env.PORT,
    corsOptionsDelegate,
}