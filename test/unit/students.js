/* jshint expr:true */
/* global describe, it, before, beforeEach */
/*
'use strict';

var expect = require('chai').expect;
var Student = require('../../app/models/students');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
//declares global variables//
var st1, st2, st3;

describe('Student', function(){
  //before running any test, connect to mongodb//
  before(function(done){
    dbConnect('grader-test', function(){
      done();
    });
  });
  // removes all ojects and creates global objects (students) for all tests//
  beforeEach(function(done){
    Student.collection.remove(function(){
      var s1 = {name:'Will', color: 'red'};
      var s2 = {name:'Sarah', color: 'pink'};
      var s3 = {name:'Kim Jong Un', color: 'brown'};

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
  // creates a new student //
  describe('constructor', function(){
    it('should create a new Student', function(){
      var s = {name:'Dan', color: 'white'};
      var dan = new Student(s);

      expect(dan).to.be.instanceof(Student);
      expect(dan.name).to.equal('Dan');
      expect(dan.color).to.equal('white');
    });
  });
  //saves to mongodb //
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
  // finds all students in the class //
  describe('.all', function(){
    it('Should find all the Students in the database', function(done){
      Student.all(function(students){
        expect(students).to.have.length(3);
        done();
      });
    });
  });
  // finds a student by their name //
  describe('.findById', function(){
    it('Should find a student by ID', function(done){
      Student.findById(st1._id.toString(), function(student){
        expect(st1.name).to.equal('Will');
        done();
      });
    });
  });
  // deletes a student //
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
  //determines the average grade of all tests//
  describe('#avg', function(){
    it('Should find the average of the student\'s test grades', function(done){
      var s1 = {name:'Dan', color: 'white'};
      var s = new Student(s1);
      s.tests.push('95', '70', '80', '97');
      var avg = s.avg();

      expect(avg).to.be.closeTo(83, 86);
      expect(s.name).to.equal('Dan');
      expect(s.color).to.equal('white');
      done();
    });
  });
  //assigns a letter grade to the student's average//
  describe('#grade', function(){
    it('It should show the grade', function(done){
      var s1 = {name:'Dan', color: 'white'};
      var s = new Student(s1);
      s.tests.push('95', '70', '80', '97');
      var grade = s.grade();

    expect(grade).to.equal('B');
    done();
  });
});

  describe('#addTest', function(){
    it('should add a test to the test array', function(done){
      Student.findById(st1._id.toString(), function(student){
        student.addTest(95);
        student.save(function(){
      
        expect(student.tests).to.have.length(1);
        done();
        });
      });
    });
  });

  describe('.suspend', function(){
    it('This should not suspend student', function(){
      var s1 = {name:'Dan', color:'White', suspended:'false'};
      var s = new Student(s1);

      expect(s.name).to.equal('Dan');
      expect(s.color).to.equal('White');
      expect(s.isSuspended).to.be(false);
    });
  });
});
*/


'use strict';

var expect = require('chai').expect;
var Student = require('../../app/models/student');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var s1;

describe('Student', function(){
  before(function(done){
    dbConnect('grader-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Student.collection.remove(function(){
      var o = {name:'Sara', color:'purple'};
      s1 = new Student(o);
      s1.insert(function(){
        done();
      });
    });
  });

  describe('constructor', function(){
    it('should create a new Student object', function(){
      var o = {name:'Bob', color:'pink'};
      var bob = new Student(o);

      expect(bob).to.be.instanceof(Student);
      expect(bob.name).to.equal('Bob');
      expect(bob.color).to.equal('pink');
      expect(bob.tests).to.have.length(0);
    });
  });

  describe('#insert', function(){
    it('should insert a student', function(done){
      var o = {name:'Bob', color:'pink'};
      var bob = new Student(o);
      bob.insert(function(){
        expect(bob._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('#addTest', function(){
    it('should add a test to a student', function(done){
      var o = {name:'Bob', color:'pink'};
      var bob = new Student(o);
      bob.insert(function(){
        bob.addTest(89, function(){
          expect(bob.tests).to.have.length(1);
          done();
        });
      });
    });
  });

  describe('-#average', function(){
    it('should compute average', function(){
      var o = {name:'Bob', color:'pink'};
      var bob = new Student(o);
      bob.tests.push(55, 89, 101, 34, 75);
      expect(bob.average).to.be.closeTo(70.8, 0.1);
    });
  });

  describe('-#letter', function(){
    it('should compute letter', function(){
      var o = {name:'Bob', color:'pink'};
      var bob = new Student(o);
      bob.tests.push(55, 89, 101, 34, 75);
      expect(bob.letter).to.equal('C');
    });
  });

  describe('-#isSuspended', function(){
    it('should not be suspended', function(){
      var o = {name:'Bob', color:'pink'};
      var bob = new Student(o);
      bob.tests.push(55, 89, 101, 34, 75);
      expect(bob.isSuspended).to.be.false;
    });

    it('should be suspended', function(){
      var o = {name:'Bob', color:'pink'};
      var bob = new Student(o);
      bob.tests.push(55, 40, 101, 34, 75);
      expect(bob.isSuspended).to.be.true;
    });
  });

  describe('-#isHonorRoll', function(){
    it('should not be on honor roll', function(){
      var o = {name:'Bob', color:'pink'};
      var bob = new Student(o);
      bob.tests.push(55, 40, 101, 34, 75);
      expect(bob.isHonorRoll).to.be.false;
    });

    it('should be on honor roll', function(){
      var o = {name:'Bob', color:'pink'};
      var bob = new Student(o);
      bob.tests.push(95, 89, 101, 94, 97);
      expect(bob.isHonorRoll).to.be.true;
    });
  });

  describe('.all', function(){
    it('should get all students from database', function(done){
      Student.all(function(students){
        expect(students).to.have.length(1);
        expect(students[0]).to.be.instanceof(Student);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a student by its id', function(done){
      Student.findById(s1._id.toString(), function(student){
        expect(student.name).to.equal('Sara');
        expect(student).to.be.instanceof(Student);
        done();
      });
    });
  });
});
