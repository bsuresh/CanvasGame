(function(window) {

    function Hole(imageSource, radius, value) {
        if (imageSource === undefined) imageSource = '';
        if (radius === undefined) radius = 38;
        this.oldX = 0;
        this.oldY = 0;
        this.radius = radius;
        this.scale = 1;
        this.value = value;
        this.imageSource = imageSource;
        this.initialize();
    }

    Hole.prototype = new Container();

    Hole.prototype.vr = 0;
    Hole.prototype.stokeWidth = 2;
    Hole.prototype.value = 10;
    Hole.prototype.bounds = 0;
    Hole.prototype.hit = 0;
    Hole.prototype.objectWidth;
    Hole.prototype.objectHeight;
    Hole.prototype.radius;
    Hole.prototype.imageSource;

    Hole.prototype.Container_initialize = Hole.prototype.initialize;
    Hole.prototype.initialize = function() {
        this.Container_initialize();

        this.shadow = new Shadow("#666", -2, 0, 0);

        if (this.imageSource != '' ) {
            var bmp = new Bitmap(this.imageSource.result);
            this.addChild(bmp);
        }
        else {
            var holeGraphic = generateHoleGraphic(this.radius, this.stokeWidth);
            this.addChild(holeGraphic);
            this.objectWidth = this.radius *2.5;
            this.objectHeight = this.radius *2.5;
            this.bounds = this.radius;
        }

        this.hit = this.bounds;

        this.scaleX = this.scaleY = 0;
        Tween.get(this).wait(300).to({scaleX:1, scaleY:1},1000, Ease.bounceOut).call(function(){ this.hit = this.bounds; });
    }

    Hole.prototype.tick = function() {
       
    }

    Hole.prototype.hitPoint = function (tX, tY) {
        return this.hitRadius(tX, tY, 0);
    }

    Hole.prototype.hitRadius = function (tX, tY, tHit) {
        //early returns speed it up
        if (tX - tHit > this.x + this.hit) { return; }
        if (tX + tHit < this.x - this.hit) { return; }
        if (tY - tHit > this.y + this.hit) { return; }
        if (tY + tHit < this.y - this.hit) { return; }

        //now do the circle distance test
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
    }

    Hole.prototype.respawn = function(sw, sh)
    {
        this.x = Math.random() * sw;
        this.y = Math.random() * sh;
        this.scaleX = this.scaleY = 0;
        this.hit = 0;
        Tween.get(this).wait(500).to({scaleX:1, scaleY:1},1000, Ease.bounceOut).call(function(){ this.hit = this.bounds; });
    }

    function handleImageLoad() {
       var bmp = new Bitmap(this.img);
       this.addChild(bmp);
    }

    function generateHoleGraphic(r, sw) {
        var g = new Graphics();
        g.setStrokeStyle(sw);
        g.beginStroke(Graphics.getRGB(255,255,255));
        g.beginFill(Graphics.getRGB(0,0,0));
        g.drawCircle(0,0,r);
        g.closePath();
        g.endFill(); 
        g.endStroke();
        var s = new Shape(g);
        s.cache(-r-5, -r-5, (r+5)*2, (r+5)*2 );
        return s;
    }
    window.Hole = Hole;
}(window));