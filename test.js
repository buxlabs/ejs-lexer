const assert = require('assert')
const lexer = require('./lexer')
const parser = require('./parser')

assert.deepEqual(lexer('(12 + 4) / 6'), [
  ["operator", "("],
  ["number", 12],
  ["operator", "+"],
  ["number", 4],
  ["operator", ")"],
  ["operator", "/"],
  ["number", 6]
])

assert.deepEqual(parser('12 / 4 + 6'), {
  type: '+',
  left: {
    type: '/',
    left: { type: 'number', value: 12 },
    right: { type: 'number', value: 4 }
  },
  right: { type: 'number', value: 6}
})