# ejs-lexer

![npm (scoped)](https://img.shields.io/npm/v/@buxlabs/ejs-lexer.svg)

> ejs lexer written in javascript

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Background

The library translates a string into an array of tokens with type and value

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

## Install

```
npm install @buxlabs/ejs-lexer
```

## Usage

```js
const lexer = require('@buxlabs/ejs-lexer')
const tokens = lexer('<div><%- foo %></div>')
console.log(tokens)
```

## Maintainers

[@emilos](https://github.com/emilos).

## Contributing

All contributions are highly appreciated! [Open an issue](https://github.com/buxlabs/ejs-lexer/issues/new) or a submit PR.

## License

MIT © buxlabs
