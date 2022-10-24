/// <reference types="vite/client" />

declare global {
  interface Window {
    sogou: { sug: (data: [string, string[]]) => void }
  }
}

export {}
