'use client'

import { useState, useEffect } from 'react'

const translations = {
  es: {
    title: 'Generador de Contraseñas',
    length: 'Longitud',
    uppercase: 'Mayúsculas',
    lowercase: 'Minúsculas',
    numbers: 'Números',
    symbols: 'Símbolos',
    generate: 'Generar Contraseña',
    placeholder: 'Tu contraseña aparecerá aquí',
    copy: 'Copiar',
    copied: '¡Contraseña copiada!',
    copyError: 'Error al copiar',
    selectOption: 'Selecciona al menos una opción',
  },
  en: {
    title: 'Password Generator',
    length: 'Length',
    uppercase: 'Uppercase',
    lowercase: 'Lowercase',
    numbers: 'Numbers',
    symbols: 'Symbols',
    generate: 'Generate Password',
    placeholder: 'Your password will appear here',
    copy: 'Copy',
    copied: 'Password copied!',
    copyError: 'Copy failed',
    selectOption: 'Select at least one option',
  },
}
