let id: number = 1
const callbacks: Map<number, Function | undefined> = new Map<number, Function | undefined>()
const handles: Map<string, Function> = new Map<string, Function>()

const JSBridge: any = window.JSBridge = {
  invoke(bridgeName: string, data: any, callback: Function | undefined): void {
    const nativeBridge = window.androidBridge || window.iosBridge
    const callbackId = Date.now() + id++
    callbacks.set(callbackId, callback)

    nativeBridge.postMessage({bridgeName, data: data || null, callbackId})
  },
  receiveMessage(message: any): void {
    const bridgeName: string = message.bridgeName
    const data: object = message.data || {}
    const callbackId = message.callbackId || 0
    if (callbacks.has(callbackId)) {
      // @ts-ignore
      callbacks.get(callbackId).apply(undefined, data)
    } else if (bridgeName && handles.has(bridgeName)) {
      const responseId = message.responseId
      const nativeBridge = window.androidBridge || window.iosBridge
      const result: object = handles.get(bridgeName)?.apply(undefined, data)
      nativeBridge.postMessage({responseId, result})
    }
  },
  registerHandle(bridgeName: string, handle: Function) {
    if (Object.prototype.toString.call(handle) === '[object Function]') {
      handles.set(bridgeName, handle)
    }
  },
  unregisterHandle(bridgeName: string) {
    if (handles.has(bridgeName))
      handles.delete(bridgeName)
  }
}

export default JSBridge
