const START_TAG = '<'
const END_TAG = '>'
const EMBEDDED_TEMPLATE = '%'
const ESCAPE = '-'
const INTERPOLATE = '='

module.exports = function (input) {
  const tokens = []
  const length = input.length
  let index = 0
  let character = input[0]
  function next () {
    index += 1
    character = input[index]
    return character
  }
  function current (sign) {
    return character === sign
  }
  function push (type, value) {
    if (value) tokens.push({ type, value })
  }
  let type = 'string'
  let value = ''
  while (index < length) {
    if (character === START_TAG && input[index + 1] === EMBEDDED_TEMPLATE) {
      next()
      next()
      push('string', value)
      value = ''
      if (character === ESCAPE) {
        type = 'escape'
      } else if (character === INTERPOLATE) {
        type = 'interpolate'
      } else {
        type = 'evaluate'
      }
      next()
    } else if (character === EMBEDDED_TEMPLATE && input[index + 1] === END_TAG) {
      next()
      next()
      push(type, value.trim())
      value = ''
      type = 'string'
    } else {
      value += character
      next()
    }
  }
  push(type, value)
  return tokens
}
