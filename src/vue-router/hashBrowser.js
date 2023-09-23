import History from "./History"

function getHash() {
  return window.location.hash.slice(1)
}

function ensureSlash() {
  if (!window.location.hash)  {
    window.location.hash = '/'
  }
}

export default class HashBrowser extends History {
  constructor (router) {
    super(router)
    ensureSlash()
  }

  setupListener() {
    window.addEventListener('hashchange', () => {
      console.log(` ================== getCurrentLocation() ================= `, this.getCurrentLocation())
    })
  }
  
  getCurrentLocation() {
    return getHash()
  }
}