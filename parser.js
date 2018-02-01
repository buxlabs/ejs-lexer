module.exports = function () {
  return {
    type: '+',
    left: {
      type: '/',
      left: { type: 'number', value: 12 },
      right: { type: 'number', value: 4 }
    },
    right: { type: 'number', value: 6}
  }
}