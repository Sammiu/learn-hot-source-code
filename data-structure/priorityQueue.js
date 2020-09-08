(function (exports) {
  /**
   * parent     (i - 1) / 2
   * leftChild  1 + i * 2
   * rightChild (1 + i) * 2
   * */

  const elements = [2, 1, 6, 3, 9, 7, 4, 8, 5]

  /**
   * 优先级队列上虑
   * */
  function percolateUp (i, elements) {
    const elem = elements[i]
    while (i > 0) {
      const j = (i - 1) >> 1
      if (elem < elements[j]) {
        break
      } else {
        elements[i] = elements[j]
        i = j
      }
    }
    elements[i] = elem
    return i
  }

  /**
   * 优先级队列下虑
   * */
  function percolateDown (n, i) {
    let j
    while (i !== (j = properParent(elements, n, i))) {
      swap(i, j, elements)
      i = j
    }
    return i
  }

  /**
   * 交换位置
   * */
  function swap (i, j, elements) {
    const temp = elements[i]
    elements[i] = elements[j]
    elements[j] = temp
  }

  /**
   * 判断是否是一个正确的父节点
   * */
  function properParent (elements, n, i) {
    const lIndex = 1 + (i << 1)
    const rIndex = (1 + i) << 1

    if (elements[lIndex] > elements[i] && elements[rIndex] > elements[i]) {
      return elements[lIndex] > elements[rIndex] ? lIndex : rIndex
    } else if (elements[lIndex] > elements[i] && elements[lIndex] !== undefined) {
      return lIndex
    } else if (elements[rIndex] > elements[i] && elements[rIndex] !== undefined) {
      return rIndex
    } else {
      return i
    }
  }

  /**
   * 获取队列的最高优先级
   * */
  function getMax () {
    return elements[0]
  }

  /**
   * 入列
   * */
  function enqueue (e) {
    elements.push(e)
    percolateUp(elements.length, elements)
  }

  /**
   * 出列
   * */
  function dequeue () {
    const maxElem = elements[0]
    elements[0] = elements[elements.length - 1]
    elements.pop()
    percolateDown(elements.length - 1, 0)
    return maxElem
  }

  /**
   * 二叉堆化
   * */
  function heapify () {
    const len = elements.length - 1
    for (let i = lastInternal(len); i >= 0; i--) {
      percolateDown(len, i)
    }
  }

  /**
   * 获取最后一个内部节点
   * */
  function lastInternal (n) {
    if (n <= 2) {
      return 0
    }
    return Math.floor((n >> 1) - 1)
  }

  function log () {
    console.log(elements.join('、'))
  }

  exports.log = log
  exports.getMax = getMax
  exports.heapify = heapify
  exports.enqueue = enqueue
  exports.dequeue = dequeue
})(global)

global.heapify()
global.log()

let elem
while ((elem = global.dequeue())) {
  console.log(elem)
}
