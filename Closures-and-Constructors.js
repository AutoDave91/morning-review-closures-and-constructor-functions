// //REVIEW CLOSURES

// //What does SCOPE refer to?

//Scope in JavaScript refers to the accessibility or visibility of variables. That is, which parts of a program have access to the variable or where the variable is visible.

////////////////////////// //Example 1 - printNumber/log //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

let number = 42;
function printNumber() {
  console.log(number);
}

function log() {
  let number = 54;
  printNumber();
}

// // What will the invoked log() print?
log();

// Why does invoked log() print the number 42 and not the number 54?
// When it was created, it had access to number = 42 but it did not have access to number=54 because number=54 is in a different scope.

// //We take advantage of scope with closures. If we assign outer() to a new variable two, it will go back to the original reference of num to 0 even though we have invoked outer() three times as one(). This is like a snapshot.

//////////////////////Example 2 - outer()////////////////////////
///////////////////////////////////////////////////////////////

function outer() {
  var num = 0;
  return function inner() {
    return ++num;
  };
}
const one = outer();
one();
one();
one();

const two = outer();
two();

// //Closures allow us to hold onto that association. We can use them like snapshots which always refer to the lexical environment in which they were created.
// Identify three scope chains the inner() function has access to.
// 1. Its own scope
// 2. The scope of the function outer()
// 3. The global scope

///////////////////////// Example 3 - bank account //////////////////////////////////////////
///////////////////////////////////////////////////////////////

function bankAccount(balance) {
  var startingBalance = balance;
  return function(amt, action) {
    if (action === "withdraw") {
      startingBalance -= amt;
      return startingBalance;
    } else if (action === "deposit") {
      startingBalance += amt;
      return startingBalance;
    } else {
      return startingBalance;
    }
  };
}

const sandraAccount = bankAccount(10000);
sandraAccount();
sandraAccount(5000, "deposit");
sandraAccount(200, "withdraw");

const harryAccount = bankAccount(100);
harryAccount(88, "deposit");
harryAccount();

// //Example 4 - calculator
// //The following uses the module pattern. What is the module pattern?
//It is a function that returns an object which contains functions inside it.

function calculator(input) {
  let total = input;
  return {
    add(num) {
      return (total += num);
    },
    subtract(num) {
      return (total -= num);
    },
    divide(num) {
      return (total /= num);
    },
    multiply(num) {
      return (total *= num);
    }
  };
}

// We can use the object methods to do our calculations on the input we send into the function:
let calculate = calculator(100);
calculate.add(30);
calculate.subtract(60);
calculate.divide(5);
calculate.multiply(3000);

// Closures main takeaways - Reasons for using closures:
// Data encapsulation: Closures give us the ability to store data in a separate scope and share it only when necessary.
// Privacy: Creating private static variables that contain data is also possible which is awesome because you can’t get at the data from an outside scope except through the object’s privileged methods.
// Scalability: As a code base gets larger, it’s more likely there will be conflicts/errors when defining variables. The encapsulation aspect helps with this because we can segregate variables within scopes

////REVIEW CONSTRUCTOR FUNCTIONS

// Constructor Function:

//Example 1 - Car

function Car(make, model, year) {
  //What does 'this' refer to in the constructor?  Inside a constructor, the keyword 'this' references the new object that’s being created.
  this.make = make;
  this.model = model;
  this.year = year;
  this.miles = 0;

  this.drive = function(miles) {
    return (this.miles += miles);
  };
}

//Another option for adding a method to the object:

Car.prototype.drive = function(miles) {
  return (this.miles += miles);
};

let car = new Car("VW", "Golf", 2019);
console.log(car);
car.drive(20);
console.log(car);

//Notice the difference if the method is defined in the constructor versus in the prototype:
for (let i = 0; i < 50; i++) {
  console.log(car);
}

//   What is the advantage/disadvantage of setting a method within the constructor versus setting it on the prototype?
// If we create new instances of the Example, and we set the method INSIDE the constructor, then each instance we create will need to be revised if we want to change that method.
// If we change the method using the prototype, then methods that inherit via the prototype chain can be changed universally for all instances
// Another side effect of creating methods inside the constructor is poorer performance. Each method has to be created every time the constructor function runs. Methods on the prototype chain are created once and then "inherited" by each instance.
// However, there is an advantage of setting the method INSIDE the constructor. The advantage is that it has access to private variables.

//Example 2 - prototype method

function Example() {}
Example.prototype.math = function(a, b) {
  return a + b;
};

// Create 2 instances:
var ins1 = new Example();
var ins2 = new Example();

// Test the math method:
console.log(ins1.math(3, 3), ins2.math(3, 3));
// -> 6, 6

// Change the prototype method
Example.prototype.math = function(a, b) {
  return a * b;
};

// Test the math method:
console.log(ins1.math(3, 3), ins2.math(3, 3));
// -> 3, 3

//Advantages of prototype definition:
//Efficiency - Changes to method are shared among all instances/objects created using the constructor
//Methods are inherited

//Advantages of constructor definition
//Access to private variables within the constructor

///BONUS QUESTION - IIFEs

(function() {
  // Code goes here
})();

//An IIFE is a type of closure
//It runs as soon as it is defined
//It is often used to to create a lexical scope which is enclosed so that any variables declared inside it are private
//The first ()  is a grouping operator which surrounds the annonymous function
//The second () creates the immediately executing function expression () through which the JavaScript engine will directly interpret the function.

var batman = (function() {
  var identity = "Bruce Wayne";
  return {
    fightCrime: function() {
      console.log("Cleaning up Gotham.");
    },
    goCivilian: function() {
      console.log("Attend social events as " + identity);
    }
  };
})();

console.log(batman.identity); // Outputs: undefined
batman.goCivilian();
// Outputs: "Attend social events as Bruce Wayne"

function timeOutCounter() {
  for (var i = 0; i <= 5; i++) {
    (function(i) {
      setTimeout(function() {
        console.log(i);
      }, i * 1000);
    })(i);
  }
}
timeOutCounter();
