export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // ユーザー管理
      users: {
        Row: {
          id: string
          email: string
          email_confirmed_at: string | null
          phone: string | null
          phone_confirmed_at: string | null
          created_at: string
          updated_at: string
          last_sign_in_at: string | null
          role: 'user' | 'admin' | 'moderator'
          is_active: boolean
          metadata: Json | null
        }
        Insert: {
          id?: string
          email: string
          email_confirmed_at?: string | null
          phone?: string | null
          phone_confirmed_at?: string | null
          created_at?: string
          updated_at?: string
          last_sign_in_at?: string | null
          role?: 'user' | 'admin' | 'moderator'
          is_active?: boolean
          metadata?: Json | null
        }
        Update: {
          id?: string
          email?: string
          email_confirmed_at?: string | null
          phone?: string | null
          phone_confirmed_at?: string | null
          created_at?: string
          updated_at?: string
          last_sign_in_at?: string | null
          role?: 'user' | 'admin' | 'moderator'
          is_active?: boolean
          metadata?: Json | null
        }
      }
      
      user_profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          company: string | null
          position: string | null
          location: string | null
          website: string | null
          social_links: Json | null
          preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          position?: string | null
          location?: string | null
          website?: string | null
          social_links?: Json | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          position?: string | null
          location?: string | null
          website?: string | null
          social_links?: Json | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }

      // 商品管理
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          short_description: string | null
          sku: string | null
          category_id: string | null
          price: number
          compare_price: number | null
          cost_price: number | null
          weight: number | null
          dimensions: Json | null
          images: string[]
          tags: string[]
          is_active: boolean
          is_featured: boolean
          inventory_quantity: number
          low_stock_threshold: number | null
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          short_description?: string | null
          sku?: string | null
          category_id?: string | null
          price: number
          compare_price?: number | null
          cost_price?: number | null
          weight?: number | null
          dimensions?: Json | null
          images?: string[]
          tags?: string[]
          is_active?: boolean
          is_featured?: boolean
          inventory_quantity?: number
          low_stock_threshold?: number | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          short_description?: string | null
          sku?: string | null
          category_id?: string | null
          price?: number
          compare_price?: number | null
          cost_price?: number | null
          weight?: number | null
          dimensions?: Json | null
          images?: string[]
          tags?: string[]
          is_active?: boolean
          is_featured?: boolean
          inventory_quantity?: number
          low_stock_threshold?: number | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }

      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          parent_id: string | null
          image_url: string | null
          is_active: boolean
          sort_order: number
          seo_title: string | null
          seo_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          parent_id?: string | null
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          seo_title?: string | null
          seo_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          parent_id?: string | null
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          seo_title?: string | null
          seo_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // ブログ管理
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          featured_image: string | null
          author_id: string
          category_id: string | null
          tags: string[]
          status: 'draft' | 'published' | 'archived'
          published_at: string | null
          seo_title: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          view_count: number
          like_count: number
          comment_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          featured_image?: string | null
          author_id: string
          category_id?: string | null
          tags?: string[]
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          view_count?: number
          like_count?: number
          comment_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          author_id?: string
          category_id?: string | null
          tags?: string[]
          status?: 'draft' | 'published' | 'archived'
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          view_count?: number
          like_count?: number
          comment_count?: number
          created_at?: string
          updated_at?: string
        }
      }

      // お問い合わせ管理
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          subject: string
          message: string
          contact_type: 'general' | 'support' | 'sales' | 'partnership' | 'other'
          status: 'new' | 'in_progress' | 'resolved' | 'closed'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to: string | null
          source: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          subject: string
          message: string
          contact_type?: 'general' | 'support' | 'sales' | 'partnership' | 'other'
          status?: 'new' | 'in_progress' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to?: string | null
          source?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          subject?: string
          message?: string
          contact_type?: 'general' | 'support' | 'sales' | 'partnership' | 'other'
          status?: 'new' | 'in_progress' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to?: string | null
          source?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }

      // 予約管理
      reservations: {
        Row: {
          id: string
          user_id: string | null
          name: string
          email: string
          phone: string | null
          company: string | null
          equipment_id: string
          start_date: string
          end_date: string
          purpose: string
          attendees: number | null
          location: string | null
          special_requirements: string | null
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          total_price: number
          deposit_amount: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          email: string
          phone?: string | null
          company?: string | null
          equipment_id: string
          start_date: string
          end_date: string
          purpose: string
          attendees?: number | null
          location?: string | null
          special_requirements?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          total_price: number
          deposit_amount?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          equipment_id?: string
          start_date?: string
          end_date?: string
          purpose?: string
          attendees?: number | null
          location?: string | null
          special_requirements?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          total_price?: number
          deposit_amount?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }

      // 機器情報
      equipment: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          daily_rate: number
          weekly_rate: number | null
          monthly_rate: number | null
          images: string[]
          specifications: Json | null
          availability: 'available' | 'rented' | 'maintenance' | 'unavailable'
          location: string | null
          condition: 'excellent' | 'good' | 'fair' | 'poor'
          maintenance_history: Json | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          daily_rate: number
          weekly_rate?: number | null
          monthly_rate?: number | null
          images?: string[]
          specifications?: Json | null
          availability?: 'available' | 'rented' | 'maintenance' | 'unavailable'
          location?: string | null
          condition?: 'excellent' | 'good' | 'fair' | 'poor'
          maintenance_history?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          daily_rate?: number
          weekly_rate?: number | null
          monthly_rate?: number | null
          images?: string[]
          specifications?: Json | null
          availability?: 'available' | 'rented' | 'maintenance' | 'unavailable'
          location?: string | null
          condition?: 'excellent' | 'good' | 'fair' | 'poor'
          maintenance_history?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }

      // システム設定
      system_settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          category: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          category?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          category?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }

      // 監査ログ
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          table_name: string | null
          record_id: string | null
          old_values: Json | null
          new_values: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          table_name?: string | null
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          table_name?: string | null
          record_id?: string | null
          old_values?: Json | null
          new_values?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    
    Views: {
      [_ in never]: never
    }
    
    Functions: {
      [_ in never]: never
    }
    
    Enums: {
      user_role: 'user' | 'admin' | 'moderator'
      contact_status: 'new' | 'in_progress' | 'resolved' | 'closed'
      contact_priority: 'low' | 'medium' | 'high' | 'urgent'
      reservation_status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
      equipment_availability: 'available' | 'rented' | 'maintenance' | 'unavailable'
      equipment_condition: 'excellent' | 'good' | 'fair' | 'poor'
      blog_post_status: 'draft' | 'published' | 'archived'
    }
  }
}

