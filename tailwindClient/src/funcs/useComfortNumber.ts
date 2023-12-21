export default function useComfortNumber(num: number) {
  const numString = (num + "").split("");
  const stringLength = numString.length;
  let res = "";
  for (let i = 0; i < stringLength; i++) {
    if (!((stringLength - (i + 1)) % 3)) {
      console.log(stringLength - i);
      res += numString[i] + " ";
      continue;
    }
    res += numString[i];
  }

  return res;
}
