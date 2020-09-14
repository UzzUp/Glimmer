// var Singleton = require('./singleton');

// var singleton = new Singleton();

// var stInstance = singleton.getInstance();

// stInstance.setA(1000);

// var a = stInstance.getA();
var _gInstance = null;

function singleton(){

    this.value = 0;

    singleton.prototype = {

        constructor:singleton,

        setA:function(b){

            this.value = b;

        },

        getA:function(){

            return this.value;

        },
				
        this.getInstance = function(){

            if(_gInstance == null){

                _gInstance = new singleton();

            }

            return _gInstance;

        }
		}
}

module.exports = singleton;