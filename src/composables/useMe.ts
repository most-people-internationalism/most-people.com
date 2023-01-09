export const useMe = () => {
  const userStore = useUserStore()
  const { availableLocales: locales, locale, getLocaleMessage } = useI18n()

  const getLabel = (item: string) => {
    return getLocaleMessage(item)['MyLanguage'] as string
  }
  const change = () => {
    localStorage.setItem('lang', locale.value)
  }

  return {
    getLabel,
    change,
    locale,
    locales,
    userStore,
  }
}
