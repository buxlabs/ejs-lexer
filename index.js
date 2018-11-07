const START_TAG = '<'
const END_TAG = '>'
const EMBEDDED_TEMPLATE = '%'
const ESCAPE = '-'
const INTERPOLATE = '='
const SLURP = '_'
const COMMENT = '#'

module.exports = function lexer (input) {
  const tokens = []
  const length = input.length
  let index = 0
  let character = input[0]
  function advance () {
    index += 1
    character = input[index]
    return character
  }
  function current (tag) {
    return character === tag
  }
  function next (tag) {
    return input[index + 1] === tag
  }
  function push (type, value) {
    if (value) tokens.push({ type, value })
  }
  let type = 'string'
  let value = ''
  while (index < length) {
    if (current(START_TAG) && next(EMBEDDED_TEMPLATE)) {
      push('string', value)
      advance()
      advance()
      value = ''
      if (current(ESCAPE)) {
        type = 'escape'
        advance()
      } else if (current(INTERPOLATE)) {
        type = 'interpolate'
        advance()
      } else if (current(COMMENT)) {
        type = 'comment'
        advance()
      } else if (current(SLURP)) {
        type = 'slurp'
        advance()
      } else {
        type = 'evaluate'
      }
    } else if (current(EMBEDDED_TEMPLATE) && next(END_TAG)) {
      push(type, value.trim())
      advance()
      advance()
      value = ''
      type = 'string'
    } else {
      value += character
      advance()
    }
  }
  push(type, value)
  return tokens
}
