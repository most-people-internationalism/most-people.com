import type { FormInstance } from 'element-plus'

export const useLogin = () => {
  const form = reactive({
    username: '婆婆',
    password: '',
    loading: false,
  })

  const router = useRouter()
  const userStore = useUserStore()

  const formElement = ref<FormInstance>()

  const login = async () => {
    if (!formElement.value) return
    formElement.value.validate(async (ok) => {
      if (ok) {
        form.loading = true
        const user = await api.getUser(form.username)
        if (user) {
          const key = await mp.passwordKey(form.username, form.password)
          const username = await mp.decrypt(user.password_hash, key)
          if (username === form.username) {
            // login success
            userStore.user = user
            mp.indexdb.setUser(username, key)
            router.replace('/me')
          } else {
            mp.error('wrong username or password')
          }
        } else {
          mp.error('username not found')
        }
        form.loading = false
      }
    })
  }

  const checkUsername = (_rule: any, v: string, callback: (err?: Error) => void) => {
    const username = v
    if (!username) {
      return callback(new Error($t('UsernameEmpty')))
    }
    callback()
  }
  const checkPassword = (_rule: any, v: string, callback: (err?: Error) => void) => {
    const password = v
    if (!password) {
      return callback(new Error($t('PasswordEmpty')))
    }
    callback()
  }
  return {
    form,
    formElement,
    login,
    checkUsername,
    checkPassword,
  }
}
