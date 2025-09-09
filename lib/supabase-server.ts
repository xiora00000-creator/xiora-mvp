/**
 * サーバー専用のSupabase Service Roleクライアント
 * 注意: このファイルはクライアントサイドから使用しないでください
 * 
 * Service Role Keyを使用して、データベースの完全なアクセス権限を持ちます
 * ユーザー認証をバイパスし、すべてのテーブルにアクセスできます
 */

/**
 * Supabase REST APIを直接呼び出す関数
 * Service Role Keyを使用して管理者レベルのアクセスを提供
 * 
 * @param path - APIパス（例: 'users', 'products?select=*'）
 * @param init - fetchのオプション（method, body, headers等）
 * @returns Promise<any> - APIレスポンスのJSONデータ
 * 
 * @example
 * // 全ユーザーの取得
 * const users = await sbAdmin('users?select=*');
 * 
 * // 新規ユーザーの作成
 * const newUser = await sbAdmin('users', {
 *   method: 'POST',
 *   body: JSON.stringify({ email: 'user@example.com', name: 'John Doe' })
 * });
 * 
 * // ユーザーの更新
 * const updatedUser = await sbAdmin('users?id=eq.123', {
 *   method: 'PATCH',
 *   body: JSON.stringify({ name: 'Jane Doe' })
 * });
 * 
 * // ユーザーの削除
 * await sbAdmin('users?id=eq.123', { method: 'DELETE' });
 */
export async function sbAdmin(path: string, init?: RequestInit) {
  // 環境変数の確認
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!url) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined')
  }
  
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined')
  }
  
  // サーバーサイドでのみ実行されることを確認
  if (typeof window !== 'undefined') {
    throw new Error('sbAdmin can only be used on the server side')
  }
  
  // ヘッダーの設定
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation', // 更新・削除後にデータを返す
    ...(init?.headers || {})
  } as Record<string, string>
  
  // APIリクエストの実行
  const res = await fetch(`${url}/rest/v1/${path}`, { 
    ...init, 
    headers, 
    cache: 'no-store' // 常に最新のデータを取得
  })
  
  // エラーハンドリング
  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Supabase API Error: ${res.status} ${res.statusText} - ${errorText}`)
  }
  
  // レスポンスの処理
  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return res.json()
  }
  
  // JSON以外のレスポンス（例：DELETE操作）
  return { success: true, status: res.status }
}

/**
 * 特定のテーブルに対する操作を提供するヘルパー関数
 */

/**
 * データの取得
 * @param table - テーブル名
 * @param options - クエリオプション
 */
export async function sbAdminGet(table: string, options: {
  select?: string
  filters?: Record<string, any>
  orderBy?: { column: string; ascending?: boolean }
  limit?: number
  offset?: number
} = {}) {
  let path = table
  
  // クエリパラメータの構築
  const params = new URLSearchParams()
  
  if (options.select) {
    params.append('select', options.select)
  }
  
  if (options.orderBy) {
    const direction = options.orderBy.ascending ? 'asc' : 'desc'
    params.append('order', `${options.orderBy.column}.${direction}`)
  }
  
  if (options.limit) {
    params.append('limit', options.limit.toString())
  }
  
  if (options.offset) {
    params.append('range', `${options.offset}-${options.offset + (options.limit || 100) - 1}`)
  }
  
  // フィルターの適用
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          params.append(key, `in.(${value.join(',')})`)
        } else {
          params.append(key, `eq.${value}`)
        }
      }
    })
  }
  
  if (params.toString()) {
    path += `?${params.toString()}`
  }
  
  return sbAdmin(path)
}

/**
 * 単一レコードの取得
 * @param table - テーブル名
 * @param id - レコードID
 * @param select - 取得するカラム
 */
export async function sbAdminGetById(table: string, id: string, select?: string) {
  let path = `${table}?id=eq.${id}`
  if (select) {
    path += `&select=${select}`
  }
  
  const result = await sbAdmin(path)
  return Array.isArray(result) && result.length > 0 ? result[0] : null
}

/**
 * データの挿入
 * @param table - テーブル名
 * @param data - 挿入するデータ
 */
export async function sbAdminInsert(table: string, data: any | any[]) {
  return sbAdmin(table, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

/**
 * データの更新
 * @param table - テーブル名
 * @param id - 更新するレコードID
 * @param updates - 更新データ
 */
export async function sbAdminUpdate(table: string, id: string, updates: any) {
  return sbAdmin(`${table}?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...updates,
      updated_at: new Date().toISOString()
    })
  })
}

