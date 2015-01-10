Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};
document.writeln('Hello world!');
document.writeln('hello');
var hello = {
	"" : "hello1"
};
document.writeln(hello[""]);
//objects by reference trial
var trial = {
	x : 'hello'
}
var reference1 = trial;
reference1.x = 'bye-bey';
document.writeln(trial.x);
//creating a new non function object
//beget
//adding a method to Object.prootype makes it available to all objects
if(typeof Object.beget !== 'function'){
	Object.beget = function(o) {
	var F = function () {};
	F.prototype = o;
	return new F();
};
}
var reference2 = Object.beget(trial);
reference2.x = 'hello again';
document.writeln(reference2.x);
document.writeln(trial.x);
//trial.x was changed to bye-bey in the reference experiment
var prototypeChain = Object.beget(reference2);
prototypeChain.hello= "xl";
prototypeChain.next= "lksjdf";
//hasOwnProperty returns true if the object has a property but doesn't look up the prototype chain
console.log(prototypeChain.hasOwnProperty('x'));
console.log(prototypeChain.hasOwnProperty('hello'));
//for variable in property looks up the prototype chain so use hasOwnproperty
var name;
for(name in prototypeChain){
	document.writeln(name + ':' + prototypeChain[name]);
}
//Inner function pattern this = that.  when a function is invoked it's this is bound to the global object not as the variable of the function.  Because of this the function cannot employ an inner function to do it's work as it doesn't have access to the same this.
//so we create a variable that to equal this that the inner funciton uses to access the outer variable.  
//ex:
//using this without the knowledge of this being bounded to the global variable
var myObject = {
	value: 0,
	increment: function(inc){
		this.value += typeof inc === 'number' ? inc : 1;
	}
};
myObject.double = function () {
	console.log(this.value);//produces 2
	var helper = function(){
		this.value = this.value+ this.value;
		console.log(this.value); //produces NaN
	};
	helper(); //invoke helper.
};
myObject.increment(2);
document.writeln(myObject.value);
myObject.double();
document.writeln(myObject.value);
//now using workaround
myObject.double = function () {
	var that = this;
	var helper = function(){
		that.value = that.value + that.value;
		console.log(that.value);
		//^produces four
	};
	helper();
};
myObject.double();
document.writeln(myObject.value); //produces four
var add = function (a,b) {
	return a+b;
};
//constructor inocation pattern (not recommended for use)
var Quo = function (string) {
	this.status = string;
};
//get status
Quo.prototype.get_status = function () {
	return this.status;
};
//Make an instance of Quo
var myQuo = new Quo("confused");
document.writeln(myQuo.get_status());
//apply invocation pattern
//array of two numbers and add
var array = [3,4];
//apply takes two parameters.  first paramenter is the value bound to "this".  second one is parameter is an array of parameters the function takes
var sum = add.apply(null, array);
console.log(sum);
var statusObject = {
	status: 'A-OK'
};
//statusObject does not inherity from Quo.prototype.  Howver usuig the apply invocation pattern we can use the get_status method and apply it on status Object
var status = Quo.prototype.get_status.apply(statusObject);
//in the above the "this" references the status object
console.log(status);
//arguments parameter: allows you write parameters with an unspecified number of parameters. Not useful according to crockford.
var sum = function() {
	var i, sum =0;
	for(i = 0; i < arguments.length; i += 1){
		sum += arguments[i];
	}
	return sum;
};
document.writeln(sum(4,8,15,16,23,42));
//exceptions mechanism
var add = function(a, b) {
	if(typeof a !== 'number' || typeof b !== 'number'){
		throw {
			name: 'TypeError',
			message: 'add needs numbers'
		};
	}
	return a + b;
}
//name gives identity of error
//message is the description
//try catch object:
var try_it = function () {
	try {
		add("seven");
	} catch(e) {
		document.writeln(e.name + ':' + e.message);
	}
}
try_it();
