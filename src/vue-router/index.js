import HashBrowser from "./hashBrowser";

export let Vue;

function createRouteMap(routes, pathMap = {}) {
  routes.forEach(route => {
    addRouteRecord(route, pathMap)
  })
  return pathMap
}

function addRouteRecord(route, pathMap, parent) {
  let { path, component, props, meta, children } = route
  path = `${(
    parent?.path === undefined || parent.path === '/'
      ? ''
      : parent.path
    + '/'
  )}${path}`
  if (!(path in pathMap)) {
    pathMap[path] = {
      path,
      component,
      props,
      meta,
    }
  }
  children?.forEach(childrenRoute => {
    addRouteRecord(childrenRoute, pathMap, route)
  })
}

function createMatcher(routes) {
  const pathMap = createRouteMap(routes)
  function addRoutes(routes) {
    createRouteMap(routes, pathMap)
  }
  function addRoute(route) {
    createRouteMap([route], pathMap)
  }
  function match(location) {
    return pathMap[location]
  }
  // 映射表对象
  return {
    addRoutes,
    addRoute,
    match,
  }
}

/** 核心分为路由映射表和路由系统 */
export default class VueRouter {
  constructor(options) {
    const { routes = [], mode = 'hash' } = options
    this.matcher = createMatcher(routes)
    switch (mode) {
      case 'hash':
        this.history = new HashBrowser(this)
        break;
      default:
        break;
    }
  }

  async init(app) {
    const history = this.history
    await history.transitionTo(history.getCurrentLocation())
    // QA 为什么要在这里进行初始化, 在 new 示例时直接监听不行吗
    history.setupListener()
  }

  match(location) {
    return this.matcher.match(location)
  }

  push(location) {
    this.history.transitionTo(location)
  }

  static install(_Vue) {
    Vue = _Vue
    
    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          this._routerRoot = this
          this._router = this.$options.router
          this._router.init()
        } else {
          this._routerRoot = this.$parent?._routerRoot
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$router', {
      get() {
        return this._routerRoot._router
      }
    })
    // Vue.prototype

    Vue.component('router-link', {
      props: {
        tag: { type: String, default: 'a' },
        to: { type: String, require: true },
      },
      methods: {
        handler() {
          console.log(` ================== this ================= `, this)
          this.$router.push(this.to)
          // console.log(` ================== handler ================= `, )
        }
      },
      render() {
        let tag = this.tag
        return <tag onClick={this.handler}>{this.$slots.default}</tag>
        // return <a>{this.$slots.default}</a>
      }
    })

    Vue.component('router-view', {
      render() {
        return <div>空</div>
      }
    })
  }
}