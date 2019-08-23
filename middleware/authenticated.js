import firebase from '~/plugins/firebase'

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export default ({ route, store, redirect }) => {
  if (route.name === 'signup') {
    return
  }
  firebase.auth().onAuthStateChanged(user => {
    if (!user && route.name !== 'login') {
      redirect('/login')
      return
    }

    if (user) {
      store.dispatch('auth/setUser', user)
    }
  })
}
