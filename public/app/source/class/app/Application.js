/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "app"
 *
 * @asset(app/*)
 */
qx.Class.define("app.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      // 分享链接的处理
      //   首先，对设计进行链接分享设置（是否容许编辑、是否需要访问密码）
      //   然后，系统生成一个唯一ID
      //   其他用户，通过在系统中添加

      var login = new app.LoginWindow();
      login.addListener("resize", login.center);
      login.addListener("loginsuccess", function(){
        login.close();
        var main = new app.MainWindow();
        main.open();
      });
      
      login.open();
    }
  }
});
