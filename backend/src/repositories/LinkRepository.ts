import { LinkData } from '../entities/link'

export interface LinkRepository {
  create(linkData: LinkData): Promise<{ hash?: string; error?: string }>
  get(hash: string): Promise<string | null>
}
