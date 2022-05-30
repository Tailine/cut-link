import { createLinkController } from '@factories/linkFactory'
import { Router } from 'express'

const router = Router()
const linkController = createLinkController()

router.post('/', linkController.handleNewShortUrl)
router.get('/:hash', linkController.handleRedirect)

export default router
