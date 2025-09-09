-- レンタル予約システム用のデータベーススキーマ

-- レンタル商品テーブル
CREATE TABLE IF NOT EXISTS xiora_rental_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category_id UUID REFERENCES xiora_categories(id),
  daily_rate DECIMAL(10,2) NOT NULL,
  weekly_rate DECIMAL(10,2),
  monthly_rate DECIMAL(10,2),
  deposit_amount DECIMAL(10,2) DEFAULT 0,
  availability_status VARCHAR(50) DEFAULT 'available', -- available, rented, maintenance, unavailable
  condition_notes TEXT,
  images TEXT[], -- 画像URLの配列
  specifications JSONB, -- 仕様の詳細情報
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- レンタル予約テーブル
CREATE TABLE IF NOT EXISTS xiora_rental_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_number VARCHAR(50) UNIQUE NOT NULL, -- 予約番号
  customer_id UUID REFERENCES xiora_users(id),
  rental_item_id UUID REFERENCES xiora_rental_items(id) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_days INTEGER NOT NULL,
  daily_rate DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  deposit_amount DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, active, completed, cancelled
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, partially_paid, refunded
  pickup_location VARCHAR(255),
  return_location VARCHAR(255),
  special_requests TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- レンタル料金テーブル（季節・期間別の料金設定）
CREATE TABLE IF NOT EXISTS xiora_rental_pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rental_item_id UUID REFERENCES xiora_rental_items(id) NOT NULL,
  pricing_type VARCHAR(50) NOT NULL, -- daily, weekly, monthly, seasonal
  start_date DATE,
  end_date DATE,
  rate DECIMAL(10,2) NOT NULL,
  minimum_duration INTEGER DEFAULT 1,
  maximum_duration INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- レンタル利用規約テーブル
CREATE TABLE IF NOT EXISTS xiora_rental_terms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  version VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  effective_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- レンタル保険・保証テーブル
CREATE TABLE IF NOT EXISTS xiora_rental_insurance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  daily_rate DECIMAL(10,2) NOT NULL,
  coverage_amount DECIMAL(10,2) NOT NULL,
  deductible_amount DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- レンタルレビュー・評価テーブル
CREATE TABLE IF NOT EXISTS xiora_rental_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rental_item_id UUID REFERENCES xiora_rental_items(id) NOT NULL,
  customer_id UUID REFERENCES xiora_users(id) NOT NULL,
  booking_id UUID REFERENCES xiora_rental_bookings(id) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT,
  is_verified BOOLEAN DEFAULT false, -- 実際の利用者かどうか
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_rental_items_slug ON xiora_rental_items(slug);
CREATE INDEX IF NOT EXISTS idx_rental_items_category ON xiora_rental_items(category_id);
CREATE INDEX IF NOT EXISTS idx_rental_items_availability ON xiora_rental_items(availability_status);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_number ON xiora_rental_bookings(booking_number);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_customer ON xiora_rental_bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_item ON xiora_rental_bookings(rental_item_id);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_dates ON xiora_rental_bookings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_rental_bookings_status ON xiora_rental_bookings(status);
CREATE INDEX IF NOT EXISTS idx_rental_pricing_item ON xiora_rental_pricing(rental_item_id);
CREATE INDEX IF NOT EXISTS idx_rental_pricing_dates ON xiora_rental_pricing(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_rental_reviews_item ON xiora_rental_reviews(rental_item_id);
CREATE INDEX IF NOT EXISTS idx_rental_reviews_customer ON xiora_rental_reviews(customer_id);

-- RLSポリシーの設定
ALTER TABLE xiora_rental_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE xiora_rental_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE xiora_rental_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE xiora_rental_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE xiora_rental_insurance ENABLE ROW LEVEL SECURITY;
ALTER TABLE xiora_rental_reviews ENABLE ROW LEVEL SECURITY;

-- レンタル商品の閲覧ポリシー（全ユーザーが閲覧可能）
CREATE POLICY "rental_items_select_policy" ON xiora_rental_items
  FOR SELECT USING (true);

-- レンタル商品の管理ポリシー（管理者のみ）
CREATE POLICY "rental_items_admin_policy" ON xiora_rental_items
  FOR ALL USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- 予約の閲覧ポリシー（自分の予約のみ閲覧可能）
CREATE POLICY "rental_bookings_select_policy" ON xiora_rental_bookings
  FOR SELECT USING (
    auth.uid() = customer_id OR 
    auth.jwt() ->> 'role' = 'admin'
  );

-- 予約の作成ポリシー（認証済みユーザーのみ）
CREATE POLICY "rental_bookings_insert_policy" ON xiora_rental_bookings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 予約の更新ポリシー（自分の予約のみ更新可能）
CREATE POLICY "rental_bookings_update_policy" ON xiora_rental_bookings
  FOR UPDATE USING (
    auth.uid() = customer_id OR 
    auth.jwt() ->> 'role' = 'admin'
  );

-- 料金設定の閲覧ポリシー（全ユーザーが閲覧可能）
CREATE POLICY "rental_pricing_select_policy" ON xiora_rental_pricing
  FOR SELECT USING (true);

-- 料金設定の管理ポリシー（管理者のみ）
CREATE POLICY "rental_pricing_admin_policy" ON xiora_rental_pricing
  FOR ALL USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- 利用規約の閲覧ポリシー（全ユーザーが閲覧可能）
CREATE POLICY "rental_terms_select_policy" ON xiora_rental_terms
  FOR SELECT USING (is_active = true);

-- 利用規約の管理ポリシー（管理者のみ）
CREATE POLICY "rental_terms_admin_policy" ON xiora_rental_terms
  FOR ALL USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- 保険の閲覧ポリシー（全ユーザーが閲覧可能）
CREATE POLICY "rental_insurance_select_policy" ON xiora_rental_insurance
  FOR SELECT USING (is_active = true);

-- 保険の管理ポリシー（管理者のみ）
CREATE POLICY "rental_insurance_admin_policy" ON xiora_rental_insurance
  FOR ALL USING (auth.role() = 'authenticated' AND auth.jwt() ->> 'role' = 'admin');

-- レビューの閲覧ポリシー（全ユーザーが閲覧可能）
CREATE POLICY "rental_reviews_select_policy" ON xiora_rental_reviews
  FOR SELECT USING (true);

-- レビューの作成ポリシー（認証済みユーザーのみ）
CREATE POLICY "rental_reviews_insert_policy" ON xiora_rental_reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- レビューの更新ポリシー（自分のレビューのみ更新可能）
CREATE POLICY "rental_reviews_update_policy" ON xiora_rental_reviews
  FOR UPDATE USING (auth.uid() = customer_id);

-- レビューの削除ポリシー（管理者のみ）
CREATE POLICY "rental_reviews_delete_policy" ON xiora_rental_reviews
  FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');
