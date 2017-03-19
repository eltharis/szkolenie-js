describe('REST API promises', () => {

  it('handles getNationalities call', (done) => {
    // imagine, that API.getNationalities executes AJAX call to a REST API
    // that is asynchronously resolved with list of nationalities
    //
    // use API.getNationalities function to fetch data and make the `expect` call pass
    API.getNationalities().then((nationalities) => {
      expect(nationalities).toEqual(["US", "UK", "DE", "FR"])
      done();
    }).catch(error => console.log('error'));
  })

  it('handles getUser call', (done) => {
    // imagine, that API.getUser executes AJAX call to a REST API
    // that is asynchronously resolved with data of the user, given by id
    //
    // use API.getUser function to fetch appropriate user and make the `expect` call pass
    API.getUser(7344).then(user => {
      expect(user.name).toBe("Tiara Will")
      done();
    }).catch(error => console.log('error'));
    
  })

  it('handles getUsersByNationality call', (done) => {
    // imagine, that API.getUsersByNationality executes AJAX call to a REST API
    // that is asynchronously resolved with list of all users of a given nationality
    //
    // use API.getUsersByNationality function to fetch appropriate users and make the `expect` call pass
    const p1 = API.getUsersByNationality('UK');
    const p2 = API.getUsersByNationality('US');
    const p3 = API.getUsersByNationality('FR');
    const p4 = API.getUsersByNationality('DE');

    Promise.all([p1, p2, p3, p4]).then(values => {
      let [usersUK, usersUS, usersFR, usersDE] = values;
      expect(usersUK.length).toBe(30)
      expect(usersUS.length).toBe(25)
      expect(usersFR.length).toBe(24)
      expect(usersDE.length).toBe(39)
      done();
    });
  })

  it('should perform a simple business domain scenario', (done) => {
    // write a function which will calculate and return total salaries of users filtered by nationality

    function getTotalNationalSalary(nationality){
      return API.getUsersByNationality(nationality)
          .then(users => users.reduce((previous, actual) => { return previous + actual.salary; }, 0));
    }

    Promise.all([
      getTotalNationalSalary("UK"),
      getTotalNationalSalary("US"),
      getTotalNationalSalary("FR"),
      getTotalNationalSalary("DE")
    ]).then(salaries => {
      let [UK, US, FR, DE] = salaries
      expect(UK).toBe(163734)
      expect(US).toBe(147318)
      expect(FR).toBe(135974)
      expect(DE).toBe(229152)
      done();
    });
  })

  it('should perform a complex business domain scenario', (done) => {
    // similarly to the previous exercise write a function which will
    // calculate and return total salaries of users of all nationalities
    // available in the system
    // the response should be a map: { UK: amount, US: amount, ...}

    function getTotalSalariesByNationality(){
      const promises = [
        API.getUsersByNationality('UK'), 
        API.getUsersByNationality('US'), 
        API.getUsersByNationality('FR'), 
        API.getUsersByNationality('DE')
      ]
      return Promise.all(promises).then(results => {
        let [UK, US, FR, DE] = results.map(users => users.reduce((prev, act) => { return prev + act.salary; }, 0))
        return {UK, US, FR, DE};
      });
    }

    getTotalSalariesByNationality()
      .then(salaries => {
        let { US, UK, DE, FR } = salaries
        expect(UK).toBe(163734)
        expect(US).toBe(147318)
        expect(FR).toBe(135974)
        expect(DE).toBe(229152)
        done();
      });
  })
})
