import firebase from '~/plugins/firebase'

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

// 一般閲覧可能なページのパスリスト
const pathList = [
  '/',
  '/search',
  '/login',
  '/signup',
  '/register-name'
]

// 一般ページかどうかチェックする関数
const isGeneralPage = path => {
  return pathList.some(_path => {
    return path === _path
  })
}

export default async ({ route, store, redirect }) => {
    // store にログイン情報がないとき firebase を確認
  if (!store.state.auth.user) {
    const getAuth = function() {
      return new Promise((resolve) => {
        return firebase.auth().onAuthStateChanged(user => {
          resolve(user)
        })
      }).then(user => {
        if (user) {
          store.dispatch('auth/setUser', user)
        }
        if (!user) {
          return redirect('/signup')
        }
      }).catch(error => {
        console.error(error)
      })
    }

    await getAuth()

  } else if (isGeneralPage(route.path)) {
    return
  } 

  // store にログイン情報があるとき
  if (store.state.auth.user) {
    return
  }

  if (route.path === '/posts') {
    return redirect('/')
  }
}
