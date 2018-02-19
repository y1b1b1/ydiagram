

qx.Class.define("app.LoginWindow", {
  extend : qx.ui.window.Window,

  events : {
    "loginsuccess" : "qx.event.type.Event"
  },

    construct : function(){
      this.base(arguments, "YDiagram-Login");

      this.setShowClose(false);
      this.setShowMaximize(false);
      this.setShowMinimize(false);

      this.setWidth(300);
      this.setResizable(false, false, false, false);

      // add the layout
      var layout = new qx.ui.layout.Grid(0, 0);
      this.setLayout(layout);

      layout.setSpacingY(10);
      layout.setRowFlex(1, 1);
      layout.setColumnFlex(1, 1);

      // Label
      var user = new qx.ui.basic.Label("Name:");
      this.add(user, {row: 0, column: 0});
      var user_input = new qx.ui.form.TextField("");
      this.add(user_input, {row: 0, column: 1});

      var password = new qx.ui.basic.Label("Password:");
      this.add(password, {row: 1, column: 0});
      var password_input = new qx.ui.form.PasswordField("");
      this.add(password_input, {row: 1, column: 1});

      var repassword = new qx.ui.basic.Label("Re Password:");
      this.add(repassword, {row: 2, column: 0});
      var repassword_input = new qx.ui.form.PasswordField("");
      this.add(repassword_input, {row: 2, column: 1});


      var hlayout = new qx.ui.layout.HBox(4, "right");

      var container = new qx.ui.container.Composite(hlayout);
      var signupButton = new qx.ui.form.Button("Sign Up");
      container.add(signupButton);
      var signinButton = new qx.ui.form.Button("Sign In");
      container.add(signinButton); 

      this.add(container, {row: 3, column: 1});      

      // Sign In
      //  登录成功发出登录成功消息
      //  登录失败，提示错误描述信息
      signinButton.addListener("execute", function(e) {
        // 发送请求
        //   获取用户名、密码
        var req = new qx.io.request.Xhr("/app_login?user="+user_input.getValue()+"&password="+password_input.getValue());

        req.addListener("success", function(e) {
          var req = e.getTarget();

          // Response parsed according to the server's
          // response content type, e.g. JSON
          var result = JSON.parse(req.getResponse());
          if (result["result"]==false) {
            alert(result["error"]);
          } else {
            alert("Sign in success");
            this.fireEvent("loginsuccess");
          }
        }, this);
        req.addListener("fail", function(e) {
          alert("Net Error!");
        }, this);
        req.addListener("error", function(e) {
          alert("Net Error!");
        }, this);

        // Send request
        req.send();
      }, this);

      // Sign Up
      //  注册成功后，提示注册成功，然后用户自己进行登录
      //  注册失败后，提示错误描述信息
      signupButton.addListener("execute", function(e) {
        // 发送请求
        //   获取用户名、密码
        var user = user_input.getValue();
        var password = password_input.getValue();
        var repassword = repassword_input.getValue();

        if (password != repassword) {
          alert("Password inputed are different!");
          return ;
        }

        var req = new qx.io.request.Xhr("/app_signup?user="+user_input.getValue()+"&password="+password_input.getValue());

        req.addListener("success", function(e) {
          var req = e.getTarget();

          // Response parsed according to the server's
          // response content type, e.g. JSON
          var result = JSON.parse(req.getResponse());
          if (result["result"]==false) {
            alert(result["error"]);
          } else {
            alert("Sign up success");
          }
        }, this);
        req.addListener("fail", function(e) {
          alert("Net Error!");
        }, this);
        req.addListener("error", function(e) {
          alert("Net Error!");
        }, this);

        // Send request
        req.send();
      });

    }
});

