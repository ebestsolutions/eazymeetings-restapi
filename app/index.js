const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')

const config = require('./config/index.js')

const routes = require('./routes/index.js')

const app = express()

app.use(cors(config.corsOptionsDelegate))
app.use(compression())
app.use(helmet())

app.use('/api/v1', bodyParser.json())
app.use('/api/v1', routes)
app.use('/', bodyParser.urlencoded({ extended: false }))

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong, please try later!')
})

app.get('/', (req, res) => {
    res.send(`Welcome to ${config.site_name}!`)
})


app.listen(config.port, () => {
    console.log(`Server started on port: ${config.port}`)
})
