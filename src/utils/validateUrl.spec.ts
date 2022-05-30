import { validateUrl } from './validateUrl'

describe('validateUrl', () => {
  describe('should return true', () => {
    test.each([
      'https://validlink.com',
      'https://invalidlink.com?id=12',
      'https://invalidlink.com.br',
      'https://invalidlink.com.br/?id=12'
    ])('when url is valid: %s', (url) => {
      expect(validateUrl(url)).toEqual(true)
    })
  })

  describe('should return false', () => {
    test.each([
      { url: '', message: 'when url is an empty string' },
      { url: 'http://invalidlink.com', message: 'when url is http' },
      { url: 'https://invalidlink', message: 'when url is missing last part' },
      {
        url: 'https://invalidlink/?id=12',
        message: 'when url is missing last part but have param'
      }
    ])('when url is $message', ({ url }) => {
      expect(validateUrl(url)).toEqual(false)
    })
  })
})
