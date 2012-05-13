(function(window) {
	function Label(xpos, ypos, size) {
		this.initialize(xpos, ypos, size);
	}

    Label.prototype = new Container();

    Label.prototype.txt;
    Label.prototype.size;

    Label.prototype.Container_initialize = Label.prototype.initialize;
    Label.prototype.initialize = function(xpos, ypos, size) {
        this.Container_initialize();
        this.shadow = new Shadow("#666", 2, 0, 0);
		this.x = xpos;
		this.y = ypos
		this.size = size;
        txt = new Text("Score:", size+"px Rancho", "#000");
        this.addChild(txt);

    }

    Label.prototype.tick = function() {
       
    }

    Label.prototype.setLabel = function(l) {
        this.removeChild(txt);
        txt = new Text(l, this.size+"px Rancho", "#000");
        this.addChild(txt);
        this.txt = l;
    }
    window.Label = Label;
}(window));