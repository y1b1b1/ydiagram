

qx.Class.define("app.MindMapWindow", {
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
        layout.setRowFlex(1, 1);
        layout.setColumnFlex(0, 1);

        var toolbar = new qx.ui.toolbar.ToolBar();
        this.add(toolbar, {row: 0, column: 0});

        var frame = new qx.ui.embed.Iframe();
        this.add(frame, {row: 1, column: 0});
        frame.addListener("load", function(e) {
            this.debug("Loaded: " + this.getSource());
        });

        // elastic
        frame.setSource("/editdiagram?ID="+id);

        var saveButton = new qx.ui.toolbar.Button("Save");
        toolbar.add(saveButton);
        var brushButton = new qx.ui.toolbar.Button("Brush");
        toolbar.add(brushButton);

        var mypop = new qx.ui.control.ColorPopup();
        mypop.exclude();
        mypop.setValue("#FFFFFF");

        mypop.addListener("changeValue", function(e) {
            if (e.getData() == "#FFFFFF") {
                return ;
            }
            
            //alert(frame.getBody().getElementsByClassName("clientd")[0].innerHTML);
            frame.getBody().getElementsByClassName("clientd")[0].innerHTML = "brush$$$"+e.getData();
            mypop.setValue("#FFFFFF");
        });
    

        saveButton.addListener("execute", function(e) {
            //alert(frame.getBody().getElementsByClassName("clientd")[0].innerHTML);
            //frame.getBody().getElementsByClassName("clientd")[0].setAttribute("value", "save");
            frame.getBody().getElementsByClassName("clientd")[0].innerHTML = "save";
        });
        brushButton.addListener("execute", function(e) {
            mypop.placeToWidget(brushButton);
            mypop.show();
        });
    }
});
  
  