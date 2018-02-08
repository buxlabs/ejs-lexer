const assert = require('assert')
const lexer = require('../../src/lexer')

assert.deepEqual(lexer('hello'), [
  { type: 'string', value: 'hello' }
])

assert.deepEqual(lexer('<div></div>'), [
  { type: 'string', value: '<div></div>' }
])

assert.deepEqual(lexer('<% console.log(foo) %>'), [
  { type: 'evaluate', value: 'console.log(foo)' }
])

assert.deepEqual(lexer('<%console.log(foo)%>'), [
  { type: 'evaluate', value: 'console.log(foo)' }
])

assert.deepEqual(lexer('<%   console.log(foo)   %>'), [
  { type: 'evaluate', value: 'console.log(foo)' }
])

assert.deepEqual(lexer('<%- foo %>'), [
  { type: 'escape', value: 'foo' }
])

assert.deepEqual(lexer('<%-foo%>'), [
  { type: 'escape', value: 'foo' }
])

assert.deepEqual(lexer('<%-    foo     %>'), [
  { type: 'escape', value: 'foo' }
])

assert.deepEqual(lexer('<%= bar %>'), [
  { type: 'interpolate', value: 'bar' }
])

assert.deepEqual(lexer('<%=bar%>'), [
  { type: 'interpolate', value: 'bar' }
])

assert.deepEqual(lexer('<%=     bar     %>'), [
  { type: 'interpolate', value: 'bar' }
])

assert.deepEqual(lexer('<div><%- foo %></div>'), [
  { type: 'string', value: '<div>' },
  { type: 'escape', value: 'foo' },
  { type: 'string', value: '</div>' }
])

assert.deepEqual(lexer('<div data-foo="<%- bar %>">baz</div>'), [
  { type: 'string', value: '<div data-foo="' },
  { type: 'escape', value: 'bar' },
  { type: 'string', value: '">baz</div>' }
])

assert.deepEqual(lexer('<% if (hello) { %><div>foo</div><% } %>'), [
  { type: 'evaluate', value: 'if (hello) {' },
  { type: 'string', value: '<div>foo</div>' },
  { type: 'evaluate', value: '}' }
])

assert.deepEqual(lexer('<div><%- translate("foo") %></div>'), [
  { type: 'string', value: '<div>' },
  { type: 'escape', value: 'translate("foo")'},
  { type: 'string', value: '</div>' }
])

assert.deepEqual(lexer('<button <%= foo() %> <%= bar() %>><%= baz() %></button>'), [
  { type: 'string', value: '<button ' },
  { type: 'interpolate', value: 'foo()' },
  { type: 'string', value: ' ' },
  { type: 'interpolate', value: 'bar()' },
  { type: 'string', value: '>' },
  { type: 'interpolate', value: 'baz()' },
  { type: 'string', value: '</button>' }
])

assert.deepEqual(lexer('<input <% if (checked) { %>checked<% } %>>'), [
  { type: 'string', value: '<input ' },
  { type: 'evaluate', value: 'if (checked) {' },
  { type: 'string', value: 'checked' },
  { type: 'evaluate', value: '}' },
  { type: 'string', value: '>' }
])
