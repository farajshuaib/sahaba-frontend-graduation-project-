import axios from 'axios'
import { CLOUD_VISION_API_KEY, CLOUD_VISION_CLINT_ID } from 'constant'
import { t } from 'i18next'
import { toast } from 'react-toastify'

export const safeSearchDetection = async (image: string) => {
  if (!image) return true
  try {
    toast.info(t('checking-image-content').toString())
    const { data } = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${CLOUD_VISION_API_KEY}`,
      {
        requests: [
          {
            image: {
              content: image.slice(image.indexOf('base64') + 7),
            },
            features: [
              {
                type: 'SAFE_SEARCH_DETECTION',
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Goog-Api-Key': CLOUD_VISION_API_KEY,
        },
      },
    )

    const safeSearchAnnotation = data.responses[0].safeSearchAnnotation
    const safeSearch = {
      adult: safeSearchAnnotation.adult,
      spoof: safeSearchAnnotation.spoof,
      medical: safeSearchAnnotation.medical,
      violence: safeSearchAnnotation.violence,
      racy: safeSearchAnnotation.racy,
    }

    if (
      Object.values(safeSearch).includes('POSSIBLE') ||
      Object.values(safeSearch).includes('LIKELY')
    ) {
      return false
    }

    return true
  } catch (e) {
    console.log('e', e)
    return true
  }
}
