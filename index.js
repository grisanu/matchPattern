function matchpattern(pattern, input) {
  var hash = {};

  // count unique char
  for (var char = 0; char < pattern.length; char++) {
    hash[pattern[char]] === undefined ? hash[pattern[char]] = 1: hash[pattern[char]]++;
  }

  // find all possible pair size
  // return [[], [], ..., []]
  var findAllSizes = function (obj, total) {
    // map obj to array
    var count = [];
    var order = {};

    var i = 0;
    for (var char in obj) {
      order[char] = i;
      i++;
      count.push(obj[char]);
    }

    // console.log(count);
    // return array of sub sizes in order of count
    var innerRecurse = function (index, subTotal) {
      var results = [];
      if (index === count.length - 1) {
        return [[subTotal]];
      }

      var i = 1;
      while (count[index]*i < subTotal) {
        var tmp = count[index]*i;
        // console.log(index, 'i =>', i);
        // console.log(index, 'tmp =>', tmp);
        var subResult = innerRecurse(index+1, subTotal - tmp); // [[], [], ..., []]
        // console.log(index, 'subResult =>', subResult);
        results = results.concat(subResult.map(function (element) { return [tmp].concat(element); }));
        // console.log(index, 'results =>', results);
        // console.log(index, 'subTotal =>', subTotal);
        // console.log(index, 'i =>', i);
        i++;
      }

      return results;
    };

    return [order, innerRecurse(0, total)];
  };

  // try all sizes
  var tmp = findAllSizes(hash, input.length);
  var order = tmp[0];
  var allSizes = tmp[1];

  // console.log(allSizes);
  for (var trial = 0; trial < allSizes.length; trial++) {
    var newString = '';
    var last = 0;
    var hashmap = {}; // char to word
    var reverseHashmap = {}; // word to char
    for (var i = 0; i < pattern.length; i++) {
      // build new string
      var char = pattern[i];
      // console.log(char);
      var count = allSizes[trial][order[char]]/hash[char];
      // console.log(count);
      // console.log(allSizes[trial]);
      // console.log(order[char]);
      // console.log(hash[char]);
      var subStr = input.substring(last, last + count);
      // console.log(subStr);
      if (hashmap[char] === undefined && reverseHashmap[subStr] === undefined) {
        hashmap[char] = subStr;
        reverseHashmap[subStr] = char;

      }
      newString = newString.concat(hashmap[char]);
      last += count;

    }

    // console.log("char to str =>", hashmap);
    // console.log("str to char =>", reverseHashmap);
    // if match return 1;
    if (newString === input) {
      console.log(allSizes[trial]);
      return 1;
    }
  }

  return 0;
}

// console.log(wordpattern('abcba', 'redblueabluered')); // 1
// console.log(wordpattern('aaa', 'redredred')); // 1
// console.log(wordpattern('abba', 'redredredred')); // 0
console.log(wordpattern('aab', '111111')); // 0
// console.log(wordpattern('abab', 'redblueredblue')); // 1
// console.log(wordpattern('abc', 'eserlkbstlnselv,/elrsnoeirlvjeios;j3')); // 1


// 1) try all possible
// 2) divide string into parts and try all part size

/** Cases:
abba
aaa
*/
