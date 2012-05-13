(function(window) {

    function Meat(imageSource, radius, value) {
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

    Meat.prototype = new Container();

    Meat.prototype.vr = 0;
    Meat.prototype.stokeWidth = 2;
    Meat.prototype.value = 10;
    Meat.prototype.bounds = 0;
    Meat.prototype.hit = 0;
    Meat.prototype.objectWidth;
    Meat.prototype.objectHeight;
    Meat.prototype.radius;
    Meat.prototype.imageSource;

    Meat.prototype.Container_initialize = Meat.prototype.initialize;
    Meat.prototype.initialize = function() {
        this.Container_initialize();

        this.shadow = new Shadow("#666", 3, 0, 0);

        if (this.imageSource != '' ) {
            var bmp = new Bitmap(this.imageSource.result);
            this.addChild(bmp);
        }
        else {
            var meatGraphic = generateMeatGraphic(this.radius, this.stokeWidth);
            this.addChild(meatGraphic);
            this.objectWidth = this.radius *2.5;
            this.objectHeight = this.radius *2.5;
            this.bounds = this.radius;
        }

        this.hit = this.bounds;

        this.scaleX = this.scaleY = 0;
        Tween.get(this).wait(100).to({scaleX:1, scaleY:1},1000, Ease.bounceOut).call(function(){ this.hit = this.bounds; });
    }

    Meat.prototype.tick = function() {
       
    }

    Meat.prototype.hitPoint = function (tX, tY) {
        return this.hitRadius(tX, tY, 0);
    }

    Meat.prototype.hitRadius = function (tX, tY, tHit) {
        //early returns speed it up
        if (tX - tHit > this.x + this.hit) { return; }
        if (tX + tHit < this.x - this.hit) { return; }
        if (tY - tHit > this.y + this.hit) { return; }
        if (tY + tHit < this.y - this.hit) { return; }

        //now do the circle distance test
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
    }

    Meat.prototype.respawn = function(sw, sh)
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

    function generateMeatGraphic(r, sw) {
        var g = new Graphics();
        g.setStrokeStyle(sw);
        g.beginStroke(Graphics.getRGB(255,0,0));
        g.beginFill(Graphics.getRGB(255,255,255));
        g.drawCircle(0,0,r);
        g.closePath();
        g.endFill(); 
        g.endStroke();
        g.beginFill(Graphics.getRGB(255,0,0));
        g.drawCircle(0,0,r*0.8);
        g.endFill();
        g.beginFill(Graphics.getRGB(255,255,255));
        g.drawCircle(r*0.2,r*0.2,r*0.2);
        g.endFill();
        var s = new Shape(g);
        s.cache(-r-5, -r-5, (r+5)*2, (r+5)*2 );
        return s;
    }
    window.Meat = Meat;
}(window));