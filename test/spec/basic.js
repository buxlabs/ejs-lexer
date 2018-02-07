const assert = require('assert')
const lexer = require('../../src/lexer')

assert.deepEqual(lexer('<% console.log("hello") %>'), [
  { type: 'evaluate', value: 'console.log("hello")' }
])

assert.deepEqual(lexer('<%- foo %>'), [
  { type: 'escape', value: 'foo' }
])

assert.deepEqual(lexer('<%= bar %>'), [
  { type: 'interpolate', value: 'bar' }
])

assert.deepEqual(lexer('<div><%- foo %></div>'), [
  { type: 'string', value: '<div>' },
  { type: 'escape', value: 'foo' },
  { type: 'string', value: '</div>' }
])
