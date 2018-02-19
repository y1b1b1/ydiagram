

qx.Class.define("app.DiagramWindow", {
  extend : qx.ui.window.Window,

    construct : function(id){
      this.base(arguments, "YDiagram-Edit");

      //this.setShowClose(false);
      //this.setShowMaximize(false);
      //this.setShowMinimize(false);
      this.setShowStatusbar(true);

      this.setWidth(500);
      this.setHeight(500);

      // add the layout
      var layout = new qx.ui.layout.Grid(0, 0);
      this.setLayout(layout);
      this.setContentPadding(0);

      //layout.setSpacingY(10);
      layout.setRowFlex(0, 1);
      layout.setColumnFlex(0, 1);

      var frame = new qx.ui.embed.Iframe();
      this.add(frame, {row: 0, column: 0});
      frame.addListener("load", function(e) {
        this.debug("Loaded: " + this.getSource());
      });

      // elastic
      frame.setSource("http://localhost:3000/editdiagram?ID="+id);
    }
});

