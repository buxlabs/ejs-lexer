const assert = require('assert')
const tokenize = require('.')

assert.deepEqual(tokenize('hello'), [
  { type: 'string', value: 'hello' }
])

assert.deepEqual(tokenize('<div></div>'), [
  { type: 'string', value: '<div></div>' }
])

assert.deepEqual(tokenize('<% console.log(foo) %>'), [
  { type: 'evaluate', value: 'console.log(foo)' }
])

assert.deepEqual(tokenize('<%console.log(foo)%>'), [
  { type: 'evaluate', value: 'console.log(foo)' }
])

assert.deepEqual(tokenize('<%   console.log(foo)   %>'), [
  { type: 'evaluate', value: 'console.log(foo)' }
])

assert.deepEqual(tokenize('<%- foo %>'), [
  { type: 'escape', value: 'foo' }
])

assert.deepEqual(tokenize('<%-foo%>'), [
  { type: 'escape', value: 'foo' }
])

assert.deepEqual(tokenize('<%-    foo     %>'), [
  { type: 'escape', value: 'foo' }
])

assert.deepEqual(tokenize('<%= bar %>'), [
  { type: 'interpolate', value: 'bar' }
])

assert.deepEqual(tokenize('<%_ bar %>'), [
  { type: 'slurp', value: 'bar' }
])

assert.deepEqual(tokenize('<%# bar %>'), [
  { type: 'comment', value: 'bar' }
])

assert.deepEqual(tokenize('<%=bar%>'), [
  { type: 'interpolate', value: 'bar' }
])

assert.deepEqual(tokenize('<%=     bar     %>'), [
  { type: 'interpolate', value: 'bar' }
])

assert.deepEqual(tokenize('<div><%- foo %></div>'), [
  { type: 'string', value: '<div>' },
  { type: 'escape', value: 'foo' },
  { type: 'string', value: '</div>' }
])

assert.deepEqual(tokenize('<div data-foo="<%- bar %>">baz</div>'), [
  { type: 'string', value: '<div data-foo="' },
  { type: 'escape', value: 'bar' },
  { type: 'string', value: '">baz</div>' }
])

assert.deepEqual(tokenize('<% if (hello) { %><div>foo</div><% } %>'), [
  { type: 'evaluate', value: 'if (hello) {' },
  { type: 'string', value: '<div>foo</div>' },
  { type: 'evaluate', value: '}' }
])

assert.deepEqual(tokenize('<div><%- translate("foo") %></div>'), [
  { type: 'string', value: '<div>' },
  { type: 'escape', value: 'translate("foo")'},
  { type: 'string', value: '</div>' }
])

assert.deepEqual(tokenize('<button <%= foo() %> <%= bar() %>><%= baz() %></button>'), [
  { type: 'string', value: '<button ' },
  { type: 'interpolate', value: 'foo()' },
  { type: 'string', value: ' ' },
  { type: 'interpolate', value: 'bar()' },
  { type: 'string', value: '>' },
  { type: 'interpolate', value: 'baz()' },
  { type: 'string', value: '</button>' }
])

assert.deepEqual(tokenize('<input <% if (checked) { %>checked<% } %>>'), [
  { type: 'string', value: '<input ' },
  { type: 'evaluate', value: 'if (checked) {' },
  { type: 'string', value: 'checked' },
  { type: 'evaluate', value: '}' },
  { type: 'string', value: '>' }
])
