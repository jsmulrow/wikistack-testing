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
        });
        it('should err without body', function(done) {
        	page.validate(function(err) {
        		expect(err.errors).to.have.property('content');
        		done();
        	});
        });
    });

    describe('Statics', function() {
        describe('findBytag', function() {
        	beforeEach(function(done) {
        		Page.create({
        			title: 'foo',
        			content: 'bar',
        			tags: 'one, two, three'
        		}, function(err, data){
                    done();
                });
        	});
            afterEach(function(done){
                Page.remove({title: "foo"}, function(err, data){
                    done();
                });
            });
            it('should get pages with the search tag', function(done) {
            	Page.findByTag(['two'], function(err, resultPages) {
            		expect(resultPages[0].title).to.equal('foo');
            		done();
            	});
            });
            it('should not get pages without the search tag', function(done) {
                Page.findByTag(['two'], function(err, resultPages) {
                    resultPages.forEach(function(element){
                        expect(element.tags.indexOf('two')).to.not.equal(-1);
                    });
                    done();
                });
            });
        });
    });

    describe('Methods', function() {

        describe('computeUrlName', function() {
            it('should convert non-word-like chars to underscores', function(done) {
                Page.create({title: "two words", content:" blah balh"}, function(err, data){
                    expect(data.url_name).to.equal("two_words");
                    done();
                });
                
            });
        });
        describe('getSimilar', function() {
            beforeEach(function(done) {
                Page.create({
                    title: 'foo',
                    content: 'bar',
                    tags: 'two, three'
                }).then(function(data){
                    return Page.create({
                        title: 'foocheese',
                        content: 'bar',
                        tags: 'three'
                    });
                }).then(function(data){
                    return Page.create({
                        title: 'foocarrot',
                        content: 'bar',
                        tags: 'one'
                    });
                }).then(function(data){
                    done();
                });
            });
            afterEach(function(done){
                Page.remove({title: {$in: ["foo", "foocheese", "foocarrot"]}}, function(err, data){
                    done();
                });
            });
            it('should never get itself', function(done) {
                Page.getSimilar("foo", ["two", "three"], function(err, pages){
                    expect(pages.every(function(element){ return element.title != "foo"; })).to.be.true;
                    done();
                });
                
            });
            it('should get other pages with any common tags', function(done) {
                Page.getSimilar("foo", ["two", "three"], function(err, pages){
                    expect(pages.length).to.equal(1);
                    done();
                })
            });
            it('should not get other pages without any common tags', function(done) {
                Page.getSimilar("foo", ["two", "three"], function(err, pages){
                    expect(pages.every(function(element){ return element.title !== "foocarrot"; })).to.be.true;
                    done();
                })
            });
        });
    });

    describe('Virtuals', function() {
        describe('full_route', function() {
            var page;
            beforeEach(function(done){
                page = new Page({
                    title: 'dumb cheese',
                    content: 'bar',
                    tags: 'two, three'
                });
                page.save(function(err){
                    done();
                });
            });
            afterEach(function(done){
                Page.remove({title: {$in: ["foo cheese", "dumb cheese"]}}, function(err, data){
                    done();
                });
            });
            it('should return the url_name prepended by "/wiki/"', function(done) {
                expect(page.full_route).to.equal("/wiki/dumb_cheese");
                done();
            });
        });
    });

    describe('Hooks', function() {
        it('should call computeUrlName before save', function() {
            // chai.spy.on(models, "compute");

            // expect(spy).to.have.been.called();
        });
    });
})