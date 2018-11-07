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
<div><% foo %><%- bar %><%= baz %><%_ biz %><%# boss %></div>
```

```js
[
  { type: 'string', value: '<div>' },
  { type: 'evaluate', value: 'foo' },
  { type: 'escape', value: 'bar' },
  { type: 'interpolate', value: 'baz' },
  { type: 'slurp', value: 'biz' },
  { type: 'comment', value: 'boss' },
  { type: 'string', value: '</div>'}
]
```

There are six types: `string`, `evaluate`, `escape`, `interpolate`, `slurp` and `comment`. The value of the ejs specific types is trimmed.


## License

MIT
