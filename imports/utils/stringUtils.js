export function removeComments(string) {
  //Takes a string of code, not an actual function.
  return string.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim(); //Strip comments
}
