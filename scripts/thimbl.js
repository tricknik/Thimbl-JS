(function() {
  var Thimbl = function(window) {
    this.window = window;
    this.$ = window.jQuery;
  };
  Thimbl.prototype.profile= function(user, callback) {
    this.window.profile = function(data, status) {
      callback(data);
    };
    var api_url = "http://users.thimbl.net/profile?u";
    var plan_url = [api_url, user].join("=");
    this.$.ajax({url: plan_url, dataType: "jsonp", jsonpCallback: "profile"});
  };
  if (typeof module !== "undefined" && module.exports) {
    module.exports.Thimbl = Thimbl;
  } else {
    window.Thimbl = Thimbl;
  }
})();
