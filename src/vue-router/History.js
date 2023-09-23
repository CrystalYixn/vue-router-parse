export default class History {
  constructor(router) {
    this.router = router
  }

  /** 核心 API */
  transitionTo(location) {
    const route = this.router.match(location)
    console.log(` ================== transitionTo ================= `, route)
    return Promise.resolve()
  }
}