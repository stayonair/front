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
  // store にログイン情報があるときは返す
  if (store.state.auth.user) {
    return
  }
  
  // store にログイン情報がないとき
  if (!store.state.auth.user) {
    // login, signupページであればfirebaseに問い合わせをしない
    if (
      route.path === '/signup' ||
      route.path ==='/login'
    ) {
      return
    }
    
    const getAuth = function() {
      return new Promise((resolve) => {
        return firebase.auth().onAuthStateChanged(user => {
          resolve(user)
        })
      }).then(user => {
        // ユーザーログインしている場合、storeにuser情報を追加
        if (user) {
          store.dispatch('auth/setUser', user)
        }
        // ログインしていないユーザーの場合、signupページへリダイレクト
        if (!user) {
          // 一般ページの場合、ログインしていなくても閲覧可能なのでreturnする
          if (
            isGeneralPage(route.path) ||
            route.path.includes('/posts')
          ) {
            return
          }
          // 一般ページでない場合、signupページへ遷移させる
          return redirect('/signup')
        }
      }).catch(error => {
        console.error(error)
      })
    }
    // firebase にログイン情報を問い合わせる
    await getAuth()
  }

  // TODO: 認証に関係ない分岐なので、別のmiddlewareに分ける
  if (route.path === '/posts') {
    return redirect('/')
  }
}
