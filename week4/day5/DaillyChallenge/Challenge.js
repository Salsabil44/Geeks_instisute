function isAnagram(str1, str2) {
  const normalize = str => str.replace(/\s+/g, '').toLowerCase();

  str1 = normalize(str1);
  str2 = normalize(str2);

  const sortedStr1 = str1.split('').sort().join('');
  const sortedStr2 = str2.split('').sort().join('');

  return sortedStr1 === sortedStr2;
}

// Examples
console.log(isAnagram("Astronomer", "Moon starer")); // true
console.log(isAnagram("School master", "The classroom")); // true
console.log(isAnagram("Hello", "World")); // false
