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

    MrED.prototype.delta = 0;
    MrED.prototype.direction = 1;
    MrED.prototype.steerRight = false;
    MrED.prototype.steerLeft = false;
    MrED.prototype.accelration = 0.2;
    MrED.prototype.speed = 0;
    MrED.prototype.maxspeed = 20;
    MrED.prototype.vr = 0.5;
    MrED.prototype.objectRotation = 0;
    MrED.prototype.accelrate = false;
    MrED.prototype.brake = false;
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
            this.objectRotation = this.rotation;
        }
    }

    MrED.prototype.tick = function() {
            //detecting speed  
            this.speed = Math.round((this.delta)*5); 
            console.log(this.rotation);
            if ((this.rotation < 180)&&(this.rotation >= 0)){  
                this.objectRotation = this.rotation;  
                this.direction = 1;  
            }  
            if ((this.rotation < 0)&&(this.rotation > -180)){  
                this.objectRotation = -1 * this.rotation;  
                this.direction = -1;  
            }  
            
            if(this.steerRight)
            {
                this.rotation += this.vr*this.delta;
            }

            if(this.steerLeft)
            {
                this.rotation -= this.vr*this.delta;
            }
            
            //console.log(this.delta);
            if(this.accelrate)
            {

                this.y -= ((90-this.objectRotation)/90)*this.delta;  
      
                if (((this.rotation > 90)&&(this.rotation < 180))||((this.rotation < -90)&&(this.rotation > -180))) {  
                    this.x += this.direction * (((((1-(this.objectRotation/360))*360)-180)/90)*this.delta);  
                }  
                if (((this.rotation <= 90)&&(this.rotation > 0))||((this.rotation >= -90)&&(this.rotation < -1))) {  
                    this.x += this.direction * ((this.objectRotation)/90)*this.delta;  
                }  
                if (this.brake) {  
                    this.delta -= Math.abs(this.vr)*this.accelration;  
                }  
                if (!this.brake && this.speed < this.maxspeed) {   
                    this.delta += this.accelration;  
                }
            }
            else {  
                if (this.delta > 0 && this.brake) {  
                    this.y -= ((90-this.objectRotation)/90)*this.delta;  
          
                    if (((this.rotation > 90)&&(this.rotation < 180))||((this.rotation < -90)&&(this.rotation > -180))) {  
                        this.x += this.direction * (((((1-(this.objectRotation/360))*360)-180)/90)*this.delta);  
                    }  
                    if (((this.rotation <= 90)&&(this.rotation > 0))||((this.rotation >= -90)&&(this.rotation < -1))) {  
                        this.x += this.direction * ((this.objectRotation)/90)*this.delta;  
                    }  
                    this.delta -= 4*this.accelration;  
                }  
                else if (this.delta > 0) {  
                    this.y -= ((90-this.objectRotation)/90)*this.delta;  
          
                    if (((this.rotation > 90)&&(this.rotation < 180))||((this.rotation < -90)&&(this.rotation > -180))) {  
                        this.x += this.direction * (((((1-(this.objectRotation/360))*360)-180)/90)*this.delta);  
                    }  
                    if (((this.rotation <= 90)&&(this.rotation > 0))||((this.rotation >= -90)&&(this.rotation < -1))) {  
                        this.x += this.direction * ((this.objectRotation)/90)*this.delta;  
                    }  
                    this.delta -= 1.5*this.accelration;  
                }  
                else  
                    this.delta = 0;  
            }

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

            var  left = this.bounds.x,
            right = this.bounds.width,
            top = this.bounds.y,
            bottom = this.bounds.height;

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

            /*if(this.x + this.objectWidth/2 > right)
            {
                this.delta =0;
                this.x = right- 1 - this.objectWidth/2;
            }
            else if(this.x - this.objectWidth/2 < left )
            {
                this.delta =0;
                this.x = left + 1 + this.objectWidth/2;
            }
            if( this.y + this.objectHeight/2 > bottom)
            {
                this.delta =0;
                this.y = bottom - 1 - this.objectHeight/2;
            }
            else if(this.y - this.objectHeight/2 < top)
            {
                this.delta =0;
                this.y = top + 1 + this.objectHeight/2;
            }*/
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
        g.arc(0,0,r,Math.PI,0);
        g.closePath();
        g.endFill();
        g.moveTo(-r,0);
        g.lineTo(-r, r); 
        g.moveTo(0,0);
        g.lineTo(0,r); 
        g.moveTo(r,0);
        g.lineTo(r,r); 
        var s = new Shape(g); 
        return s;
    }
    window.MrED = MrED;
}(window));