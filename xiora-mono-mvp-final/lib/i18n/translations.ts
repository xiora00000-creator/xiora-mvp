export type Locale = 'ja' | 'en'

export interface Translations {
  common: {
    navigation: {
      home: string
      about: string
      catalog: string
      customRental: string
      blog: string
      contact: string
    }
    actions: {
      readMore: string
      viewDetails: string
      addToCart: string
      submit: string
      cancel: string
      back: string
      next: string
      previous: string
      close: string
      menu: string
      search: string
    }
    footer: {
      copyright: string
      allRightsReserved: string
      privacyPolicy: string
      termsOfService: string
      contactUs: string
    }
  }
  home: {
    hero: {
      title: string
      subtitle: string
      description: string
      primaryAction: string
      secondaryAction: string
    }
    sections: {
      valueProposition: {
        title: string
        description: string
      }
      achievements: {
        title: string
        description: string
      }
      cta: {
        title: string
        description: string
        action: string
      }
    }
  }
  about: {
    hero: {
      title: string
      subtitle: string
    }
    sections: {
      brandStory: {
        title: string
        content: string
      }
      philosophy: {
        title: string
        content: string
      }
      approach: {
        title: string
        content: string
      }
      ceoMessage: {
        title: string
        content: string
      }
      vision: {
        title: string
        content: string
      }
    }
  }
  catalog: {
    title: string
    description: string
    categories: {
      title: string
      all: string
    }
    search: {
      placeholder: string
      noResults: string
    }
    filters: {
      title: string
      category: string
      price: string
      tags: string
    }
  }
  customRental: {
    hero: {
      title: string
      subtitle: string
      description: string
    }
    sections: {
      overview: {
        title: string
        content: string
      }
      equipment: {
        title: string
        description: string
      }
      pricing: {
        title: string
        description: string
      }
      safety: {
        title: string
        description: string
      }
    }
  }
  blog: {
    title: string
    description: string
    featured: string
    latest: string
    readTime: string
    publishedOn: string
    updatedOn: string
    author: string
    categories: string
    tags: string
    relatedPosts: string
    noPosts: string
  }
  contact: {
    title: string
    description: string
    steps: {
      purpose: string
      form: string
      confirm: string
      thankYou: string
    }
    purposes: {
      general: string
      catalog: string
      custom: string
      rental: string
      support: string
    }
    form: {
      name: string
      email: string
      company: string
      phone: string
      message: string
      consent: string
      required: string
      invalidEmail: string
      submit: string
    }
    messages: {
      success: string
      error: string
      required: string
    }
  }
}

