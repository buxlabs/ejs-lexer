function isOperator (character) {
  return /[+\-*\/\^%=(),]/.test(character)
}

function isDigit (character) {
  return /[0-9]/.test(character)
}

function isWhiteSpace (character) {
  return /\s/.test(character)
}

function isIdentifier (character) {
  return typeof character === "string" && !isOperator(character) && !isDigit(character) && !isWhiteSpace(character)
}

function lexer (input) {
  var tokens = [], index = 0, length = input.length, character
  function next () {
    index += 1
    character = input[index]
    return character
  }
  function tokenize (type, value) {
    tokens.push([ type, value ])
  }
  while (index < length) {
    character = input[index]
    if (isWhiteSpace(character)) {
      next()
    } else if (isOperator(character)) {
      tokenize("operator", character)
      next()
    } else if (isDigit(character)) {
      let number = character
      while (isDigit(next())) {
        number += character
      }
      if (character === '.') {
        do {
          number += character
        } while (isDigit(next()))
      }
      number = parseFloat(number)
      if (!isFinite(number)) {
        throw "Number is too large or too small for a 64-bit double."
      }
      tokenize("number", number)
    } else if (isIdentifier(character)) {
      let identifier = character
      while (isIdentifier(next())) {
        identifier += character
      }
      tokenize("identifier", identifier)
    } else {
      throw "Unrecognized token."
    }
  }
  return tokens
}

module.exports = lexer
