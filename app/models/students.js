'use strict';

var _ = require('lodash');
var Mongo = require('mongodb');

function Student(s){
  this.name = s.name;
  this.color = s.color;

  this.tests = [];
  this.isSuspended = false;
}

Object.defineProperty(Student, 'collection', {
  get: function(){return global.mongodb.collection('students');}
});

Student.prototype.save = function(cb){
  Student.collection.save(this, cb);
};

Student.all = function(cb){
  Student.collection.find().toArray(function(err, objects){
    var students = objects.map(function(s){
      return changePrototype(s);
    });
    cb(students);
  });
};

Student.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Student.collection.findOne({_id:_id}, function(err,obj){
    var student = changePrototype(obj);

    cb(student);
  });
};

Student.deleteById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Student.collection.findAndRemove({_id:_id}, cb);
};

Student.prototype.avg = function(cb){
  var avg = 0;
  for(var i = 0; i < this.tests.length; i++){
      avg += parseInt(this.tests[i]);
    }
    avg = avg / this.tests.length;
    return parseFloat(avg);
};

Student.prototype.grade = function(cb){
  var grade = '';

  if(this.avg() >= 90){
    grade = 'A';
  }else if(this.avg() >= 80 && this.avg() <= 89){
    grade = 'B';
  }else if(this.avg() >= 70 && this.avg() <= 79){
    grade = 'C';
  }else if(this.avg() >= 60 && this.avg() <= 69){
    grade = 'D';
  }else{
    grade = 'F';
  }
  return grade;
};

module.exports = Student;

// PRIVATE FUNCTIONS ///

function changePrototype(obj){
  var student = _.create(Student.prototype, obj);
  return student;
}