/**
 * データの削除
 * @param table - テーブル名
 * @param id - 削除するレコードID
 */
export async function sbAdminDelete(table: string, id: string) {
  return sbAdmin(`${table}?id=eq.${id}`, {
    method: 'DELETE'
  })
}

/**
 * 一括更新
 * @param table - テーブル名
 * @param updates - 更新データの配列
 */
export async function sbAdminBulkUpdate(table: string, updates: Array<{ id: string; data: any }>) {
  const promises = updates.map(({ id, data }) =>
    sbAdminUpdate(table, id, data)
  )
  
  return Promise.all(promises)
}

/**
 * 一括削除
 * @param table - テーブル名
 * @param ids - 削除するIDの配列
 */
export async function sbAdminBulkDelete(table: string, ids: string[]) {
  const idFilter = ids.map(id => `id=eq.${id}`).join(',')
  return sbAdmin(`${table}?or=(${idFilter})`, {
    method: 'DELETE'
  })
}

/**
 * カウント取得
 * @param table - テーブル名
 * @param filters - フィルター条件
 */
export async function sbAdminCount(table: string, filters?: Record<string, any>) {
  let path = `${table}?select=*`
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        path += `&${key}=eq.${value}`
      }
    })
  }
  
  const result = await sbAdmin(path)
  return Array.isArray(result) ? result.length : 0
}

/**
 * 検索
 * @param table - テーブル名
 * @param searchTerm - 検索語
 * @param columns - 検索対象カラム
 * @param options - 検索オプション
 */
export async function sbAdminSearch(
  table: string,
  searchTerm: string,
  columns: string[],
  options: {
    select?: string
    filters?: Record<string, any>
    limit?: number
  } = {}
) {
  let path = table
  
  // 検索条件の構築
  const searchConditions = columns.map(column => `${column}.ilike.*${searchTerm}*`)
  const params = new URLSearchParams()
  
  if (options.select) {
    params.append('select', options.select)
  }
  
  if (options.limit) {
    params.append('limit', options.limit.toString())
  }
  
  // フィルターの適用
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, `eq.${value}`)
      }
    })
  }
  
  // 検索条件の追加
  params.append('or', `(${searchConditions.join(',')})`)
  
  path += `?${params.toString()}`
  
  return sbAdmin(path)
}

/**
 * 監査ログの記録
 * @param action - 実行されたアクション
 * @param tableName - 対象テーブル名
 * @param recordId - 対象レコードID
 * @param oldValues - 更新前の値
 * @param newValues - 更新後の値
 * @param userId - 実行ユーザーID
 */
export async function sbAdminLogAudit(
  action: string,
  tableName: string | null = null,
  recordId: string | null = null,
  oldValues: any = null,
  newValues: any = null,
  userId: string | null = null
) {
  try {
    await sbAdminInsert('audit_logs', {
      user_id: userId,
      action,
      table_name: tableName,
      record_id: recordId,
      old_values: oldValues,
      new_values: newValues,
      ip_address: null,
      user_agent: 'Server-Side Operation',
      created_at: new Date().toISOString()
    })
  } catch (error) {
    console.error('Failed to log audit event:', error)
  }
}

/**
 * システム設定の管理
 */
export const sbAdminSystem = {
  /**
   * 設定値の取得
   */
  async get(key: string) {
    const result = await sbAdminGet('system_settings', { filters: { key } })
    return Array.isArray(result) && result.length > 0 ? result[0].value : null
  },
  
  /**
   * 設定値の設定
   */
  async set(key: string, value: any, description?: string, category?: string) {
    const existing = await this.get(key)
    
    if (existing !== null) {
      // 既存設定の更新
      const settings = await sbAdminGet('system_settings', { filters: { key } })
      if (Array.isArray(settings) && settings.length > 0) {
        return sbAdminUpdate('system_settings', settings[0].id, {
          value,
          description,
          category,
          updated_at: new Date().toISOString()
        })
      }
    }
    
    // 新規設定の作成
    return sbAdminInsert('system_settings', {
      key,
      value,
      description,
      category,
      is_public: false,
      created_at: new Date().toISOString()
    })
  },
  
  /**
   * 公開設定の取得
   */
  async getPublic() {
    return sbAdminGet('system_settings', { filters: { is_public: true } })
  }
}
