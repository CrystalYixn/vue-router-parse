import History from "./History"
export default class HistoryBrowser extends History {
  constructor (router) {
    super(router)
  }
  
  setupListener() {
    window.addEventListener('popstate', () => {
      this.transitionTo(this.getCurrentLocation())
    })
  }

  getCurrentLocation() {
    return window.location.pathname
  }

  push(location) {
    history.pushState({}, '', location)
  }
}