module.exports = function (tokens) {
  var symbols = {}
  function symbol (id, nud, lbp, led) {
    var sym = symbols[id] || {}
    symbols[id] = {
      lbp: sym.lbp || lbp,
      nud: sym.nud || nud,
      led: sym.led || led
    }
  }

  function interpret (token) {
    var sym = Object.create(symbols[token.type] || null)
    sym.type = token.type
    sym.value = token.value
    return sym
  }

  var i = 0

  function token () {
    return interpret(tokens[i])
  }

  function next () {
    i += 1
    return token()
  }

  function expression (rbp) {
    var left, current = token()
    next()
    if (!current.nud) throw "Unexpected token: " + current.type
    left = current.nud(current)
    while (rbp < token().lbp) {
      current = token()
      next()
      if (!current.led) throw "Unexpected token: " + current.type
      left = current.led(left)
    }
    return left
  }

  function infix (id, lbp, rbp, led) {
    rbp = rbp || lbp
    symbol(id, null, lbp, led || function (left) {
      return {
        type: id,
        left: left,
        right: expression(rbp)
      }
    })
  }

  function prefix (id, rbp) {
    symbol(id, function () {
      return {
        type: id,
        right: expression(rbp)
      }
    })
  }

  prefix("-", 7)
  infix("^", 6, 5)
  infix("*", 4)
  infix("/", 4)
  infix("%", 4)
  infix("+", 3)
  infix("-", 3)

  symbol(",")
  symbol(")")
  // symbol("(end)")

  symbol("(", function () {
    value = expression(2)
    if (token().type !== ")") throw "Expected closing parenthesis ')'"
    next()
    return value
  })
  symbol("number", function (number) {
    return number
  })

  symbol("identifier", function (name) {
    if (token().type === '(') {
      let args = []
      if (tokens[i + 1].type === ')') {
        next()
      } else {
        do {
          next()
          args.push(expression(2))
        } while (token().type === ',')
        if (token().type !== ')') throw "Expected closing parenthesis ')'"
      }
      next()
      return {
        type: 'call',
        args: args,
        name: name.value
      }
    }
    return name
  })

  infix('=', 1, 2, function (left) {
    if (left.type === 'call') {
      for (let i = 0; i < left.args.length; i += 1) {
        if (left.args[i].type !== 'identifier') throw 'Invalid argument name'
      }
      return {
        type: 'function',
        name: left.name,
        args: left.args,
        value: expression(2)
      }
    } else if (left.type === 'identifier') {
      return {
        type: 'assign',
        name: left.value,
        value: expression(2)
      }
    }
    throw 'Invalid value'
  })



  var parseTree = [];
  while (token().type !== "(end)") {
    parseTree.push(expression(0));
  }
  return parseTree;

  return parseTree
}