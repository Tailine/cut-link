import { Router } from 'express'
import { createLinkController } from '../factories/linkFactory'

const router = Router()
const linkController = createLinkController()

router.post('/', linkController.handleNewShortUrl)
router.get('/:hash', linkController.handleRedirect)

export default router
