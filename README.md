# ejs-lexer

## Installation

```
npm install @buxlabs/ejs-lexer
```

## Usage

```js
const lexer = require('@buxlabs/ejs-lexer')
const tokens = lexer('<div><%- foo %></div>')
console.log(tokens)
```

## How does it work?

It translates a string into an array of tokens with type and value

```html
<div><% foo %><%- bar %><%= baz %></div>
```

```js
[
  { type: 'string', value: '<div>' },
  { type: 'evaluate', value: 'foo' },
  { type: 'escape', value: 'bar' },
  { type: 'interpolate', value: 'baz' },
  { type: 'string', value: '</div>'}
]
```

There are four types: `string`, `evaluate`, `escape` and `interpolate`. The value of the ejs specific types is trimmed.
