const BodyParser = require('body-parser')
const Compression = require('compression')
const Cors = require('cors')
const Express = require('express')
const Helmet = require('helmet')

const config = require('./config/index.js')

const routes = require('./routes/index.js')

const app = Express()

app.use(Cors(config.corsOptionsDelegate))
app.use(Compression())
app.use(Helmet())

app.use('/api/v1', BodyParser.json())
app.use('/api/v1', routes)
app.use('/', BodyParser.urlencoded({ extended: false }))

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
