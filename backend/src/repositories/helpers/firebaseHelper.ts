import { dbInstance } from 'dbConnection'
import { LinkData } from '@entities/link'
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore'

export const FirebaseClient = {
  createShortLink: async (linkData: LinkData): Promise<string> => {
    const linksRef = collection(dbInstance, 'links')

    const q = query(
      collection(dbInstance, 'links'),
      where('original_url', '==', linkData.originalUrl)
    )
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const a = querySnapshot.docs[0].data().hash
      return a
    }

    await setDoc(doc(linksRef, linkData.hash), {
      original_url: linkData.originalUrl,
      hash: linkData.hash
    })
    return linkData.hash
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
