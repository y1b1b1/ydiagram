

qx.Class.define("app.MainWindow", {
  extend : qx.ui.window.Window,

  events : {
    "newdiagram" : "qx.event.type.Event",
    "editdiagram"   : "qx.event.type.Data"
  },

    construct : function(){
      this.base(arguments, "YDiagram");

      this.setShowClose(false);
      this.setShowMaximize(false);
      this.setShowMinimize(false);
      //this.setAlwaysOnTop(true);

      // adjust size
      this.setWidth(250);
      this.setHeight(this._getRoot().getInnerSize().height);
      //this._getRoot().addListener("changeHeight", function(e){
      //  this.setHeight(e.getData());
      //});

      // add the layout
      var layout = new qx.ui.layout.Grid(0, 0);
      this.setLayout(layout);

      // 
      var new_input = new qx.ui.form.TextField("");
      this.add(new_input, {row: 0, column: 0});

      // toolbar
      var toolbar = new qx.ui.toolbar.ToolBar();
      this.add(toolbar, {row: 1, column: 0});

      // list
      var list = new qx.ui.form.List();
      this.add(list, {row: 2, column: 0});

      this.setContentPadding(0);

      layout.setRowFlex(2, 2);
      layout.setColumnFlex(0, 1);

      // reload button
      var newButton = new qx.ui.toolbar.Button("New");
      toolbar.add(newButton);
      var editButton = new qx.ui.toolbar.Button("Edit");
      toolbar.add(editButton);
      var delButton = new qx.ui.toolbar.Button("Delete");
      toolbar.add(delButton);


      // create the controller
      var controller = new qx.data.controller.List(null, list);
      // set the name for the label property
      controller.setLabelPath("title");

      // create the data store
      var url = "/app_diagramlist";
      var store = new qx.data.store.Json(url);

      // connect the store and the controller
      store.bind("model.list", controller, "model");

      //list.addListener("changeSelection", function(e) {
      //  alert("slection:"+e.getData());
      //});
      editButton.addListener("execute", function(e) {
        if (controller.getSelection().getLength() == 0) {
          alert("No choosed item!");
          return ;
        }

        var item = controller.getSelection().getItem(0);
        //alert(item["$$user_id"]);
        var editWindow = new app.MindMapWindow(item["$$user_id"]);
        editWindow.maximize()
        editWindow.open();
      });
      delButton.addListener("execute", function(e) {
        if (controller.getSelection().getLength() == 0) {
          alert("No choosed item!");
          return ;
        }

        var item = controller.getSelection().getItem(0);
        var req = new qx.io.request.Xhr("/app_deldiagram?id="+item["$$user_id"]);

        req.addListener("success", function(e) {
          var req = e.getTarget();

          // Response parsed according to the server's
          // response content type, e.g. JSON
          var result = JSON.parse(req.getResponse());
          if (result["result"]==false) {
            alert(result["error"]);
          } else {
            // add new item to list
            store.reload();
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
      newButton.addListener("execute", function(e) {
        var title = new_input.getValue();
        if (title == "") {
          alert("Invalid new diagram name!");
          return ;
        }
        var req = new qx.io.request.Xhr("/app_newdiagram?title="+title);

        req.addListener("success", function(e) {
          var req = e.getTarget();

          // Response parsed according to the server's
          // response content type, e.g. JSON
          var result = JSON.parse(req.getResponse());
          if (result["result"]==false) {
            alert(result["error"]);
          } else {
            // add new item to list
            store.reload();
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

/*
      req.addListener("success", function(e) {
          var req = e.getTarget();
	  alert("success");
          // Response parsed according to the server's
          // response content type, e.g. JSON
          var result = JSON.parse(req.getResponse());
          if (result["result"]==false) {
            alert(result["error"]);
          } else {
            alert(req.getResponse());

            //var data = new qx.data.Array(result["list"]);

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
*/
    }
});

