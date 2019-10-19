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

  // store にログイン情報がないとき
  if (!store.state.auth.user) {
    await firebase.auth().onAuthStateChanged(user => {
      // ログインしていたら、store に追加する
      if (user) {
        store.dispatch('auth/setUser', user)
      } else {
        return redirect('/login')
      }
    })
  }
  
  // store にログイン情報があるとき
  if (
    store.state.auth.user ||
    isGeneralPage(route.path)
  ) {
    return
  }

  // if (route.path === '/posts') {
  //   return redirect('/')
  // }


}
