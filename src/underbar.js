/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
      return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
      return n === undefined? array[array.length-1]: array.slice(array.length-n>0?array.length-n:0,array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

      if(Array.isArray(collection)){
          for(var index = 0; index < collection.length; index++){
              iterator(collection[index],index,collection);
          }
      }else{
          for( var prop in collection){
              if(collection.hasOwnProperty(prop)){
                iterator(collection[prop],prop,collection);
             }
          }
      }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
      var result = [];
      _.each(collection,function(item,index){
          if(test(item)){
              result.push(item);
          }
      });
      return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection,function(item){
        return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
      var result = [];
      for(var i = 0; i < array.length; i++){
          if(_.indexOf(result,array[i])===-1){
          	result.push(array[i]);
          }
      }
      return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
      var result = [];
      _.each(collection,function(item,index){
         result.push(iterator(item));
      });
      return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  	return _.map(collection,function(item,index){
		if(typeof functionOrKey === "string"){
			return item[functionOrKey].apply(item,args);
		}else{
			return functionOrKey.apply(item,args);
		}
  	});
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
      var retValue = accumulator != undefined ? accumulator : _.first(collection);
      _.each(collection,function(item){
        retValue = iterator(retValue,item);
      });
      return retValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    return _.reduce(collection,function(matched,item){
    	return typeof iterator === "function"?matched&&iterator(item):matched&&item;
    },true)?true:false;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    return !_.every(collection,function(item){
      return iterator?!iterator(item):item;
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var objects = Array.prototype.slice.call(arguments,1);
    return _.reduce(objects,function(last,item){
      for(var key in item){
        last[key] = item[key];
      }
      return last;
    },obj);
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var objects = Array.prototype.slice.call(arguments,1);
    return _.reduce(objects,function(last,item){
      for(var key in item){
        if(last[key]==undefined){
          last[key] = item[key];
        }
      }
      return last;
    },obj);
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memory = [];
    var results = [];
    return function(){
    	// we turn arguments to string for easy retrieval
		var argKey = Array.prototype.join.apply(arguments,[","]);

		// check if we remember that argument combination
		var index = _.indexOf(memory,argKey);
		if(index>=0){
			// if so, return cached response
			return results[index];
		}
		// else, run the function and store results
		var newResult = func.apply(this,arguments);
		results.push(newResult);
		memory.push(argKey);

		return newResult;
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments,2);
    setTimeout(function(){
      func.apply(this,args);
    },wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var ret = array.slice();
    _.each(array,function(item,index){
      var newIndex = Math.floor(Math.random()*array.length);
      var aux = ret[index];
      ret[index] = ret[newIndex];
      ret[newIndex] = aux;
    });
    return ret;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
	
	var localIterator = iterator;
  	
  	// redefine the iterator if necesary 
  	if(typeof iterator === "string"){
  		localIterator = function(a){
  			return a[iterator];
  		}
  	}

  	// define the comparator
  	var greaterThanPredicate = function(a,b){

  		return a > b||!a;

  	}
  	// define helper function for readability
  	var isGreater = function(a,b){
  		return greaterThanPredicate(localIterator(a),localIterator(b));
  	}


  	// sort using bubble sort (which is the only one I know)
  	for(var j = 0; j <collection.length; j++){
  		for(var i = 0; i < collection.length-1; i++){
			if(isGreater(collection[i],collection[i+1])){
				var aux = collection[i];
				collection[i]=collection[i+1];
				collection[i+1]=aux;
			}
  		}
  	}
  	return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  	return _.reduce(arguments,function(zipped,item){
  		for(var i = 0; i<Math.max(zipped.result.length,item.length);i++){
  			if(zipped.result[i]==undefined){
  				zipped.result[i]=[];
  			}
  			if(i<item.length){
  				zipped.result[i][zipped.count]=item[i];
  			}else{
  				zipped.result[i][zipped.count]=undefined;
  			}
  		}
  		zipped.count++;
  		return zipped;
  	},{result:[],count:0}).result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  	var result = result||[];
  	var walk = function(array){
  		_.each(array,function(item){
  			if(Array.isArray(item)){
				walk(item);	
  			}else{
  				result.push(item);
  			}
  		})
  	}
  	walk(nestedArray);
  	return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  	return _.reduce(arguments,function(prev,next){
  		return _.filter(prev,function(previtem){return _.contains(next,previtem);});
  	},arguments[0].slice())
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  	return _.reduce(Array.prototype.slice.apply(arguments,[1]),function(prev,next){
  		// remove the prev items that are in the next array.
  		return _.reject(prev,function(previtem){return _.contains(next,previtem);});
  	},array.slice());
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  	var blackList = false; // first time it's called we switch this
  	var pending = false; // second+ time it's called we switch this
  	var pendingArgs = []; // second+ time it's called we keep (last) arguments
    var lastRet = undefined;
  	var removeFromBlackList = function(){
  		// if there was an executing pending, execute it.
  		if(pending){
  			pending=false;
  			return callAndBlacklist(pendingArgs);
  		}else{
  			blackList=false;
  		}
  	};
  	var callAndBlacklist = function(args){
		blackList=true;
		lastRet = func.apply(this,Array.prototype.slice.apply(args,[0]))
		_.delay(removeFromBlackList,wait);
		return lastRet;
  	}
  	return function(){
  		if(!blackList){
  			return callAndBlacklist(arguments);
  		}else{
  			pending=true;
  			pendingArgs = arguments;
        return lastRet;
  		}
  	}
  };

}).call(this);
