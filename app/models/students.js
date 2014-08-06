/*'use strict';

var _ = require('lodash');
var Mongo = require('mongodb');

function Student(s){
  this.name = s.name;
  this.color = s.color;

  this.tests = [];
}
//Getter//
Object.defineProperty(Student, 'collection', {
  get: function(){return global.mongodb.collection('students');}
});

// saves to mongodb//
/*Student.prototype.save = function(cb){
  Student.collection.save(this, cb);
};

//finds all students//
Student.all = function(cb){
  Student.collection.find().toArray(function(err, objects){
    var students = objects.map(function(s){
      return changePrototype(s);
    });
    cb(students);
  });
};

//finds student by id//
Student.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Student.collection.findOne({_id:_id}, function(err,obj){
    var student = changePrototype(obj);

    cb(student);
  });
};

// deletes student by id//
Student.deleteById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Student.collection.findAndRemove({_id:_id}, cb);
};

// gets the average for all tests in the tests array//

//Chyld's code to find average//
/* Object.defineProperty(Student.prototype, 'average', {
  get: function(){
    if(!this.tests.length){return 0;}

    var sum = this.tests.reduce(function(total, test){return total + test;});
    return (sum / this.tests.length);
  }
});



Student.prototype.avg = function(cb){
  var avg = 0;
  for(var i = 0; i < this.tests.length; i++){
      avg += parseInt(this.tests[i]);
    }
    avg = avg / this.tests.length;
    return parseFloat(avg);
};

// gets the letter grade based on the average of the test grades//
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

//Chyld's addTest code//
/* Student.prototype.addTest = function(score, cb){
  score = parseFloat(score);

  this.tests.push(score);
  Student.collection.update({_id:this._id}, {$push:{tests:score}}, cb);


//adds a test to the test array.//
Student.prototype.addTest = function(score){

  this.tests.push({grade: parseInt(score)});
};

module.exports = Student;

//is Suspended//
Object.definteProperty(Student.prototype, 'isSuspended', {
  get: function(){
    var failingTests = this.tests.filter(function(t){return t <-60;});
    return failingTests.length >= 3;
  }
});

// Honor Roll //
Object.defineProperty(Student.prototype, 'isHonorRoll', {
  get: function(){
  return this.average >= 95;
  }
});

//insert//
Student.prototype.insert = function(cb){
  Student.collection.save(this, cb);
};


// PRIVATE FUNCTIONS //

function changePrototype(obj){
  var student = _.create(Student.prototype, obj);
  return student;
}
*/

'use strict';

var Mongo = require('mongodb');
var _     = require('lodash');

function Student(o){
  this.name  = o.name;
  this.color = o.color;
  this.tests = [];
}

Object.defineProperty(Student, 'collection', {
  get: function(){return global.mongodb.collection('students');}
});

Object.defineProperty(Student.prototype, 'average', {
  get: function(){
    if(!this.tests.length){return 0;}

    var sum = this.tests.reduce(function(total, test){return total + test;});
    return (sum / this.tests.length);
  }
});

Object.defineProperty(Student.prototype, 'letter', {
  get: function(){
    var avg = this.average;

    if(avg >= 90){
      return 'A';
    }else if(avg >= 80){
      return 'B';
    }else if(avg >= 70){
      return 'C';
    }else if(avg >= 60){
      return 'D';
    }else{
      return 'F';
    }
  }
});

Object.defineProperty(Student.prototype, 'isSuspended', {
  get: function(){
    var failingTests = this.tests.filter(function(t){return t < 60;});
    return failingTests.length >= 3;
  }
});

Object.defineProperty(Student.prototype, 'isHonorRoll', {
  get: function(){
    return this.average >= 95;
  }
});

Student.prototype.insert = function(cb){
  Student.collection.save(this, cb);
};

Student.prototype.addTest = function(score, cb){
  score = parseFloat(score);

  this.tests.push(score);
  Student.collection.update({_id:this._id}, {$push:{tests:score}}, cb);
};

Student.all = function(cb){
  Student.collection.find().toArray(function(err, objects){
    var students = objects.map(function(o){
      return changePrototype(o);
    });

    cb(students);
  });
};

Student.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Student.collection.findOne({_id:_id}, function(err, obj){
    var student = changePrototype(obj);

    cb(student);
  });
};

module.exports = Student;

// PRIVATE FUNCTIONS ///

function changePrototype(obj){
  return _.create(Student.prototype, obj);
}

