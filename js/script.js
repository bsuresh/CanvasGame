/* Author: Suresh BSub, http://suresh.im
HTML5 EaselJS game
*/
window.onload = function () {
	init();
}	//Global Variables
	var canvas, stage, screen_width, screen_height, mrED;

	

	function init() {
    	if (window.top != window) {
    		document.getElementById("header").style.display = "none";
    	}

        // create stage and point it to the canvas:
        canvas = document.getElementById("gameCanvas");
        stage = new Stage(canvas);
        screen_width = canvas.width;
        screen_height = canvas.height;
        images = [];
        //Touch.enable(stage);

        manifest = [
            {src:"assets/bg.jpg", id:"bg"}
            //{src:"assets/whiteBall.png"}
        ];
        loader = new PreloadJS();
        loader.onFileLoad = handleFileLoad;
        loader.onComplete = handleComplete;
        loader.loadManifest(manifest);

    }

    function handleComplete(event) {
        /*balls = [];
        for(var i=0;i<images.length;i++) {
            var id = images[i].id;
            var ball = new Ball(loader.getResult(id));
            balls[i] = ball;
            stage.addChild(ball);
        }*/
        mrED = new MrED(undefined, 20);
        mrED.x = screen_width/2;
        mrED.y = screen_height/2;
        mrED.bounds = new Rectangle(0, 0, screen_width, screen_height);
        stage.addChild(mrED);

        startGame();
    }

    function startGame()
    {
    	//add the kyboard events
    	// MrED can be moved with the arrow keys (left, right)
    	document.onkeydown = handleKeyDown;
    	document.onkeyup = handleKeyUp;

        // we want to do some work before we update the canvas,
	    // otherwise we could use Ticker.addListener(stage);
	    Ticker.addListener(window);

	    // Best Framerate targeted (60 FPS)
	    Ticker.useRAF = true;
	    Ticker.setFPS(60);

    }

    function handleKeyDown(event) {
    	
    	if (window.event) keycode = window.event.keyCode;
		else if (e) keycode = e.which;
    	switch(keycode)
    	{
    		case 37: //left
    			//mrED.steerLeft = true;
    			//mrED.vx = -2;
    			mrED.vr = -2;
    			break;
    		case 39: //right
    			//mrED.steerRight = true;
    			//mrED.vx = 2;
    			mrED.vr = 2;
    			break;
    		case 38: //up
    			//mrED.accelrate = true;
    			mrED.thrust = 0.4;
    			//mrED.vy = -2;
    			break;
    		case 40: //down
    			//mrED.vy = 2;
    			break;
    		case 40: //space
    			mrED.brake = true;
    			break;
    	}
    }

    function handleKeyUp(event) {
    	mrED.vr = 0;
    	mrED.thrust = 0;

    	/*if (window.event) keycode = window.event.keyCode;
		else if (e) keycode = e.which;
		switch(keycode)
    	{
    		case 37: //left
    			mrED.steerLeft = false;
    			//mrED.vx = -2;
    			break;
    		case 39: //right
    			mrED.steerRight = false;
    			//mrED.vx = 2;
    			break;
    		case 38: //up
    			mrED.accelrate = false;
    			//mrED.thrust += 0.4;
    			//mrED.vy = -2;
    			break;
    		case 40: //down
    			//mrED.vy = 2;
    			break;
    		case 40: //space
    			mrED.brake = false;
    			break;
    	}*/

    	//mrED.vx = 0;
    	//mrED.vy = 0;
    }

    function handleFileLoad(event) {
        if (event.id == "bg") {
            var bmp = new Bitmap(event.result);
            stage.addChildAt(bmp, 0);
        } else {
            images.push(event);
        }
    }

    function tick() {

		mrED.tick();
		stage.update();
		//console.log("ticker");
    }
//}




