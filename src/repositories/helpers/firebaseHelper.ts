import { dbInstance } from 'dbConnection'
import { LinkData } from '@entities/link'
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  setDoc
} from 'firebase/firestore'

export const FirebaseClient = {
  createShortLink: async (linkData: LinkData) => {
    const linksRef = collection(dbInstance, 'links')
    await setDoc(doc(linksRef, linkData.hash), {
      original_url: linkData.originalUrl
    })
  },
  getDocumentData: async (hash: string): Promise<DocumentData | null> => {
    const linkDocRef = doc(dbInstance, 'links', hash)
    const docSnap = await getDoc(linkDocRef)

    if (!docSnap.exists()) {
      return null
    }

    return docSnap.data()
  }
}