// 型のエクスポート
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// よく使用される型のエイリアス
export type User = Tables<'users'>
export type UserProfile = Tables<'user_profiles'>
export type Product = Tables<'products'>
export type Category = Tables<'categories'>
export type BlogPost = Tables<'blog_posts'>
export type Contact = Tables<'contacts'>
export type Reservation = Tables<'reservations'>
export type Equipment = Tables<'equipment'>
export type SystemSetting = Tables<'system_settings'>
export type AuditLog = Tables<'audit_logs'>

// 挿入用の型
export type UserInsert = Inserts<'users'>
export type UserProfileInsert = Inserts<'user_profiles'>
export type ProductInsert = Inserts<'products'>
export type CategoryInsert = Inserts<'categories'>
export type BlogPostInsert = Inserts<'blog_posts'>
export type ContactInsert = Inserts<'contacts'>
export type ReservationInsert = Inserts<'reservations'>
export type EquipmentInsert = Inserts<'equipment'>
export type SystemSettingInsert = Inserts<'system_settings'>

// 更新用の型
export type UserUpdate = Updates<'users'>
export type UserProfileUpdate = Updates<'user_profiles'>
export type ProductUpdate = Updates<'products'>
export type CategoryUpdate = Updates<'categories'>
export type BlogPostUpdate = Updates<'blog_posts'>
export type ContactUpdate = Updates<'contacts'>
export type ReservationUpdate = Updates<'reservations'>
export type EquipmentUpdate = Updates<'equipment'>
export type SystemSettingUpdate = Updates<'system_settings'>
