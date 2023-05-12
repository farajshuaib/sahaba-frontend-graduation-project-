import { fileToBase64 } from './../utils/functions'
import { t } from 'i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { safeSearchDetection } from './cloudVision'
import { safeImageDetection } from './nsfwjs'
export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const createCollectionSchema = yup.object().shape({
  logo_image: yup
    .mixed()
    .test('fileSize', t('validations.The_file_is_too_large'), (value) => {
      if (!value?.length) return true // attachment is optional
      return value.size <= 100000024
    })
    .required(),
  banner_image: yup
    .mixed()
    .test('fileSize', t('validations.The_file_is_too_large'), (value) => {
      if (!value?.length) return true // attachment is optional
      return value.size <= 100000024
    })
    .required(),
  name: yup.string().required(t('validations.name_is_required')),
  description: yup.string().required(t('validations.description_is_required')),
  facebook_url: yup.string().url(t('validations.url_invalid')).nullable(),
  twitter_url: yup.string().url(t('validations.url_invalid')).nullable(),
  telegram_url: yup.string().url(t('validations.url_invalid')).nullable(),
  is_sensitive_content: yup.boolean().required(),
  category_id: yup.number().required(t('validations.category_is_required')),
})

export const updateCollectionSchema = yup.object().shape({
  name: yup.string().required(t('validations.name_is_required')),
  description: yup.string().required(t('validations.description_is_required')),
  facebook_url: yup.string().url(t('validations.url_invalid')).nullable(),
  twitter_url: yup.string().url(t('validations.url_invalid')).nullable(),
  telegram_url: yup.string().url(t('validations.url_invalid')).nullable(),
  is_sensitive_content: yup.boolean().required(),
  category_id: yup.number().required(t('validations.category_is_required')),
})

export const createNftSchema = yup.object().shape({
  title: yup.string().required(t('validations.title_is_required')),
  description: yup.string().required(t('validations.description_is_required')),
  file_path: yup.string().required(t('validations.image_is_required')),
  collection_id: yup.number().required(t('validations.collection_is_required')),
  price: yup
    .number()
    .required(t('validations.price_is_required'))
    .positive(t('validations.price_must_be_more_than_zero'))
    .min(0.01, t('validations.price_is_to_low'))
    .max(10.0, t('validations.price_is_too_high')),
})

export const createPoemNftSchema = yup.object().shape({
  title: yup.string().required(t('validations.title_is_required')),
  description: yup.string().required(t('validations.description_is_required')),
  collection_id: yup.number().required(t('validations.collection_is_required')),
  price: yup
    .number()
    .required(t('validations.price_is_required'))
    .positive(t('validations.price_must_be_more_than_zero'))
    .min(0.01, t('validations.price_is_to_low'))
    .max(5.0, t('validations.price_is_too_high')),
})

export const updatePriceSchema = yup.object().shape({
  price: yup
    .number()
    .required(t('validations.price_is_required'))
    .positive(t('validations.price_must_be_more_than_zero'))
    .min(0.01, t('validations.price_is_to_low'))
    .max(5.0, t('validations.price_is_too_high')),
})

export const contactSchema = yup.object().shape({
  name: yup.string().required(t('validations.name_is_required')),
  email: yup.string().email().required(t('validations.email_is_required')),
  subject: yup.string().required(t('validations.subject_is_required')),
  message: yup.string().required(t('validations.message_is_required')),
})

export const kycSchema = yup.object().shape({
  gender: yup.string().required(t('validations.genger_is_required')),
  country: yup.string().required(t('validations.country_is_required')),
  city: yup.string().required(t('validations.city_is_required')),
  address: yup.string().required(t('validations.address_is_required')),
  phone_number: yup
    .string()
    .matches(phoneRegExp, t('validations.phone_number_is_invalid'))
    .required(),
  author_type: yup.string().required(t('validations.author_type_is_required')),
  author_art_type: yup
    .string()
    .required(t('validations.author_art_type_is_required')),
  passport_id: yup
    .mixed()
    .test('fileSize', t('validations.The_file_is_too_large'), (value) => {
      if (!value?.length) return true // attachment is optional
      return value.size <= 100000024
    }),
})

export const updateAccountSchema = yup.object().shape({
  first_name: yup.string().required(t('validations.first_name_is_required')),
  last_name: yup.string().required(t('validations.last_name_is_required')),
  username: yup.string().required(t('validations.username_is_required')).trim(),
  email: yup.string().email().required('t(validations.email_is_required)'),
  bio: yup.string().nullable(),
  website_url: yup.string().url(t('validations.url_invalid')).nullable(),
  facebook_url: yup.string().url(t('validations.url_invalid')).nullable(),
  twitter_url: yup.string().url(t('validations.url_invalid')).nullable(),
  telegram_url: yup.string().url(t('validations.url_invalid')).nullable(),
  instagram_url: yup.string().url(t('validations.url_invalid')).nullable(),
  banner_photo: yup
    .mixed()
    .test('fileSize', t('validations.The_file_is_too_large'), (value) => {
      if (!value?.length) return true // attachment is optional
      return value.size <= 100000024
    }),
  profile_photo: yup
    .mixed()
    .test('fileSize', t('validations.The_file_is_too_large'), (value) => {
      if (!value?.length) return true // attachment is optional
      return value.size <= 100000024
    }),
})

export const validateImage = async (file: File) => {
  const fileType = file?.type
  const fileSize = file?.size
  const validImageTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg',
    'image/webp',
    'image/svg+xml',
  ]

  // validation file type
  if (!validImageTypes.includes(fileType)) {
    toast.error(`${t('validations.The_file_must_be_an_image')}`)
    return false
  }

  // validation file size
  if (fileSize > 100000024) {
    toast.error(`${t('validations.The_file_is_too_large')}`)
    return false
  }

  const reader = new FileReader()
  const b64string = (await fileToBase64(file)) as string

  if (b64string) {
    const isSafeImage = await safeSearchDetection(b64string as string)
    if (!isSafeImage) {
      toast.error(
        `${t('the-image-is-not-safe-it-may-contain-nudity-or-violence')}`,
      )
      return false
    }
  }

  const isClearImage = await safeImageDetection(file)

  if (!isClearImage) {
    return false
  }

  return true
}
