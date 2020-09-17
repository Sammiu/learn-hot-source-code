function buildNext(pattern) {
  let j = 0;
  let t = -1;
  const next = [t];
  while (j < pattern.length - 1) {
    if (0 > t || pattern[j] === pattern[t]) {
      next[++j] = ++t;
    } else {
      t = next[t];
    }
  }

  return next;
}

function macth(pattern, text) {

  let i = 0;
  let j = 0;
  const next = buildNext(pattern);

  console.log(next)

  while (j < pattern.length && i < text.length) {
    if (0 > j || pattern[j] === text[i]) {
      i++;
      j++;
    } else {
      j = next[j];
    }
  }

  return i - j;
}


console.log(macth('aaaabcaaaefaaa', 'fhsdifhjsdhfljfpojeoirhtijretgeridgbuohkvldjfgkjdfkgj'))

' a a a a b c a a a e f a a a'
'-1,0,1,2,3,0,0,1,2,3,0,0,1,2'