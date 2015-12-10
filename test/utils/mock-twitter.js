var $ = require('jquery')

function MockStream(){
}

MockStream.prototype.sendData = function(data){
    $(this).trigger("data", data)
}

function MockTwitter(options){
    this.options = options
}

MockTwitter.prototype.stream = function(method, queryObject, cb){
    this.stream = new MockStream()
    cb(stream)
}

MockTwitter.prototype.getOptions = function(){
    return this.options
}

MockTwitter.prototype.getQueryObject = function(){
    return this.queryObject
}

MockTwitter.prototype.sendData = function(data){
    this.stream.sendData(data)
}

module.exports = MockTwitter