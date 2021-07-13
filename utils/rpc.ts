const SOCKET_REF: any = {current: null}

class Socket {
  private timeoutId: any
  private readonly ipAddress: string
  private lockConnect: boolean = false
  private socket: WebSocket | undefined
  private eventMap: Map<string, Set<Function>> = new Map<string, Set<Function>>()

  constructor(ipAddress: string) {
    this.ipAddress = ipAddress
    this.onopen = this.onopen.bind(this)
    this.onclose = this.onclose.bind(this)
    this.onerror = this.onerror.bind(this)
    this.onmessage = this.onmessage.bind(this)
    this.init()
  }

  init() {
    this.lockConnect = true
    const socket = new WebSocket(`ws://${this.ipAddress}:2345/services`)
    socket.addEventListener('open', this.onopen)
    socket.addEventListener('close', this.onclose)
    socket.addEventListener('error', this.onerror)
    socket.addEventListener('message', this.onmessage)
    this.socket = socket
  }

  send(data: any) {
    try {
      this.socket?.send(data)
    } catch (e) {
      console.error(e)
    }
  }

  onopen(event: any) {
    this.reset().heartbeatCheck()
    this.handleEvent('onopen', event)
    SOCKET_REF.current = this
  }

  onclose(event: any) {
    this.reset()
    this.handleEvent('onclose', event)
  }

  onerror(error: any) {
    this.reset()
    this.handleEvent('onerror', error)
  }

  onmessage(event: any) {
    this.handleEvent('onmessage', event)
  }

  unbind() {
    const socket = this.socket
    socket?.removeEventListener('open', this.onopen)
    socket?.removeEventListener('close', this.onclose)
    socket?.removeEventListener('error', this.onopen)
    socket?.removeEventListener('message', this.onopen)
    return this
  }

  disconnect() {
    this.socket?.close()
    this.reset().unbind()
  }

  hasConnected() {
    return this.socket?.readyState === WebSocket.OPEN
  }

  heartbeatCheck() {
    this.timeoutId = setInterval(() => this.socket?.send('ping'), 30000)
  }

  reset() {
    this.lockConnect = false
    clearTimeout(this.timeoutId)
    return this
  }

  reconnect() {
    if (this.lockConnect) {
      return
    }

    this.init()
  }

  addEventListener(type: string, listener: Function) {
    const eventName: string = `on${type}`
    const eventMap: Map<string, Set<Function>> = this.eventMap
    if (eventMap.has(eventName)) {
      eventMap.get(eventName)?.add(listener)
    } else {
      eventMap.set(eventName, new Set([listener]))
    }
  }

  removeEventListener(type: string, listener: Function) {
    const listeners: Set<Function> | undefined = this.eventMap.get(`on${type}`)
    listeners?.delete(listener)
  }

  handleEvent(eventName: string, args: any): void {
    const listeners: Set<Function> | undefined = this.eventMap.get(eventName)
    listeners?.forEach((listener) => listener(args))
  }
}

export function createWebSocket(ipAddress: string): Socket {
  if (SOCKET_REF.current === null) {
    SOCKET_REF.current = new Socket(ipAddress)
  }
  return SOCKET_REF.current
}

function isFunction(onclose: any | undefined): boolean {
  return true
}

export function createAjax(onopen?: any, onclose?: any): any {
  const socket: Socket = SOCKET_REF.current
  const callbacks: any = {}
  const message = (event: MessageEvent<any>) => {
    onmessage(event, callbacks)
  }
  const error = () => onerror(callbacks)
  const ajax = function (service: any, dataType: any, args?: any) {
    return new Promise((resolve, reject) => {
      let rpcId: string
      do {
        rpcId = `${service}-${Date.now()}`
      } while (callbacks[rpcId])
      callbacks[rpcId] = {resolve, reject}
      const data = JSON.stringify({cmd: 3, data: {rpcId: rpcId, dataType: dataType, data: args ?? null}})
      if (socket.hasConnected()) {
        socket.send(data)
        ontimeout(callbacks, rpcId)
      } else {
        socket.reconnect()
        callbacks[rpcId].reconnectAttempts = 1
        resend(socket, data, callbacks, rpcId, 3)
      }
    })
  }

  isFunction(onopen) && socket.addEventListener('open', onopen)
  isFunction(onclose) && socket.addEventListener('close', onclose)
  socket.addEventListener('message', message)
  socket.addEventListener('error', error)

  ajax.release = function () {
    socket.removeEventListener('open', onopen)
    socket.removeEventListener('close', onclose)
    socket.removeEventListener('message', message)
    socket.removeEventListener('error', error)
  }

  return ajax
}

function resend(socket: Socket, data: string, callbacks: any, rpcId: string, maxReconnectAttempts: number): void {
  if (callbacks[rpcId].reconnectAttempts < maxReconnectAttempts) {
    setTimeout(() => {
      if (!callbacks.hasOwnProperty(rpcId)) {
        return
      }

      callbacks[rpcId].reconnectAttempts++
      if (socket.hasConnected()) {
        socket.send(data)
        ontimeout(callbacks, rpcId)
      } else {
        resend(socket, data, callbacks, rpcId, maxReconnectAttempts)
      }
    }, 500)
  } else {
    onRequestError(callbacks, rpcId, 'NetWork Error')
  }
}

function ontimeout(callbacks: any, rpcId: string): void {
  setTimeout(() => onRequestError(callbacks, rpcId, 'Request Timout'), 15000)
}

function onerror(callbacks: any): void {
  for (let key in callbacks) {
    onRequestError(callbacks, key, 'NetWork Error')
  }
}

function onRequestError(callbacks: any, rpcId: string, message?: string): void {
  if (callbacks.hasOwnProperty(rpcId)) {
    callbacks[rpcId].reject(new Error(message))
    delete callbacks[rpcId]
  }
}

function onmessage(event: MessageEvent, callbacks: any): void {
  try {
    const res: any = JSON.parse(event.data)
    const rpcId: string = res.data.rpcId
    if (res.cmd === 3 && callbacks.hasOwnProperty(rpcId)) {
      const promise = callbacks[rpcId]
      delete callbacks[rpcId]
      if (res.data.data) {
        promise.resolve(res.data.data)
      } else {
        promise.reject(res.data.err)
      }
    }
  } catch (e) {
  }
}
