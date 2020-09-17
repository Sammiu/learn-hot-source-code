function HashMap() {
  this.size = 0;
  this.table = new Array(100);
}


HashMap.prototype.hash = function (data) {
  let hashCode = 0;
  for (let i = 0; i < data.length; i++) {
    hashCode += data.charCodeAt(i);
  }

  if (hashCode > 99) {
    const indexStart = Math.floor((hashCode * hashCode).toString().length >> 1);
    return parseInt(keyCode.substring(indexStart, indexStart + 2));
  }
  return hashCode;
}

HashMap.prototype.insert = function (key, val) {
  const position = this.hash(key);

  while (this.table[position] && this.table[position][0]) {
    position++;

    if (position >= this.table.length) {
      throw new RangeError('哈希表已经没有可用空间') ；
    }
  }

  this.table[position] = [key, val];
}

HashMap.prototype.get = function (key) {
  const position = this.hash(key);
  while (position < this.table.length && this.table[position]) {
    if (this.table[position][0] === key) {
      return this.table[position][1]
    } else {
      position++;
    }
  }

  return undefined;
}


HashMap.prototype.delete = function (key) {
  const position = this.hash(key);
  while (position < this.table.length && this.table[position]) {
    if (this.table[position][0] === key) {
      this.table[position][0] = undefined;
      this.table[position][1] = undefined;
      return true
    } else {
      position++;
    }
  }
  return false;
}


