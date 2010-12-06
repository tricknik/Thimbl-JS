
var Thimbl = function() {};
Thimbl.prototype.feed = function(filter, callback) {
  var Post = function(time, text) {
    this.toString = function() {
      return(time + ':' + text);
    }
  };
  var feed = [
    { "time": 20100622170914,
      "text": "Testing out the GUI. Should rock my socks off"},
    { "time": 20100806170914,
      "text": "Who would in in a fight? A baboon or a badger?"}, 
    { "time": 20100622171022,
      "text": "I reckon the badger would OWN THAT BITCH!"}
  ];
  callback(null, feed);
}


exports.Thimbl = Thimbl;
