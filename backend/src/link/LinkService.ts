import { FirebaseLinkRepository } from '@link/FirebaseLinkRepository'
import { nanoid } from 'nanoid'

export class LinkService {
  constructor(private repository: FirebaseLinkRepository) {}

  async shortenLink(originalUrl: string) {
    const hash = nanoid(8)

    return this.repository.create({ originalUrl, hash })
  }

  async getLink(hash: string) {
    return this.repository.get(hash)
  }
}
