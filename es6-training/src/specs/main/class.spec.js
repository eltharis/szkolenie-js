fdescribe('class', () => {

  it('has a constructor for initialization', () => {
    // Create a Musician class
    // Add a constructor that takes one param, the instrument.
    // Set this.instrument to the instrument passed in

    class Musician {
      constructor(instrument) {
        this.instrument = instrument;
      }
    }

    const musician = new Musician()
    const ringo = new Musician('drums')

    expect(musician.instrument).toBeUndefined()
    expect(ringo.instrument).toBe('drums')
  })

  it('constructor can have default param values', () => {
    // Create a Musician class with a constructor
    // Make your class default (using default params) the instrument to 'guitar'

    class Musician {
      constructor(instrument = 'guitar') {
        this.instrument = instrument;
      }
    }

    const john = new Musician()
    const ringo = new Musician('drums')

    expect(john.instrument).toBe('guitar')
    expect(ringo.instrument).toBe('drums')
  })

  it('can have instance methods', () => {
    // Create a Musician class, pass in the instrument to the constructor, and add a play function to the class definition
    class Musician {
      constructor(instrument = 'drums') {
        this.instrument = instrument;
      }

      play() {
        return `I'm playing ${this.instrument}`;
      }
    }
    const musician = new Musician()

    expect(musician.play).toBeDefined()
    expect(Musician.play).toBeUndefined()
    expect(musician.play()).toBe("I'm playing drums")
  })

  it('can have static methods', () => {
    // Create a Musician class, pass in the instrument to the constructor,
    // and add a create method that takes an instrument and returns an instance

    class Musician {
      constructor(instrument) {
        this.instrument = instrument;
      }

      static create(instrument) {
        return Musician(instrument);
      }
    }

    const musician = new Musician()

    expect(musician.create).toBeUndefined()
    expect(Musician.create).toBeDefined()
  })

  it('can extend another class', () => {
    // Create a Musician class
    // Create a Rockman class that extends Musician
    // Add play method to Musician
    class Musician {
      constructor(instrument = 'drums') {
        this.instrument = instrument;
      }

      play() {
        return `I'm playing ${this.instrument}`;
      }
    }

    class Rockman extends Musician {
      constructor(instrument = 'guitar') {
        super(instrument);
      }
    }

    const rockman = new Rockman()

    expect(rockman instanceof Rockman).toBe(true)
    expect(rockman instanceof Musician).toBe(true)
    expect(rockman.play()).toBe("I'm playing guitar")
  })

  it('can use property setters and getters', () => {
    // Create a Musician class, pass in the instrument to the constructor,
    // Add property getter for description

    class Musician {
      constructor(instrument) {
        this.instrument = instrument;
      }

      get description() {
        return `this musician plays ${this.instrument}`;
      }
    }

    const guitarist = new Musician('guitar')
    const drummer = new Musician('drums')

    expect(guitarist.description).toBe('this musician plays guitar')
    expect(drummer.description).toBe('this musician plays drums')
  })

  it('can use property setters and getters', () => {
    // Create a Musician class
    // Add property getter for allBands
    // - it will return a string describing all the bands that this musician played in
    // Add property setter for band
    // - it will add this band to the list of musician's bands'. How to store them?

    class Musician {
      constructor() {
        this.bands = [];
      }

      set band(name) {
        this.bands.push(name);
      }

      get allBands() {
        return `this musician played in ${this.bands.join(', ')}`;
      }
    }

    const musician = new Musician()

    musician.band = 'ABBA'
    expect(musician.allBands).toBe('this musician played in ABBA')
    musician.band = 'Rolling Stones'
    expect(musician.allBands).toBe('this musician played in ABBA, Rolling Stones')
    musician.band = 'Iron Maiden'
    expect(musician.allBands).toBe('this musician played in ABBA, Rolling Stones, Iron Maiden')
  })
})
