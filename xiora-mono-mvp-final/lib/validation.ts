import { z } from 'zod'

// 共通の検証ルール
const commonRules = {
  name: z.string()
    .min(1, '名前は必須です')
    .max(100, '名前は100文字以内で入力してください')
    .regex(/^[a-zA-Z\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s]+$/, '名前には英数字、ひらがな、カタカナ、漢字のみ使用できます'),
  
  email: z.string()
    .min(1, 'メールアドレスは必須です')
    .email('有効なメールアドレスを入力してください')
    .max(254, 'メールアドレスは254文字以内で入力してください'),
  
  phone: z.string()
    .regex(/^[\d\-\+\(\)\s]+$/, '有効な電話番号を入力してください')
    .min(10, '電話番号は10桁以上で入力してください')
    .max(20, '電話番号は20桁以内で入力してください'),
  
  company: z.string()
    .max(200, '会社名は200文字以内で入力してください')
    .optional(),
  
  message: z.string()
    .min(1, 'メッセージは必須です')
    .max(2000, 'メッセージは2000文字以内で入力してください')
    .regex(/^[^\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+$/, '無効な文字が含まれています'),
}

// お問い合わせフォームの検証スキーマ
export const contactFormSchema = z.object({
  name: commonRules.name,
  email: commonRules.email,
  company: commonRules.company,
  phone: commonRules.phone,
  message: commonRules.message,
  consent: z.boolean()
    .refine(val => val === true, '個人情報の取り扱いについて同意が必要です'),
  purpose: z.enum(['general', 'catalog', 'custom', 'rental', 'support']),
})

// 予約フォームの検証スキーマ
export const reservationFormSchema = z.object({
  name: commonRules.name,
  email: commonRules.email,
  company: commonRules.company,
  phone: commonRules.phone,
  equipment: z.string()
    .min(1, '機器を選択してください')
    .max(100, '機器名は100文字以内で入力してください'),
  startDate: z.string()
    .min(1, '開始日は必須です')
    .refine(val => {
      const date = new Date(val)
      const now = new Date()
      return date > now
    }, '開始日は今日以降の日付を選択してください'),
  endDate: z.string()
    .min(1, '終了日は必須です')
    .refine(val => {
      const date = new Date(val)
      const now = new Date()
      return date > now
    }, '終了日は今日以降の日付を選択してください'),
  message: commonRules.message,
  consent: z.boolean()
    .refine(val => val === true, '利用規約への同意が必要です'),
}).refine(data => {
  const startDate = new Date(data.startDate)
  const endDate = new Date(data.endDate)
  return endDate > startDate
}, {
  message: '終了日は開始日より後の日付を選択してください',
  path: ['endDate'],
})

// 検索クエリの検証スキーマ
export const searchQuerySchema = z.object({
  q: z.string()
    .max(100, '検索クエリは100文字以内で入力してください')
    .regex(/^[^\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+$/, '無効な文字が含まれています'),
  category: z.string()
    .max(50, 'カテゴリ名は50文字以内で入力してください')
    .optional(),
  page: z.coerce.number()
    .int('ページ番号は整数で入力してください')
    .min(1, 'ページ番号は1以上で入力してください')
    .max(1000, 'ページ番号は1000以下で入力してください')
    .default(1),
  limit: z.coerce.number()
    .int('表示件数は整数で入力してください')
    .min(1, '表示件数は1以上で入力してください')
    .max(100, '表示件数は100以下で入力してください')
    .default(20),
})

// ファイルアップロードの検証スキーマ
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= 10 * 1024 * 1024, 'ファイルサイズは10MB以下にしてください')
    .refine(file => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
      return allowedTypes.includes(file.type)
    }, '対応していないファイル形式です'),
})

// 型定義のエクスポート
export type ContactFormData = z.infer<typeof contactFormSchema>
export type ReservationFormData = z.infer<typeof reservationFormSchema>
export type SearchQueryData = z.infer<typeof searchQuerySchema>
export type FileUploadData = z.infer<typeof fileUploadSchema>

// 検証関数
export function validateContactForm(data: unknown): ContactFormData {
  return contactFormSchema.parse(data)
}

export function validateReservationForm(data: unknown): ReservationFormData {
  return reservationFormSchema.parse(data)
}

export function validateSearchQuery(data: unknown): SearchQueryData {
  return searchQuerySchema.parse(data)
}

export function validateFileUpload(data: unknown): FileUploadData {
  return fileUploadSchema.parse(data)
}
