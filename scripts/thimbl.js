(function() {
  var Thimbl = function(window) {
    this.window = window;
    this.$ = window.jQuery;
  };

  Thimbl.prototype.profile = function(user, callback) {
    this.window._profile = function(data, status) {
      callback(null, data);
    };
    var api_url = "http://users.thimbl.net/profile?u";
    var plan_url = [api_url, user].join("=");
    this.$.ajax({url: plan_url, dataType: "jsonp", jsonpCallback: "_profile"});
  };
  Thimbl.prototype.login = function(user, password, callback) {
    this.window._login = function(data, status) {
      if ("login" in data) {
        err = null;
        console.log("Login Succeeded");
       } else {
        err = Error("Login failed");
       }
      callback(err, data);
    };
    var api_url = "https://users.thimbl.net/account";
    var login_url = [api_url,
      [["u",user].join("="),["password",password].join("=")].join("&")].join("?");
    this.$.ajax({url: login_url, dataType: "jsonp", jsonpCallback: "_login"});
  };
  if (typeof module !== "undefined" && module.exports) {
    module.exports.Thimbl = Thimbl;
  } else {
    window.Thimbl = Thimbl;
  }
})();
