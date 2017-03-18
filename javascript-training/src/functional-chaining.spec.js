describe('Functional programming', function(){

	var list3 = [3, 6, 12, 24, 36, 39, 51, 63];
	var list5 = [5, 15, 30, 40, 45, 55, 105];

	it('with mapping', function(){
		// use .map function on arrays to make tests pass
		// define multiplyBy3 and multiplyBy5 functions
		// and use them along with .map

		// code should look like: collection.map(fn)

		var multiplyBy3 = function(el) { return el*3; };
		var multiplyBy5 = function(el) { return el*5; };
		var list3times3 = list3.map(multiplyBy3);
		var list5times5 = list5.map(multiplyBy5);

		expect(typeof multiplyBy3).toEqual("function");
		expect(multiplyBy3.length).toEqual(1);
		expect(multiplyBy3(3)).toEqual(9);
		expect(typeof multiplyBy5).toEqual("function");
		expect(multiplyBy5.length).toEqual(1);
		expect(multiplyBy5(5)).toEqual(25);
		expect(list3times3).toEqual([9, 18, 36, 72, 108, 117, 153, 189]);
		expect(list5times5).toEqual([25, 75, 150, 200, 225, 275, 525]);
	});

	it('with filtering', function(){
		// reuse functions from previous exercise

		// reuse multiplyBy3 and multiplyBy5 functions from above within .map
		// additionally, define isEven function that returns boolean whether a number is even
		// use it to filter only even numbers (remainder of dividing by 2 is 0) from result arrays

		// code should look like: collection.map(fn).filter(fn)

		var multiplyBy3 = function(el) { return el*3; };; // reuse
		var multiplyBy5 = function(el) { return el*5; };; // reuse
		var isEven = function(el) { return el%2 === 0; };
		var list3times3filteredEven = list3.filter(isEven).map(multiplyBy3);
		var list5times5filteredEven = list5.filter(isEven).map(multiplyBy5);

		expect(typeof isEven).toEqual("function");
		expect(isEven.length).toEqual(1);
		expect(isEven(2016)).toEqual(true);
		expect(isEven(2017)).toEqual(false);
		expect(list3times3filteredEven).toEqual([18, 36, 72, 108]);
		expect(list5times5filteredEven).toEqual([150, 200]);
	});

	it('with reducing', function(){
		// again, reuse functions from previous exercise
		// reuse multiplyBy3, multiplyBy5 and isEven functions from above
		// additionally, define sum function that will reduce a list into a single value
		// use the sum function to sum the lists of multiplied-and-then-filtered elements

		// code should look like: collection.map(fn).filter(fn).reduce(fn)

		var multiplyBy3 = function(el) { return el*3; };; // reuse
		var multiplyBy5 = function(el) { return el*5; };; // reuse
		var isEven = function(el) { return el%2 === 0; };
		var sum = function(a, b) { return a + b; };
		var list3times3filteredEvenSum = list3.filter(isEven).map(multiplyBy3).reduce(sum, 0);
		var list5times5filteredEvenSum = list5.filter(isEven).map(multiplyBy5).reduce(sum, 0);

		expect(typeof sum).toEqual("function");
		expect(sum.length).toEqual(2);
		expect(sum(2016, 2017)).toEqual(4033);
		expect(list3times3filteredEvenSum).toEqual(234);
		expect(list5times5filteredEvenSum).toEqual(350);
	});

	it('sequentially processing via function pipe', function(){
		// start - is a starting value
		// operations - is a sequence of operations, output of step n is an input of step n+1
		// write the execute function which accepts function sequence and the starting value
		// and returns the value processed by piping via function sequence

		// don't use FOR loops, use functional programming

		// function execute...
		function execute(operations, start) {
			// var result = start;
			// operations.forEach(function(el) { result = el(result); });
			// return result;
			return operations.reduce(function(value, func) { return func(value); }, start);
		}
		var start = 2;
		var operations = [
			function(a){ return 8 * a - 10; },
			function(a){ return (a - 3) * (a - 3) * (a - 3); },
			function(a){ return a * a + 4; },
			function(a){ return a % 5; }
		];
		var result = execute(operations, start);
		expect(result).toEqual(3);
	});
});
