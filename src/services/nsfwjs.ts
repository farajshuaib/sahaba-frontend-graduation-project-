import axios from 'axios'
import { toast } from 'react-toastify'

export async function safeImageDetection(image: File) {
  if (!image) return true
  try {
    const { data } = await axios.post(
      'https://safeimage.sahabanft.com.ly/check-image',
      {
        image,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
          Accept: 'application/json',
        },
      },
    )

    let isSafe = true

    data.data.forEach((element: any) => {
      console.log('element', element)
      if (element.className === 'Porn' && element.probability > 0.5) {
        toast.warn('cannot upload images that contain pornographic content')
        isSafe = false
      }
      if (element.className === 'Hentai' && element.probability > 0.5) {
        toast.warn('cannot upload images with Hentai content')
        isSafe = false
      }
      if (element.className === 'Sexy' && element.probability > 0.5) {
        toast.warn('cannot upload images with sexual content')
        isSafe = false
      }
    })
    return isSafe
  } catch (e) {
    console.log('e', e)
    return true
  }
}
