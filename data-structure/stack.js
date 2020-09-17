const pri = {
  '+': { '+': '>', '-': '>', '*': '<', '/': '<', '(': '<', ')': '>', '\0': '>' },
  '-': { '+': '>', '-': '>', '*': '<', '/': '<', '(': '<', ')': '>', '\0': '>' },
  '*': { '+': '>', '-': '>', '*': '>', '/': '>', '(': '<', ')': '>', '\0': '' },
  '/': { '+': '>', '-': '>', '*': '>', '/': '>', '(': '<', ')': '>', '\0': '' },
  '(': { '+': '<', '-': '<', '*': '<', '/': '<', '(': '<', ')': '=', '\0': ' ' },
  ')': { '+': ' ', '-': ' ', '*': ' ', '/': ' ', '(': ' ', ')': ' ', '\0': ' ' },
  '\0': { '+': '<', '-': '<', '*': '<', '/': '<', '(': '<', ')': ' ', '\0': '=' }
}

function Stack() {
  this.index = 0;
  this.array = [];
}

Stack.prototype.push = function (elem) {
  this.array[this.index++] = elem;
}

Stack.prototype.pop = function () {
  if (this.index > 0) {
    const elem = this.array[this.index];
    this.index--;
    this.array.length--;
    return elem;
  }

  return null;
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop()
stack.pop()
stack.push(4)
stack.pop()
stack.pop()
stack.push(5);
console.log(stack.array)