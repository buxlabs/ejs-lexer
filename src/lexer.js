function isWhiteSpace (character) {
  return /\s/.test(character)
}

function isStartTagCharacter (character) {
  return character === '<'
}

function isEndTagCharacter (character) {
  return character === '>'
}

function isEmbeddedTemplateCharacter (character) {
  return character === '%'
}

function isEscapeCharacter (character) {
  return character === '-'
}

function isInterpolateCharacter (character) {
  return character === '='
}

module.exports = function (input) {
  const tokens = []
  const length = input.length
  let index = 0
  let character
  function next () {
    index += 1
    character = input[index]
    return character
  }
  function addToken (type, value) {
    tokens.push({ type, value })
  }
  while (index < length) {
    character = input[index]
    if (isWhiteSpace(character)) {
      next()
    } else if (isStartTagCharacter(character)) {
      next()
      if (isEmbeddedTemplateCharacter(character)) {
        next()
        let type = 'evaluate'
        if (isEscapeCharacter(character)) {
          type = 'escape'
          next()
        } else if (isInterpolateCharacter(character)) {
          type = 'interpolate'
          next()
        }
        let value = ''
        while (!isEmbeddedTemplateCharacter(next()) && character !== void 0) {
          value += character
        }
        next()
        if (isEndTagCharacter(character)) {
          addToken(type, value.trim())
          next()
        }
      } else {
        let value = '<' + character
        while (!isStartTagCharacter(next()) && character !== void 0) {
          value += character
        }
        addToken('string', value)
      }
    }
  }
  return tokens
}
