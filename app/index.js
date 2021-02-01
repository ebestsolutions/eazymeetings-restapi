import BodyParser from 'body-parser'
import Compression from 'compression'
import Cors from 'cors'
import Express from 'express'
import Helmet from 'helmet'

import config, {
    corsOptionsDelegate,
} from './config/index.js'

import routes from './routes/index.js'

const app = Express()

app.use(Cors(corsOptionsDelegate))
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