export const translations: Record<Locale, Translations> = {
  ja: {
    common: {
      navigation: {
        home: 'ホーム',
        about: '会社概要',
        catalog: 'カタログ',
        customRental: 'カスタム・レンタル',
        blog: 'ブログ',
        contact: 'お問い合わせ',
      },
      actions: {
        readMore: '続きを読む',
        viewDetails: '詳細を見る',
        addToCart: 'カートに追加',
        submit: '送信',
        cancel: 'キャンセル',
        back: '戻る',
        next: '次へ',
        previous: '前へ',
        close: '閉じる',
        menu: 'メニュー',
        search: '検索',
      },
      footer: {
        copyright: '© 2024 Xiora. All rights reserved.',
        allRightsReserved: 'All rights reserved.',
        privacyPolicy: 'プライバシーポリシー',
        termsOfService: '利用規約',
        contactUs: 'お問い合わせ',
      },
    },
    home: {
      hero: {
        title: '宇宙の美しさを、地球に',
        subtitle: 'Xiora',
        description: '宇宙技術とミニマルデザインを融合し、未来の生活を創造します',
        primaryAction: '詳細を見る',
        secondaryAction: 'お問い合わせ',
      },
      sections: {
        valueProposition: {
          title: '私たちの価値',
          description: '宇宙技術の革新性とミニマルデザインの美しさを組み合わせ、人々の生活を豊かにする製品を提供します。',
        },
        achievements: {
          title: '実績',
          description: '数多くのプロジェクトで培った技術とデザインのノウハウ',
        },
        cta: {
          title: '一緒に未来を創造しませんか？',
          description: 'お気軽にお問い合わせください',
          action: 'お問い合わせ',
        },
      },
    },
    about: {
      hero: {
        title: '私たちについて',
        subtitle: 'Xioraの物語',
      },
      sections: {
        brandStory: {
          title: 'ブランドストーリー',
          content: '宇宙の無限の可能性と、地球の美しさを融合させたブランドです。',
        },
        philosophy: {
          title: 'ミニマリズム哲学',
          content: '余分なものを削ぎ落とし、本質的な美しさを追求します。',
        },
        approach: {
          title: 'アプローチ',
          content: '技術とデザインの両面から、最高品質の製品を提供します。',
        },
        ceoMessage: {
          title: '代表メッセージ',
          content: '宇宙の美しさを地球に届けることが私たちの使命です。',
        },
        vision: {
          title: 'ビジョン',
          content: '未来の生活を創造し、人々の暮らしを豊かにします。',
        },
      },
    },
    catalog: {
      title: '製品カタログ',
      description: '宇宙技術を活用した革新的な製品群',
      categories: {
        title: 'カテゴリ',
        all: 'すべて',
      },
      search: {
        placeholder: '製品を検索...',
        noResults: '検索結果が見つかりませんでした',
      },
      filters: {
        title: 'フィルター',
        category: 'カテゴリ',
        price: '価格',
        tags: 'タグ',
      },
    },
    customRental: {
      hero: {
        title: 'カスタム・レンタル',
        subtitle: 'ニーズに合わせたソリューション',
        description: 'お客様の要件に合わせてカスタマイズし、レンタルサービスも提供します',
      },
      sections: {
        overview: {
          title: 'サービス概要',
          content: '宇宙技術を活用した機器のカスタマイズとレンタルサービス',
        },
        equipment: {
          title: '機器カテゴリ',
          description: '4つの主要カテゴリで構成された機器群',
        },
        pricing: {
          title: '料金体系',
          description: '透明性の高い料金設定',
        },
        safety: {
          title: '安全性・品質保証',
          description: '最高レベルの安全性と品質を保証します',
        },
      },
    },
    blog: {
      title: 'ブログ',
      description: '最新の技術動向とデザインの話題',
      featured: '注目記事',
      latest: '最新記事',
      readTime: '読了時間',
      publishedOn: '公開日',
      updatedOn: '更新日',
      author: '著者',
      categories: 'カテゴリ',
      tags: 'タグ',
      relatedPosts: '関連記事',
      noPosts: '記事が見つかりませんでした',
    },
    contact: {
      title: 'お問い合わせ',
      description: 'お気軽にお問い合わせください',
      steps: {
        purpose: '用途選択',
        form: 'フォーム入力',
        confirm: '確認',
        thankYou: '完了',
      },
      purposes: {
        general: '一般的なお問い合わせ',
        catalog: 'カタログについて',
        custom: 'カスタムサービスについて',
        rental: 'レンタルサービスについて',
        support: 'サポートについて',
      },
      form: {
        name: 'お名前',
        email: 'メールアドレス',
        company: '会社名',
        phone: '電話番号',
        message: 'メッセージ',
        consent: '個人情報の取り扱いについて同意します',
        required: '必須',
        invalidEmail: '有効なメールアドレスを入力してください',
        submit: '送信する',
      },
      messages: {
        success: 'お問い合わせを受け付けました',
        error: 'エラーが発生しました',
        required: 'この項目は必須です',
      },
    },
  },
  en: {
    common: {
      navigation: {
        home: 'Home',
        about: 'About',
        catalog: 'Catalog',
        customRental: 'Custom & Rental',
        blog: 'Blog',
        contact: 'Contact',
      },
      actions: {
        readMore: 'Read More',
        viewDetails: 'View Details',
        addToCart: 'Add to Cart',
        submit: 'Submit',
        cancel: 'Cancel',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        close: 'Close',
        menu: 'Menu',
        search: 'Search',
      },
      footer: {
        copyright: '© 2024 Xiora. All rights reserved.',
        allRightsReserved: 'All rights reserved.',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        contactUs: 'Contact Us',
      },
    },
    home: {
      hero: {
        title: 'Bringing Space Beauty to Earth',
        subtitle: 'Xiora',
        description: 'Fusing space technology with minimal design to create the future of living',
        primaryAction: 'Learn More',
        secondaryAction: 'Contact Us',
      },
      sections: {
        valueProposition: {
          title: 'Our Value',
          description: 'We combine the innovation of space technology with the beauty of minimal design to provide products that enrich people\'s lives.',
        },
        achievements: {
          title: 'Achievements',
          description: 'Technology and design expertise cultivated through numerous projects',
        },
        cta: {
          title: 'Let\'s Create the Future Together',
          description: 'Feel free to contact us',
          action: 'Contact Us',
        },
      },
    },
    about: {
      hero: {
        title: 'About Us',
        subtitle: 'The Xiora Story',
      },
      sections: {
        brandStory: {
          title: 'Brand Story',
          content: 'A brand that fuses the infinite possibilities of space with the beauty of Earth.',
        },
        philosophy: {
          title: 'Minimalism Philosophy',
          content: 'We pursue essential beauty by stripping away the unnecessary.',
        },
        approach: {
          title: 'Approach',
          content: 'We provide the highest quality products from both technical and design perspectives.',
        },
        ceoMessage: {
          title: 'CEO Message',
          content: 'Our mission is to bring the beauty of space to Earth.',
        },
        vision: {
          title: 'Vision',
          content: 'We create the future of living and enrich people\'s lives.',
        },
      },
    },
    catalog: {
      title: 'Product Catalog',
      description: 'Innovative products utilizing space technology',
      categories: {
        title: 'Categories',
        all: 'All',
      },
      search: {
        placeholder: 'Search products...',
        noResults: 'No search results found',
      },
      filters: {
        title: 'Filters',
        category: 'Category',
        price: 'Price',
        tags: 'Tags',
      },
    },
    customRental: {
      hero: {
        title: 'Custom & Rental',
        subtitle: 'Solutions Tailored to Your Needs',
        description: 'We customize according to your requirements and also provide rental services',
      },
      sections: {
        overview: {
          title: 'Service Overview',
          content: 'Customization and rental services for equipment utilizing space technology',
        },
        equipment: {
          title: 'Equipment Categories',
          description: 'Equipment groups consisting of 4 main categories',
        },
        pricing: {
          title: 'Pricing Structure',
          description: 'Transparent pricing',
        },
        safety: {
          title: 'Safety & Quality Assurance',
          description: 'We guarantee the highest level of safety and quality.',
        },
      },
    },
    blog: {
      title: 'Blog',
      description: 'Latest technology trends and design topics',
      featured: 'Featured',
      latest: 'Latest',
      readTime: 'Read time',
      publishedOn: 'Published on',
      updatedOn: 'Updated on',
      author: 'Author',
      categories: 'Categories',
      tags: 'Tags',
      relatedPosts: 'Related Posts',
      noPosts: 'No posts found',
    },
    contact: {
      title: 'Contact',
      description: 'Feel free to contact us',
      steps: {
        purpose: 'Purpose Selection',
        form: 'Form Input',
        confirm: 'Confirmation',
        thankYou: 'Complete',
      },
      purposes: {
        general: 'General Inquiry',
        catalog: 'About Catalog',
        custom: 'About Custom Services',
        rental: 'About Rental Services',
        support: 'About Support',
      },
      form: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        phone: 'Phone',
        message: 'Message',
        consent: 'I agree to the handling of personal information',
        required: 'Required',
        invalidEmail: 'Please enter a valid email address',
        submit: 'Submit',
      },
      messages: {
        success: 'Your inquiry has been received',
        error: 'An error occurred',
        required: 'This field is required',
      },
    },
  },
}
