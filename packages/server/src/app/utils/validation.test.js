const { isNumber } = require('./validation')

describe('Validation', () => {
  it('should validate a number', () => {
    expect(isNumber(undefined)).toEqual(false)
    expect(isNumber(null)).toEqual(false)
    expect(isNumber(false)).toEqual(false)
    expect(isNumber(true)).toEqual(false)
    expect(isNumber('')).toEqual(false)
    expect(isNumber('asd')).toEqual(false)
    expect(isNumber({})).toEqual(false)
    expect(isNumber('1da')).toEqual(false)

    expect(isNumber('1')).toEqual(true)
    expect(isNumber(1)).toEqual(true)
  })
})
