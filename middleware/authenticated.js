import firebase from '~/plugins/firebase'

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export default async ({ store }) => {
  // store にログイン情報があるときは何もしない
  if (store.state.auth.user) {
    return
  }

  await firebase.auth().onAuthStateChanged(user => {
    // ログインしていたら、store に追加する
    if (user) {
      store.dispatch('auth/setUser', user)
    }
  })
}
