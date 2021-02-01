const { Router } = require('express')

const UserController = require('../controllers/UserController.js')

const router = Router()


router.get('/', (req, res) => {
    res.send('Eazy Meetings REST APIs!')
})

router.post('/signup', UserController.signup)

module.exports = router