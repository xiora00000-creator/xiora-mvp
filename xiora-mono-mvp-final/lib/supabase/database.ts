import { supabase } from './client'

// 基本的なCRUD操作
export class DatabaseManager {
  // データの取得
  static async get(
    table: string,
    options: {
      select?: string
      filters?: Record<string, any>
      orderBy?: { column: string; ascending?: boolean }
      limit?: number
      offset?: number
    } = {}
  ): Promise<{ data: any[] | null; error: any }> {
    try {
      // @ts-ignore - Supabaseの型チェックを無効化
      let query = supabase.from(table).select(options.select || '*')

      // フィルターの適用
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              query = query.in(key, value)
            } else {
              query = query.eq(key, value)
            }
          }
        })
      }

      // ソートの適用
      if (options.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true
        })
      }

      // ページネーションの適用
      if (options.limit) {
        query = query.limit(options.limit)
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 100) - 1)
      }

      const { data, error } = await query

      return { data, error }
    } catch (error) {
      console.error(`Error fetching from ${table}:`, error)
      return { data: null, error }
    }
  }

  // 単一レコードの取得
  static async getById(
    table: string,
    id: string,
    select?: string
  ): Promise<{ data: any | null; error: any }> {
    try {
      // @ts-ignore - Supabaseの型チェックを無効化
      const { data, error } = await supabase
        .from(table)
        .select(select || '*')
        .eq('id', id)
        .single()

      return { data, error }
    } catch (error) {
      console.error(`Error fetching ${table} by id:`, error)
      return { data: null, error }
    }
  }

  // データの挿入
  static async insert(
    table: string,
    data: any | any[]
  ): Promise<{ data: any[] | null; error: any }> {
    try {
      // @ts-ignore - Supabaseの型チェックを無効化
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()

      return { data: result, error }
    } catch (error) {
      console.error(`Error inserting into ${table}:`, error)
      return { data: null, error }
    }
  }

  // データの更新
  static async update(
    table: string,
    id: string,
    updates: any
  ): Promise<{ data: any | null; error: any }> {
    try {
      // @ts-ignore - Supabaseの型チェックを無効化
      const { data, error } = await (supabase as any)
        .from(table)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      return { data, error }
    } catch (error) {
      console.error(`Error updating ${table}:`, error)
      return { data: null, error }
    }
  }

  // データの削除
  static async delete(
    table: string,
    id: string
  ): Promise<{ error: any }> {
    try {
      // @ts-ignore - Supabaseの型チェックを無効化
      const { error } = await (supabase as any)
        .from(table)
        .delete()
        .eq('id', id)

      return { error }
    } catch (error) {
      console.error(`Error deleting from ${table}:`, error)
      return { error }
    }
  }

  // 一括更新
  static async bulkUpdate(
    table: string,
    updates: Array<{ id: string; data: any }>
  ): Promise<{ data: any[] | null; error: any }> {
    try {
      const promises = updates.map(({ id, data }) =>
        this.update(table, id, data)
      )

      const results = await Promise.all(promises)
      const errors = results.filter(result => result.error)
      
      if (errors.length > 0) {
        return { data: null, error: errors[0].error }
      }

      const data = results.map(result => result.data).filter(Boolean)
      return { data, error: null }
    } catch (error) {
      console.error(`Error bulk updating ${table}:`, error)
      return { data: null, error }
    }
  }

  // 一括削除
  static async bulkDelete(
    table: string,
    ids: string[]
  ): Promise<{ error: any }> {
    try {
      // @ts-ignore - Supabaseの型チェックを無効化
      const { error } = await (supabase as any)
        .from(table)
        .delete()
        .in('id', ids)

      return { error }
    } catch (error) {
      console.error(`Error bulk deleting from ${table}:`, error)
      return { error }
    }
  }

  // カウント取得
  static async count(
    table: string,
    filters?: Record<string, any>
  ): Promise<{ count: number | null; error: any }> {
    try {
      // @ts-ignore - Supabaseの型チェックを無効化
      let query = (supabase as any).from(table).select('*', { count: 'exact', head: true })

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value)
          }
        })
      }

      const { count, error } = await query

      return { count, error }
    } catch (error) {
      console.error(`Error counting ${table}:`, error)
      return { count: null, error }
    }
  }

  // 検索
  static async search(
    table: string,
    searchTerm: string,
    columns: string[],
    options: {
      select?: string
      filters?: Record<string, any>
      limit?: number
    } = {}
  ): Promise<{ data: any[] | null; error: any }> {
    try {
      // @ts-ignore - Supabaseの型チェックを無効化
      let query = (supabase as any).from(table).select(options.select || '*')

      // 検索条件の構築
      const searchConditions = columns.map(column => `${column}.ilike.%${searchTerm}%`)
      query = query.or(searchConditions.join(','))

      // フィルターの適用
      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value)
          }
        })
      }

      // リミットの適用
      if (options.limit) {
        query = query.limit(options.limit)
      }

      const { data, error } = await query

      return { data, error }
    } catch (error) {
      console.error(`Error searching ${table}:`, error)
      return { data: null, error }
    }
  }
}

