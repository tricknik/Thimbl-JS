(function() {
  var Thimbl = function(context) {
    window = context;
    $ = window.jQuery;
  };
  Thimbl.prototype.update = function(user, login, property, value) {
    var thimbl = this;
    thimbl.profile(user, function(err, profile) {
      if (property in {name:1,bio:1,address:1,email:1}) {
        profile[property] = value;
      } else {
        profile.properties = profile.properties || {};
        profile.properties[property] = value;
      }  
      window._update = function(data, status) {
        thimbl.plan = null;
      };
      var plan = escape(JSON.stringify(profile));
      var api_url = "https://users.thimbl.net/account";
      var login_url = [api_url,
        [["u",login].join("="),[".plan",plan].join("=")].join("&")].join("?");
      $.ajax({url: login_url, dataType: "jsonp", jsonpCallback: "_update"});
    });
  };
  Thimbl.prototype.profile = function(user, callback) {
    if (this.plan) callback(null, this.plan)
    else {
      window._profile = function(data, status) {
        this.plan = data;
        callback(null, data);
      };
      var api_url = "http://users.thimbl.net/profile?u";
      var plan_url = [api_url, user].join("=");
      $.ajax({url: plan_url, dataType: "jsonp", jsonpCallback: "_profile"});
    }
  };
  Thimbl.prototype.login = function(user, password, callback) {
    window._login = function(data, status) {
      if ("login" in data) {
        err = null;
       } else {
        err = Error("Login failed");
       }
      callback(err, data);
    };
    var api_url = "https://users.thimbl.net/account";
    var login_url = [api_url,
      [["u",user].join("="),["password",password].join("=")].join("&")].join("?");
    $.ajax({url: login_url, dataType: "jsonp", jsonpCallback: "_login"});
  };
  if (typeof module !== "undefined" && module.exports) {
    module.exports.Thimbl = Thimbl;
  } else {
    window.Thimbl = Thimbl;
  }
})();
