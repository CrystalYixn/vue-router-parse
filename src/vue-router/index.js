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

export default class VueRouter {
  constructor(options) {
    const { routes = [] } = options
    this.matcher = createMatcher(routes)
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