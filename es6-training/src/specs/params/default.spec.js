describe('default parameters', () => {

  it('can be triggered when the incoming argument is undefined', () => {
    function shoot(name = 'Steve') {
      return name
    }

    expect(shoot('Chris')).toBe('Chris')
    expect(shoot(undefined)).toBe('Steve')
    expect(shoot(null)).toBe(null)
    expect(shoot()).toBe('Steve')
  })

  it('are not included in arguments', () => {
    function shoot(name = 'Steve') {
      return arguments.length
    }

    expect(shoot('Chris')).toBe(1)
    expect(shoot(null)).toBe(1)
    expect(shoot()).toBe(0)
  })

  it('can trigger a function call', () => {
    let triggerCount = 0

    function shoot(name = getDefault()) {
      return name
    }

    function getDefault() {
      triggerCount++
      return 'Steve'
    }

    expect(triggerCount).toBe(0)
    expect(shoot('Chris')).toBe('Chris')
    expect(shoot()).toBe('Steve')
    expect(shoot(undefined)).toBe('Steve')
    expect(triggerCount).toBe(2)
  })

})
