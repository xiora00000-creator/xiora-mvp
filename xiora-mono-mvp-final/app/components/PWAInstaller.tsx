'use client'

import { useEffect, useState } from 'react'
import { Button } from './ui/Button'

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Service Worker登録
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }

    // PWAインストールプロンプトの処理
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    // インストール完了の検知
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallButton(false)
      setDeferredPrompt(null)
    }

    // イベントリスナーの登録
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // 既にインストールされているかチェック
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  if (isInstalled) {
    return null
  }

  if (!showInstallButton) {
    return null
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 max-w-xs">
      <div className="text-sm text-neutral-700 mb-3">
        <p className="font-medium mb-1">Xioraをインストール</p>
        <p className="text-xs text-neutral-500">
          ホーム画面に追加して、より快適にご利用いただけます
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={handleInstallClick}
          className="flex-1"
        >
          インストール
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowInstallButton(false)}
          className="px-3"
        >
          後で
        </Button>
      </div>
    </div>
  )
}
