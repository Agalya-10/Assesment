// Task .1 [TYPE CHECK]

function ints(a, b) {
  return Number.isInteger(a) && Number.isInteger(b);
}
console.log(ints(1, 2));    
console.log(ints("a", 1));  
console.log(ints(3.5, 4));
console.log(ints(7, 0)); 

// Task . 2 [DOUBLE LETTERS]

function doubleletters(str) {
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      return true;
    }
  }
  return false;
}
console.log(doubleletters("aagalya"))

// Task . 3 [ANAGRAMS]

function anagram(str1,str2){
    if(str1.length !== str2.length) return false ;
    const sort1 = str1.split("").sort().join("");
    const sort2 = str2.split("").sort().join("");
    return sort1===sort2;
}
console.log(anagram("appa","papa"))