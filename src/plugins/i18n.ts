// https://vue-i18n.intlify.dev/guide/advanced/composition.html
import { createI18n } from 'vue-i18n'

const messages: { [key: string]: any } = {}
const langs = import.meta.glob<{ default: any }>('../assets/lang/*.json', { eager: true })
for (const key in langs) {
  const value = langs[key].default
  const name = key.split('/').slice(-1)[0]
  if (name.endsWith('.json')) {
    const lang = name.slice(0, -5)
    messages[lang] = value
  }
}

const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages,
})
export default i18n
