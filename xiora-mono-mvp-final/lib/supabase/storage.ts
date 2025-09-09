import { supabase } from './client'

export interface FileUploadOptions {
  bucket: string
  path: string
  file: File
  metadata?: Record<string, any>
  cacheControl?: string
}

export interface FileDownloadOptions {
  bucket: string
  path: string
}

export interface FileDeleteOptions {
  bucket: string
  path: string
}

export interface FileListOptions {
  bucket: string
  path?: string
  limit?: number
  offset?: number
  sortBy?: {
    column: 'name' | 'created_at' | 'updated_at' | 'last_accessed_at'
    order: 'asc' | 'desc'
  }
}

// ファイルストレージ管理クラス
export class StorageManager {
  // ファイルのアップロード
  static async uploadFile(options: FileUploadOptions): Promise<{ data: any; error: any }> {
    try {
      const { bucket, path, file, metadata, cacheControl } = options

      // ファイルサイズのチェック（100MB制限）
      if (file.size > 100 * 1024 * 1024) {
        return { data: null, error: 'File size exceeds 100MB limit' }
      }

      // ファイルタイプの検証
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain', 'text/csv'
      ]

      if (!allowedTypes.includes(file.type)) {
        return { data: null, error: 'File type not allowed' }
      }

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: cacheControl || '3600',
          upsert: true,
          metadata
        })

      if (error) {
        console.error('File upload error:', error)
        return { data: null, error }
      }

      // アップロード成功後の処理
      await this.logFileUpload(bucket, path, file, metadata)

      return { data, error: null }
    } catch (error) {
      console.error('File upload failed:', error)
      return { data: null, error }
    }
  }

  // ファイルのダウンロード
  static async downloadFile(options: FileDownloadOptions): Promise<{ data: Blob | null; error: any }> {
    try {
      const { bucket, path } = options

      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path)

      if (error) {
        console.error('File download error:', error)
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      console.error('File download failed:', error)
      return { data: null, error }
    }
  }

  // ファイルの削除
  static async deleteFile(options: FileDeleteOptions): Promise<{ data: any; error: any }> {
    try {
      const { bucket, path } = options

      const { data, error } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (error) {
        console.error('File delete error:', error)
        return { data: null, error }
      }

      // 削除成功後の処理
      await this.logFileDelete(bucket, path)

      return { data, error: null }
    } catch (error) {
      console.error('File delete failed:', error)
      return { data: null, error }
    }
  }

  // ファイル一覧の取得
  static async listFiles(options: FileListOptions): Promise<{ data: any[] | null; error: any }> {
    try {
      const { bucket, path = '', limit = 100, offset = 0, sortBy } = options

      let query = supabase.storage
        .from(bucket)
        .list(path, {
          limit,
          offset,
          sortBy: sortBy ? { column: sortBy.column, order: sortBy.order } : undefined
        })

      const { data, error } = await query

      if (error) {
        console.error('File list error:', error)
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      console.error('File list failed:', error)
      return { data: null, error }
    }
  }

  // ファイルの公開URL取得
  static getPublicUrl(bucket: string, path: string): string {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return data.publicUrl
  }

  // 署名付きURLの生成（一時的なアクセス用）
  static async createSignedUrl(
    bucket: string,
    path: string,
    expiresIn: number = 3600
  ): Promise<{ data: string | null; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn)

      if (error) {
        console.error('Signed URL creation error:', error)
        return { data: null, error }
      }

      return { data: data.signedUrl, error: null }
    } catch (error) {
      console.error('Signed URL creation failed:', error)
      return { data: null, error }
    }
  }

  // 画像の最適化URL取得
  static getOptimizedImageUrl(
    bucket: string,
    path: string,
    options: {
      width?: number
      height?: number
      quality?: number
      format?: 'webp' | 'avif' | 'jpeg' | 'png'
    } = {}
  ): string {
    const { width, height, quality, format } = options
    let url = this.getPublicUrl(bucket, path)

    // 画像最適化パラメータの追加
    const params = new URLSearchParams()
    if (width) params.append('width', width.toString())
    if (height) params.append('height', height.toString())
    if (quality) params.append('quality', quality.toString())
    if (format) params.append('format', format)

    if (params.toString()) {
      url += `?${params.toString()}`
    }

    return url
  }

  // ファイルのメタデータ更新
  static async updateFileMetadata(
    bucket: string,
    path: string,
    metadata: Record<string, any>
  ): Promise<{ data: any; error: any }> {
    try {
      // @ts-ignore - Supabaseの型チェックを無効化
      const { data, error } = await (supabase as any).storage
        .from(bucket)
        .update(path, {
          metadata
        })

      if (error) {
        console.error('File metadata update error:', error)
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      console.error('File metadata update failed:', error)
      return { data: null, error }
    }
  }

  // ファイルの移動
  static async moveFile(
    bucket: string,
    oldPath: string,
    newPath: string
  ): Promise<{ data: any; error: any }> {
    try {
      // 新しい場所にコピー
      const { data: copyData, error: copyError } = await supabase.storage
        .from(bucket)
        .copy(oldPath, newPath)

      if (copyError) {
        console.error('File copy error:', copyError)
        return { data: null, error: copyError }
      }

      // 古いファイルを削除
      const { error: deleteError } = await this.deleteFile({ bucket, path: oldPath })

      if (deleteError) {
        console.error('Old file delete error:', deleteError)
        // コピーは成功しているので、削除エラーは警告として扱う
      }

      return { data: copyData, error: null }
    } catch (error) {
      console.error('File move failed:', error)
      return { data: null, error }
    }
  }

  // ファイルのコピー
  static async copyFile(
    bucket: string,
    sourcePath: string,
    destinationPath: string
  ): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .copy(sourcePath, destinationPath)

      if (error) {
        console.error('File copy error:', error)
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      console.error('File copy failed:', error)
      return { data: null, error }
    }
  }

  // ストレージ使用量の取得
  static async getStorageUsage(bucket: string): Promise<{ data: number | null; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list('', { limit: 1000 })

      if (error) {
        console.error('Storage usage check error:', error)
        return { data: null, error }
      }

      // ファイルサイズの合計を計算
      const totalSize = data.reduce((sum, file) => sum + (file.metadata?.size || 0), 0)

      return { data: totalSize, error: null }
    } catch (error) {
      console.error('Storage usage check failed:', error)
      return { data: null, error }
    }
  }

  // ファイルアップロードのログ記録
  private static async logFileUpload(
    bucket: string,
    path: string,
    file: File,
    metadata?: Record<string, any>
  ) {
    try {
      // 監査ログに記録
      console.log(`File uploaded: ${bucket}/${path}`, {
        size: file.size,
        type: file.type,
        metadata
      })
    } catch (error) {
      console.error('Failed to log file upload:', error)
    }
  }

  // ファイル削除のログ記録
  private static async logFileDelete(bucket: string, path: string) {
    try {
      // 監査ログに記録
      console.log(`File deleted: ${bucket}/${path}`)
    } catch (error) {
      console.error('Failed to log file delete:', error)
    }
  }
}