// 特定のテーブル用の特殊化されたマネージャー
export class ProductManager {
  static async getProducts(options: {
    category?: string
    featured?: boolean
    active?: boolean
    limit?: number
    offset?: number
  } = {}) {
    const filters: Record<string, any> = {}
    
    if (options.category) filters.category_id = options.category
    if (options.featured !== undefined) filters.is_featured = options.featured
    if (options.active !== undefined) filters.is_active = options.active

    return DatabaseManager.get('products', {
      filters,
      limit: options.limit,
      offset: options.offset,
      orderBy: { column: 'created_at', ascending: false }
    })
  }

  static async getProductsByCategory(categoryId: string, limit = 20) {
    return DatabaseManager.get('products', {
      filters: { category_id: categoryId, is_active: true },
      limit,
      orderBy: { column: 'created_at', ascending: false }
    })
  }

  static async searchProducts(searchTerm: string, limit = 20) {
    return DatabaseManager.search('products', searchTerm, ['name', 'description', 'tags'], {
      filters: { is_active: true },
      limit
    })
  }
}

export class BlogManager {
  static async getPublishedPosts(options: {
    category?: string
    limit?: number
    offset?: number
  } = {}) {
    const filters: Record<string, any> = { status: 'published' }
    
    if (options.category) filters.category_id = options.category

    return DatabaseManager.get('blog_posts', {
      filters,
      limit: options.limit,
      offset: options.offset,
      orderBy: { column: 'published_at', ascending: false }
    })
  }

  static async getPostBySlug(slug: string) {
    return DatabaseManager.get('blog_posts', {
      filters: { slug, status: 'published' }
    }).then(result => ({
      data: result.data?.[0] || null,
      error: result.error
    }))
  }

  static async incrementViewCount(postId: string) {
    const { data: post } = await DatabaseManager.getById('blog_posts', postId)
    if (post) {
      return DatabaseManager.update('blog_posts', postId, {
        view_count: (post.view_count || 0) + 1
      })
    }
    return { data: null, error: 'Post not found' }
  }
}

export class ContactManager {
  static async createContact(contactData: any) {
    return DatabaseManager.insert('contacts', {
      ...contactData,
      status: 'new' as const,
      priority: 'medium' as const
    })
  }

  static async getContactsByStatus(status: 'new' | 'in_progress' | 'resolved' | 'closed', limit = 50) {
    return DatabaseManager.get('contacts', {
      filters: { status },
      limit,
      orderBy: { column: 'created_at', ascending: false }
    })
  }

  static async updateContactStatus(
    contactId: string, 
    status: 'new' | 'in_progress' | 'resolved' | 'closed', 
    assignedTo?: string
  ) {
    return DatabaseManager.update('contacts', contactId, {
      status,
      assigned_to: assignedTo
    })
  }
}

export class ReservationManager {
  static async createReservation(reservationData: any) {
    return DatabaseManager.insert('reservations', {
      ...reservationData,
      status: 'pending' as const
    })
  }

  static async getReservationsByStatus(status: 'pending' | 'confirmed' | 'cancelled' | 'completed', limit = 50) {
    return DatabaseManager.get('reservations', {
      filters: { status },
      limit,
      orderBy: { column: 'start_date', ascending: true }
    })
  }

  static async getReservationsByDateRange(startDate: string, endDate: string) {
    return DatabaseManager.get('reservations', {
      filters: {
        start_date: startDate,
        end_date: endDate
      },
      orderBy: { column: 'start_date', ascending: true }
    })
  }

  static async updateReservationStatus(
    reservationId: string, 
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  ) {
    return DatabaseManager.update('reservations', reservationId, { status })
  }
}

// 監査ログの記録
export class AuditLogger {
  static async log(
    action: string,
    tableName: string | null = null,
    recordId: string | null = null,
    oldValues: any = null,
    newValues: any = null,
    userId: string | null = null
  ) {
    try {
      await DatabaseManager.insert('audit_logs', {
        user_id: userId,
        action,
        table_name: tableName,
        record_id: recordId,
        old_values: oldValues,
        new_values: newValues,
        ip_address: null, // 必要に応じて実装
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null
      })
    } catch (error) {
      console.error('Failed to log audit event:', error)
    }
  }
}

// システム設定の管理
export class SystemSettings {
  static async get(key: string) {
    const { data, error } = await DatabaseManager.get('system_settings', {
      filters: { key }
    })
    
    if (error || !data || data.length === 0) {
      return { value: null, error }
    }
    
    return { value: data[0].value, error: null }
  }

  static async set(key: string, value: any, description?: string, category?: string) {
    const existing = await this.get(key)
    
    if (existing.value !== null) {
      // 更新
      const { data, error } = await DatabaseManager.get('system_settings', {
        filters: { key }
      })
      
      if (data && data.length > 0) {
        return DatabaseManager.update('system_settings', data[0].id, {
          value,
          description,
          category,
          updated_at: new Date().toISOString()
        })
      }
    }
    
    // 新規作成
    return DatabaseManager.insert('system_settings', {
      key,
      value,
      description,
      category,
      is_public: false
    })
  }

  static async getPublicSettings() {
    return DatabaseManager.get('system_settings', {
      filters: { is_public: true }
    })
  }
}
