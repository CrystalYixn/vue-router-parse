export let Vue;

export default class VueRouter {
  constructor(options) {
    const { routes } = options
  }

  static install(_Vue) {
    Vue = _Vue
    
    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          this._routerRoot = this
          this._router = this.$options.router
        } else {
          this._routerRoot = this.$parent?._routerRoot
        }
      }
    })
    Vue.component('router-link', {
      render() {
        return <a>{this.$slots.default}</a>
      }
    })
    Vue.component('router-view', {
      render() {
        return <div>空</div>
      }
    })
  }
}