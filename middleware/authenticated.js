import firebase from '~/plugins/firebase'

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export default async ({ route, store, redirect }) => {
  
  // store にログイン情報があるとき
  // 一般閲覧可能なページのときは、何もしない
  if (
    store.state.auth.user ||
    route.path === '/' ||
    route.path === '/search' ||
    route.path === '/login' ||
    route.path === '/signup' ||
    route.path === '/signup_name'
  ) {
    return
  }

  if (route.path === '/posts') {
    return redirect('/')
  }

  await firebase.auth().onAuthStateChanged(user => {
    // ログインしていたら、store に追加する
    if (user) {
      store.dispatch('auth/setUser', user)
    }
  })

  // store にログイン情報がないとき
  // ログインページにリダイレクト
  // if (!store.state.auth.user) {
  //   return redirect('/login')
  // }

}
