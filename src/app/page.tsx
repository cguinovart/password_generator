'use client'

import { useState, useEffect } from 'react'
import { translations, type Language } from '@/src/lib/translations'



export default function Home() {
  const [language, setLanguage] = useState<Language>('es')
  const t = translations[language]

  const [length, setLength] = useState(13)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 3000)
  }

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'

    let chars = ''
    if (includeUppercase) chars += upper
    if (includeLowercase) chars += lower
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (!chars) return setPassword('Selecciona al menos una opción')

    let pass = ''
    for (let i = 0; i < length; i++) {
      const random = Math.floor(Math.random() * chars.length)
      pass += chars[random]
    }
    setPassword(pass)
  }

  const copyToClipboard = async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      showNotification('¡Contraseña copiada!')
    } catch (err) {
      showNotification('Error al copiar')
    }
  }


   useEffect(() => {
    const browserLang = navigator.language.slice(0, 2) as Language
    const supportedLanguages = Object.keys(translations) as Language[]

    const selectedLang: Language = supportedLanguages.includes(browserLang)
      ? browserLang
      : 'en' // fallback

    setLanguage(selectedLang)
    generatePassword()
  }, [])

  return (
    <main className="min-h-screen bg-[#3F7CAC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#95AFBA] rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-white">
          {t.title}
        </h1>

        {notification && (
          <div className="px-4 py-2 bg-[#EAF27C] text-black rounded-lg text-center animate-fade-in">
            {notification}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
            {t.length}: {length}
          </label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
            <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
            <span>{t.uppercase}</span>
          </label>
          <label className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
            <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
            <span>{t.lowercase}</span>
          </label>
          <label className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
            <span>{t.numbers}</span>
          </label>
          <label className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
            <span>{t.symbols}</span>
          </label>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            readOnly
            value={password}
            placeholder={t.placeholder}
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm bg-[#BDC4A7] text-zinc-900 dark:text-black"
          />
          <button
            onClick={copyToClipboard}
            className="px-3 py-2 bg-[#D5E1A3] text-sm rounded-lg hover:bg-[#93A937] dark:hover:bg-[#93A937] text-black"
          >
            {t.copy}
          </button>
        </div>

        <button
          onClick={generatePassword}
          className="bg-[#E2F89C] hover:bg-[#77990B] w-full py-3 text-black text-pretty rounded-xl transition"
        >
          <b>{t.generate}</b>
        </button>
      </div>
    </main>
  )
}
