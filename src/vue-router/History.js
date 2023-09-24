function createRoute(record, location) {
  let matched = []
  if (record) {
    do {
      matched.unshift(record)
    } while (record = record.parent)
  }
  return {
    ...location,
    matched,
  }
}

function runQueue(queue, from, to) {
  return new Promise((resolve) => {
    next(0)
    function next(index) {
      if (index >= queue.length) return resolve()
      queue[index](from, to, () => next(index + 1))
    }
  })
}

export default class History {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, {
      path: '/'
    })
  }

  /** 核心 API */
  async transitionTo(location) {
    // routes 配置中的一条记录
    const record = this.router.match(location)
    // 实际渲染读取的 current 对象使用的值
    const route = createRoute(record, { path: location })
    const { path, matched } = this.current
    // 要跳转的新路由地址与匹配结果一致时则不跳转
    if (location === path && route.matched.length === matched.length) return
    let queue = [].concat(this.router.beforeEachHooks)
    await runQueue(queue, this.current, route)
    this.current = route
    console.log(` ================== this.current ================= `, this.current)
    // 为了同步响应式更新, 需要每次更新指向的对象
    this.cb?.(route)
    return Promise.resolve()
  }

  listen(cb) {
    this.cb = cb
  }
}