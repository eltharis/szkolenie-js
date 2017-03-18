fdescribe('arrow functions', () => {

    it('can replace simple traditional functions', () => {
        // Write two functions that take two parameters and return their sum
        // 'fnAdd' - as a regular function
        // 'arrowAdd' - as an arrow function

        let fnAdd, arrowAdd;
        fnAdd = function(a, b) { return a + b; };
        arrowAdd = (a, b) => a + b;

        expect(fnAdd.length).toBe(2);
        expect(arrowAdd.length).toBe(2);
        expect(fnAdd(3, 3)).toBe(arrowAdd(3, 3));
    });

    describe('are great for defining simple calculations', () => {
        // Write following lambda functions, performing subtraction, multiplication and division

        let arrowSub, arrowMul, arrowDiv;
        
        arrowSub = (a, b) => a - b;
        arrowMul = (a, b) => a * b;
        arrowDiv = (a, b) => b !== 0 ? a / b : 0;

        it('subtracts numbers correctly', () => {
            expect(arrowSub(20, -15)).toEqual(35)
            expect(arrowSub.length).toBe(2);
        })

        it('multiplies numbers correctly', () => {
            expect(arrowMul(10.2, 5)).toEqual(51)
            expect(arrowMul.length).toBe(2);
        })

        it('divides numbers correctly', () => {
            expect(arrowDiv(546, 39)).toEqual(14)
            expect(arrowDiv.length).toBe(2);
        })
    })

    fit('can replace complex traditional functions', () => {
        // Write two functions that implement Fibonacci sequence
        // 'fnFib' - as a regular function
        // 'arrowFib' - as an arrow function, try NOT to use curly brackets {}
        // Fibonacci sequence:
        // 0, for x = 0
        // 1, for x = 1
        // fib(x-1) + fib(x-2), for x > 1

        let fnFib, arrowFib;

        fnFib = function(n) {
            let [prev, act] = [0, 1];
            while(n--) { [prev, act] = [act, prev + act]; }
            return prev;
        }

        arrowFib = n => n <= 1 ? n : arrowFib(n-1) + arrowFib(n-2);

        // arrowFib = n => {
        //     let tmp, prev = 0, act = 1;
        //     for(let i = 0; i < n; i++) {
        //         var [act, prev] = [act+prev, act];
        //         tmp = act;
        //         act += prev;
        //         prev = tmp;
        //     }
        //     return prev;
        // }

        [fnFib, arrowFib].forEach(function(fn){
            expect(fn(0)).toBe(0);
            expect(fn(1)).toBe(1);
            expect(fn(5)).toBe(5);
            expect(fn(10)).toBe(55);
            expect(fn(15)).toBe(610);
        });
        expect(fnFib.length).toBe(1);
        expect(arrowFib.length).toBe(1);
    });

  it('binds `this` to the eval scope, not the runtime scope', () => {
    // console.log is being spied not to pollute output for other tests
    spyOn(console, 'log');

    // Change the person object.
    // One of the functions should become an arrow to allow for 'this' to retain context correctly
    const person = {
      name: 'Jarosław',
      greetFriends: function(friends) {
        friends.forEach(friend => {
          console.log(this.name + ' greets to ' + friend)
        })
      },
    }

    const friendsArray = ['Antoni', 'Andrzej', 'Krystyna', 'Wiktor']

    expect(() => person.greetFriends(friendsArray)).not.toThrow()
    expect(console.log).toHaveBeenCalledWith('Jarosław greets to Antoni');
    expect(console.log).toHaveBeenCalledWith('Jarosław greets to Andrzej');
    expect(console.log).toHaveBeenCalledWith('Jarosław greets to Krystyna');
    expect(console.log).toHaveBeenCalledWith('Jarosław greets to Wiktor');
  })

})