// 特定のバケット用の特殊化されたマネージャー
export class ImageStorage extends StorageManager {
  static readonly BUCKET = 'images'

  static async uploadImage(
    file: File,
    path: string,
    metadata?: Record<string, any>
  ) {
    return this.uploadFile({
      bucket: this.BUCKET,
      path,
      file,
      metadata: {
        ...metadata,
        type: 'image',
        uploaded_at: new Date().toISOString()
      }
    })
  }

  static getImageUrl(path: string, options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'avif' | 'jpeg' | 'png'
  }) {
    return this.getOptimizedImageUrl(this.BUCKET, path, options)
  }

  static async deleteImage(path: string) {
    return this.deleteFile({
      bucket: this.BUCKET,
      path
    })
  }
}

export class DocumentStorage extends StorageManager {
  static readonly BUCKET = 'documents'

  static async uploadDocument(
    file: File,
    path: string,
    metadata?: Record<string, any>
  ) {
    return this.uploadFile({
      bucket: this.BUCKET,
      path,
      file,
      metadata: {
        ...metadata,
        type: 'document',
        uploaded_at: new Date().toISOString()
      }
    })
  }

  static getDocumentUrl(path: string) {
    return this.getPublicUrl(this.BUCKET, path)
  }

  static async deleteDocument(path: string) {
    return this.deleteFile({
      bucket: this.BUCKET,
      path
    })
  }
}

export class MediaStorage extends StorageManager {
  static readonly BUCKET = 'media'

  static async uploadMedia(
    file: File,
    path: string,
    metadata?: Record<string, any>
  ) {
    return this.uploadFile({
      bucket: this.BUCKET,
      path,
      file,
      metadata: {
        ...metadata,
        type: 'media',
        uploaded_at: new Date().toISOString()
      }
    })
  }

  static getMediaUrl(path: string) {
    return this.getPublicUrl(this.BUCKET, path)
  }

  static async deleteMedia(path: string) {
    return this.deleteFile({
      bucket: this.BUCKET,
      path
    })
  }
}
