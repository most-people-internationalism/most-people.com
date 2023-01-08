import { ElMessageBox, type FormInstance } from 'element-plus'

export const useRegister = () => {
  const form = reactive({
    username: 'mp',
    usernameLoading: false,
    password: '1234',
    confirmPassword: '1234',
    loading: false,
  })
  const formElement = ref<FormInstance>()

  // click
  const register = () => {
    if (!formElement.value) return
    formElement.value.validate(async (ok) => {
      if (ok) {
        ElMessageBox.prompt('请牢记您的密码，本站数据库全网公开加密，忘记密码将失去账号。', {
          closeOnClickModal: false,
          closeOnPressEscape: false,
          showCancelButton: true,
          showClose: false,
          showInput: true,
          cancelButtonText: '取消',
          confirmButtonText: '确认牢记',
          inputPlaceholder: '再次输入密码',
          inputValidator(v: string) {
            if (v !== form.password) {
              return '密码不一致'
            }
            return true
          },
          inputErrorMessage: '不支持特殊字符',
        })
          .then(async () => {
            form.loading = true
            await submit(form.username, form.password)
            form.loading = false
          })
          .catch(() => {
            //
          })
      }
    })
  }
  // submit
  const submit = async (username: string, password: string) => {
    const passwordKdf = mp.passwordKdf(username, password)
    const passwordHash = mp.passwordHash(passwordKdf)
    const user = await api.register(username, passwordHash)
    console.log('🌊', user)
    // formElement.value?.resetFields()
  }

  // check
  const checkUsername = (_rule: any, v: string, callback: (err?: Error) => void) => {
    const username = v
    if (!username) {
      return callback(new Error($t('UsernameEmpty')))
    }
    form.usernameLoading = true
    api.checkUserName(username).then((ok) => {
      form.usernameLoading = false
      if (ok) {
        callback()
      } else {
        callback(new Error('用户名已被占用'))
      }
    })
  }
  const checkPassword = (_rule: any, v: string, callback: (err?: Error) => void) => {
    const password = v
    if (!password) {
      return callback(new Error($t('PasswordEmpty')))
    }
    if (/^\S{4,32}$/.test(password) === false) {
      return callback(new Error($t('PasswordRule1')))
    }
    // if (/(?=.*[A-Z])(?=.*\S)[^]/.test(password) === false) {
    //   return callback(new Error($t('PasswordRule2')))
    // }
    // if (/(?=[a-z])[^]/.test(password) === false) {
    //   return callback(new Error($t('PasswordRule3')))
    // }
    // if (/(?=[\d]+)/.test(password) === false) {
    //   return callback(new Error($t('PasswordRule4')))
    // }
    callback()
  }
  const checkConfirmPassword = (_rule: any, v: string, callback: (err?: Error) => void) => {
    const password = v
    if (!password) {
      return callback()
    }
    if (form.password !== password) {
      return callback(new Error($t('PasswordsNotMatch')))
    }
    callback()
  }

  return {
    form,
    formElement,
    register,
    checkUsername,
    checkPassword,
    checkConfirmPassword,
  }
}
