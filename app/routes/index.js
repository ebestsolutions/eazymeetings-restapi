import { Router } from 'express'

import UserController from '../controllers/UserController.js'

const router = Router()


router.get('/', (req, res) => {
    res.send('Eazy Meetings REST APIs!')
})

router.post('/signup', UserController.signup)

export default router