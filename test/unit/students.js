/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Student = require('../../app/models/students');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

var st1, st2, st3;

describe('Student', function() {
  before(function(done){
    dbConnect('grader-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Student.collection.remove(function(){
      var s1 = {name:'Will', color: 'red'};
      var s2 = {name:'Sarah', color: 'pink'};
      var s3 = {name:'Kim yun un', color: 'yellow'};

      st1 = new Student(s1);
      st2 = new Student(s2);
      st3 = new Student(s3);

      st1.save(function(){
        st2.save(function(){
          st3.save(function(){
          done();
          });
        });
      });
    });
  });

  describe('constructor', function(){
    it('should create a new Student', function(){
      var s = {name:'Dan', color: 'white'};
      var dan = new Student(s);

      expect(dan).to.be.instanceof(Student);
      expect(dan.name).to.equal('Dan');
      expect(dan.color).to.equal('white');
    });
  });
  describe('#save', function(){
    it('should save a student to the database', function(done){
      var s = {name:'Dan', color: 'white'};
      var dan = new Student(s);
      dan.save(function(){
        expect(dan._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('Should find all the Students in the database', function(done){
      Student.all(function(students){
        expect(students).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('Should find a student by ID', function(done){
      Student.findById(st1._id.toString(), function(student){
        expect(st1.name).to.equal('Will');
        done();
      });
    });
  });

  describe('.deleteById', function(){
    it('Should Delete a student', function(done){
      Student.deleteById(st1._id.toString(), function(){
        Student.all(function(students){
          expect(students).to.have.length(2);
          done();
        });
      });
    });
  });

  describe('#avg', function(){
    it('Should find the average of the student\'s test grades', function(){
      var s1 = {name:'Dan', color: 'white'};
      var s = new Student(s1);
      s.tests.push('95', '70', '80', '97');
      var avg = s.avg();

      expect(avg).to.be.closeTo(83, 86);
      expect(s.name).to.equal('Dan');
      expect(s.color).to.equal('white');
    });
  });

  describe('#grade', function(){
    it('It should show the grade', function(){
      var s1 = {name:'Dan', color: 'white'};
      var s = new Student(s1);
      s.tests.push('95', '70', '80', '97');
      var grade = s.grade();

    expect(grade).to.equal('B');
  });
});

/*
  describe('.suspend', function(){
    it('This should not suspend student', function(){
      var s1 = {name:'Dan', color:'White', suspended:'false'};
      var s = new Student(s1);

      expect(s.name).to.equal('Dan');
      expect(s.color).to.equal('White');
      expect(s.isSuspended).to.be(false);
    });
  });*/
});
