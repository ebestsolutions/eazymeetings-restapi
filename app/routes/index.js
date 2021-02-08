const { Router } = require('express')

const UserController = require('../controllers/UserController.js')

const router = Router()


router.get('/', (req, res) => {
    res.send('Eazy Meetings REST APIs!')
})

// User Signup
router.post('/signup', UserController.create)

// Get users list
router.get('/users', UserController.list)

// Get a user
router.get('/users/:uid', UserController.get)

module.exports = router