describe('promises', () => {

  it('can be chained', (done) => {
    // specify thenable functions to make expectations pass
    let p1 = Promise.resolve(3)
    let p2 = p1.then((result) => [result, Math.pow(result, 2), Math.pow(result, 3), Math.pow(result, 4)])
    let p3 = p2.then((result) => result.slice(0, 2).map(el => el * 10));

    p1.then(result => expect(result).toEqual(3))
    p2.then(result => expect(result).toEqual([3, 9, 27, 81]))
    p3.then(result => expect(result).toEqual([30, 90]))

    Promise.all([p1, p2, p3]).then(done)
  })

})
