
var MrED1, canvas, stage, screen_width, screen_height;

	//find canvas and load images, wait for last image to load
    canvas = document.getElementById("main");

    // create a new stage and point it at our canvas:
    stage = new Stage(canvas);

    // grab canvas width and height for later calculations:
    screen_width = canvas.width;
    screen_height = canvas.height;

    startGame();

    function startGame() {
    	//CreateAndAddRandomBackground

    	// MrED can be moved with the arrow keys (left, right)
    	document.onkeydown = handleKeyDown;
    	document.onkeyup = handleKeyUp;

    	// Creating the Hero
	    MrED1 = new MrED('MrED1');
	    MrED1.setBoundaries(0, 0, screen_width, screen_height);
	    MrED1.x = screen_width/2;
	    MrED1.y = screen_height/2
	    stage.addChild(MrED1);
        
	    // we want to do some work before we update the canvas,
	    // otherwise we could use Ticker.addListener(stage);
	    Ticker.addListener(window);
	    // Best Framerate targeted (60 FPS)
	    Ticker.useRAF = true;
	    Ticker.setFPS(60);

	    console.log(MrED1);

    }

    function  handleKeyDown(event) {
    	switch(event.code)
    	{
    		case 37: //left
    			MrED1.vR = -3;
    			break;
    		case 39: //right
    			MrED1.vR = 3;
    			break;
    		case 38: //up
    			MrED1.thrust = 0.05;
    			break;
    	}
    }

    function tick()
    {
    	// Update logic of the hero
    	MrED1.tick();

 		// update the stage:
 		stage.update();
    }

    function handleKeyUp(event) {
    	MrED.vR = 0;
    	MrED.thrust = 0;
    }