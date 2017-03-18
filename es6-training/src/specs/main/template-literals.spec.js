describe('Template literals', () => {

  it('should support string interpolation', () => {
    const person = {
      name: 'Jarosław',
      friends: [
        'Antoni',
        'Andrzej',
        'Krystyna',
        'Wiktor',
      ],
    }
    // construct a string using template literal string interpolation
    const personsFriends = `${person.name} has 4 friends: ${person.friends.join(', ')}`

    expect(personsFriends).toBe(
      'Jarosław has 4 friends: Antoni, Andrzej, Krystyna, Wiktor'
    )
  })

  it('should support multi-line strings', () => {
    // construct a string with multiple lines without needing escaped newline characters
    const multiLine = `
    Oh
    my
    dear
    so much fun!`

    expect(multiLine).toBe('\n    Oh\n    my\n    dear\n    so much fun!')
  })

  it('should support string escaping', () => {
    // escape a string in a template literal for each of these
    expect(`Hi
there!`).toBe('Hi\nthere!')
    expect(`This is \`escaped\` backtics`).toBe('This is `escaped` backtics')
  })

  // you likely wont often use tagging, but it can be handy!
  it('should call the tagging function', () => {
    const noun = 'World'
    const emotion = 'happy'
    const result = tagIt`Hello ${noun}! Are you feeling ${emotion} today?`
    expect(result).toBe('Hello super-cool World! Are you feeling really happy today?')

    function tagIt(literalString, ...interpolatedParts) {
      // implement this function to make the test pass
      return literalString[0] + 'super-cool ' + interpolatedParts[0] + literalString[1] + 'really ' + interpolatedParts[1] + literalString[2] ;
    }
  })

  it('can be curried', () => {
    // Using tagged template strings, write journey function
    // that will accept following 3 template strings
    // and return a string describing the journey
    let journey =
      a =>
        b =>
          c => `${a}, then ${b} and finally ${c}!`;

    expect(journey `Warsaw` `Poznan` `Berlin`).toBe('Warsaw, then Poznan and finally Berlin!')
    expect(journey `Poland` `Czech` `Austria`).toBe('Poland, then Czech and finally Austria!')
    expect(journey `Europe` `Asia` `Australia`).toBe('Europe, then Asia and finally Australia!')
  })

})
