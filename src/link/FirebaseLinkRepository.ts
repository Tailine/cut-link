import { LinkData } from '@entities/link'
import { LinkRepository } from '@repositories/LinkRepository'
import { FirebaseClient } from '@repositories/helpers/firebaseHelper'

export class FirebaseLinkRepository implements LinkRepository {
  async create(linkData: LinkData) {
    const docData = await FirebaseClient.getDocumentData(linkData.hash)
    if (docData) {
      return { error: 'No duplicated links allowed' }
    }

    await FirebaseClient.createShortLink(linkData)
    return { hash: linkData.hash }
  }

  async get(hash: string): Promise<string | null> {
    const docData = await FirebaseClient.getDocumentData(hash)
    if (!docData) {
      return null
    }
    return docData.original_url
  }
}
