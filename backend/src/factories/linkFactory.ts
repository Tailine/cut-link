import { FirebaseLinkRepository } from '@link/FirebaseLinkRepository'
import { LinkController } from '@link/LinkController'
import { LinkService } from '@link/LinkService'

export function createLinkController() {
  const linkRepository = new FirebaseLinkRepository()
  const linkService = new LinkService(linkRepository)

  return new LinkController(linkService)
}
