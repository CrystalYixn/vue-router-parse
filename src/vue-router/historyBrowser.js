import History from "./History"
export default class HistoryBrowser extends History {
  constructor (router) {
    super(router)
  }
  
  setupListener() {
    window.addEventListener('popstate', () => {
      console.log(` ================== getCurrentLocation() ================= `, this.getCurrentLocation())
    })
  }

  getCurrentLocation() {
    return window.location.pathname
  }
}