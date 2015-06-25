var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

var models = require('../models');
var Page = models.Page;

describe('Page Model', function() {

    describe('Validations', function() {

    	var page;
    	beforeEach(function() {
    		page = new Page();
    	});
        it('should err without title', function(done) {
        	page.validate(function(err) {
        		expect(err.errors).to.have.property('title');
        		done();
        	});
        });
        it('should err with title of zero length', function(done) {
        	page.validate(function(err) {
        		expect(err.errors).to.have.property('title');
        		done();
        	});
        })
        it('should err without body', function(done) {
        	page.validate(function(err) {
        		expect(err.errors).to.have.property('content');
        		done();
        	});
        })
    })

    describe('Statics', function() {
        describe('findBytag', function() {
        	beforeEach(function(done) {
        		page = Page.create({
        			title: 'foo',
        			body: 'bar',
        			tags: ['one', 'two', 'three']
        		}, done);
        	})
            it('should get pages with the search tag', function(done) {
            	page.findByTag('two', function(resultPage) {
            		expect(resultPage.title).to.be('foo');
            		done();
            	});
            })
            xit('should not get pages without the search tag', function() {})
        })
    })

    describe('Methods', function() {
        describe('computeUrlName', function() {
            xit('should convert non-word-like chars to underscores', function() {})
        })
        describe('getSimilar', function() {
            xit('should never get itself', function() {})
            xit('should get other pages with any common tags', function() {})
            xit('should not get other pages without any common tags', function() {})
        })
    })

    describe('Virtuals', function() {
        describe('full_route', function() {
            xit('should return the url_name prepended by "/wiki/"', function() {})
        })
    })

    describe('Hooks', function() {
        xit('should call computeUrlName before save', function() {})
    })

})