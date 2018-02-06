const assert = require('assert')
const lexer = require('./lexer')
const parser = require('./parser')

assert.deepEqual(lexer('(12 + 4) / 6'), [
  { type: '(', value: undefined },
  { type: 'number', value: 12 },
  { type: '+', value: undefined },
  { type: 'number', value: 4 },
  { type: ')', value: undefined },
  { type: '/', value: undefined },
  { type: 'number', value: 6 },
  { type: '(end)', value: undefined }
])

assert.deepEqual(parser(lexer('12 / 4 + 6')), [
  {
    type: '+',
    left: {
      type: '/',
      left: { type: 'number', value: 12 },
      right: { type: 'number', value: 4 }
    },
    right: { type: 'number', value: 6}
  }
])
