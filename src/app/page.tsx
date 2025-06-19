'use client'

import { useState, useEffect } from 'react'


export default function Home() {
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
    generatePassword()
  }, [])

  return (
    <main className="min-h-screen bg-[#0B0033] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#370031] rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-zinc-900 dark:text-white">Generador de Contraseñas</h1>
        {/* Notificación */}
        {notification && (
          <div className="px-4 py-2 bg-[#EAF27C] text-black rounded-lg text-center animate-fade-in">
            {notification}
          </div>

        )}

        {/* Longitud */}
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-200">
            Longitud: {length}
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

        {/* Opciones */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
            <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
            <span>Mayúsculas</span>
          </label>
          <label className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
            <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} />
            <span>Minúsculas</span>
          </label>
          <label className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
            <span>Números</span>
          </label>
          <label className="flex items-center space-x-2 text-zinc-700 dark:text-zinc-200">
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
            <span>Símbolos</span>
          </label>
        </div>

        {/* Resultado */}
        <div className="flex space-x-2">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="Tu contraseña aparecerá aquí"
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm bg-[#832232] text-zinc-900 dark:text-white"
          />
          <button
            onClick={copyToClipboard}
            className="px-3 py-2 bg-[#EAF27C] text-sm rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-500 text-black"
          >
            Copiar
          </button>
        </div>

        {/* Botón generar */}
        <button
          onClick={generatePassword}
          className="bg-[#CE8964] hover:bg-[#8C4D2C] w-full py-3 text-black text-pretty rounded-xl  transition"
        >
          <b>Generar Contraseña</b>
        </button>
      </div>
    </main>
  )
}
