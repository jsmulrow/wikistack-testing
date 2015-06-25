var chai = require('chai');
var expect = chai.expect;
var should = chai.should;
var spies = require('chai-spies');
chai.use(spies);

describe('Testing suite capabilities', function() {
	it('confirms basic math', function() {
		expect(2 + 2).to.equal(4);
	});
	it('waits for the right amount of time', function(done) {
		setTimeout(function() {
			done();
		}, 200);
	});
	// it('confirms setTimeout\'s timer accuracy', function (done) {
	//     var start = new Date();
	//     setTimeout(function () {
	//         var duration = new Date() - start;
	//         expect(duration).to.be.closeTo(1000, 50);
	//         done();
	//     }, 1000);
	// });
	it('uses forEach correctly', function() {
		var func = function() {return 2};
		var spy = chai.spy(func);
		for (var i = 0; i < 10; i++) {
			spy();
		}
		expect(spy).to.have.been.called.exactly(10);
	});
	// it('uses forEach correctly', function() {
	// 	var arr = ['x', 'y', 'z'];
	// 	function func(val, idx) {
	// 		console.log(val, idx);
	// 	}
	// 	var spy = chai.spy(func);
	// 	arr.forEach(spy);
	// 	expect(spy).to.have.been.called.exactly(arr.length);
	// });
	
});
