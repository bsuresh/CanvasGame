(function(window) {

    function MrED(imageSource, radius) {
        if (imageSource === undefined) imageSource = '';
        if (radius === undefined) radius = 38;
        this.oldX = 0;
        this.oldY = 0;
        this.radius = radius;
        this.scale = 1;
        this.imageSource = imageSource;
        this.initialize();
    }

    MrED.prototype = new Container();

    MrED.prototype.vx = 0;
    MrED.prototype.vy = 0;
    MrED.prototype.friction = 0.9;
    MrED.prototype.thrust = 0;
    MrED.prototype.vr = 0;
    MrED.objectWidth;
    MrED.objectHeight;
    MrED.prototype.radius;
    MrED.prototype.bounds;
    MrED.prototype.imageSource;

    MrED.prototype.Container_initialize = MrED.prototype.initialize;
    MrED.prototype.initialize = function() {
        this.Container_initialize();
        if (this.imageSource != '' ) {
            var bmp = new Bitmap(this.imageSource.result);
            this.addChild(bmp);
        }
        else {
            var edGraphic = generateEDGraphic(this.radius);
            this.addChild(edGraphic);
            this.objectWidth = this.radius *2.5;
            this.objectHeight = this.radius *2.5;
        }
    }

    MrED.prototype.tick = function() {
       this.rotation += this.vr * Math.PI/180;
        var angle = this.rotation,
            ax = Math.cos(angle) * this.thrust,
            ay = Math.sin(angle) * this.thrust,
            left = this.bounds.x,
            right = this.bounds.width,
            top = this.bounds.y,
            bottom = this.bounds.height;

            this.vx += ax;
            this.vy += ay;
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.x += this.vx;
            this.y += this.vy;

            /*var speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy),
                angle = Math.atan2(this.vy, this.vx);
            var  left = this.bounds.x,
            right = this.bounds.width,
            top = this.bounds.y,
            bottom = this.bounds.height;

            if( speed > this.friction)
            {
                speed -= this.friction;
            }
            else { speed = 0; }

            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.x += this.vx;
            this.y += this.vy;*/

            if (this.x - this.objectWidth/2 > right) {
                this.x = left - this.objectWidth/2;
            }
            else if (this.x+this.objectWidth/2 < left) {
                this.x = right + this.objectWidth/2;
            }
            if (this.y - this.objectHeight/2 > bottom) {
                this.y = top - this.objectHeight /2;
            }
            else if (this.y+this.objectHeight/2 < top)
            {
                this.y = bottom + this.objectHeight /2;
            }
    }

    function handleImageLoad() {
       var bmp = new Bitmap(this.img);
       this.addChild(bmp);
    }

    function generateEDGraphic(r) {
        var g = new Graphics();
        g.setStrokeStyle(5);
        g.beginStroke(Graphics.getRGB(0,0,0));
        g.beginFill(Graphics.getRGB(255,255,255));
        g.arc(0,r,r,Math.PI,0);
        g.closePath();
        g.endFill();
        g.moveTo(0,0);
        g.lineTo(0, -r); 
        g.moveTo(0,0);
        g.lineTo(-r, 0); 
        g.moveTo(0,r);
        g.lineTo(-r, r); 
        var s = new Shape(g); 
        return s;
    }
    window.MrED = MrED;
}(window));