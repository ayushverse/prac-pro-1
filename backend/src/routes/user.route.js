import {Router} from 'express'

const router = Router()

router.get('/' , (req, res) => {
    res.send('User rout loaded');
})


export default router