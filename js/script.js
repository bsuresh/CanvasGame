/* Author: Suresh BSub, http://suresh.im
HTML5 EaselJS game
*/
window.onload = function () {
	init();
}	
//Global Variables
var canvas, stage, screen_width, screen_height, mrED, meats=[], numMeats=10, holes=[], numHoles=2, score=0, scoreLabel, scoreAlert, alertAni;
    


function init() {
	if (window.top != window) {
		document.getElementById("header").style.display = "none";
	}

    //resizing scripts
    window.addEventListener('resize', resizeGame, false);
    window.addEventListener('orientationchange', resizeGame, false);
    

    // create stage and point it to the canvas:
    canvas = document.getElementById("gameCanvas");
    resizeGame();
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

function resizeGame() {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    canvas.height = newHeight;
    canvas.width = newWidth;
    screen_width = canvas.width;
    screen_height = canvas.height;
}

function handleComplete(event) {

    startGame();
}

function startGame()
{

    //Create Holes
    for (var i = numHoles - 1; i >= 0; i--) {
        hole = new Hole(undefined, 30, 0);
        //meat.x = screen_width/2 + Math.random() * (screen_width-meat.objectWidth*2) - (screen_width-meat.objectWidth*2)/2;
        //meat.y = screen_height/2 + Math.random() * (screen_height-meat.objectHeight*2) - (screen_height-meat.objectHeight*2)/2;
        hole.x = Math.random()* screen_width;
        hole.y = Math.random()* screen_height;
        holes.push(hole);
        stage.addChild(hole);
    };

    //Create Meats
    for (var i = numMeats - 1; i >= 0; i--) {
        meat = new Meat(undefined, 15, 100);
        //meat.x = screen_width/2 + Math.random() * (screen_width-meat.objectWidth*2) - (screen_width-meat.objectWidth*2)/2;
        //meat.y = screen_height/2 + Math.random() * (screen_height-meat.objectHeight*2) - (screen_height-meat.objectHeight*2)/2;
        meat.x = Math.random()* screen_width;
        meat.y = Math.random()* screen_height;
        meats.push(meat);
        stage.addChild(meat);
    };

    //Create our MrED 
    mrED = new MrED(undefined, 20);
    mrED.x = screen_width/2;
    mrED.y = screen_height/2;
    mrED.bounds = new Rectangle(0, 0, screen_width, screen_height);
    stage.addChild(mrED);

    //Create scorelabel
    scoreLabel = new Label(30, 40, 36);
    scoreLabel.setLabel("Score: 0");
    stage.addChild(scoreLabel);

    //add the kyboard events,
	// MrED can be moved with the arrow keys (left, right)
	//document.onkeydown = handleKeyDown;
	//document.onkeyup = handleKeyUp;
	$(document).keydown(function(event){handleKeyDown(event)});
	$(document).keyup(function(event){handleKeyUp(event)});

    // we want to do some work before we update the canvas,
    // otherwise we could use Ticker.addListener(stage);
    Ticker.addListener(window);

    // Best Framerate targeted (60 FPS)
    Ticker.useRAF = true;
    Ticker.setFPS(60);
}

function resetGame() {
    for (var i = numHoles - 1; i >= 0; i--) {
        stage.removeChild(holes[i]);
    }

    for (var i = numMeats - 1; i >= 0; i--) {
        stage.removeChild(meats[i]);
    }
    holes = [];
    meats = [];
    score = 0;
    stage.removeChild(scoreLabel);
    stage.removeChild(mrED);

}

function restartGame() {

    var gameOverScreen = document.getElementById("gameOver");
    gameOverScreen.style.display = 'none';

    resetGame();
    startGame();
}

function gameover()
{
    document.onkeydown = null;
    document.onkeyup = null;

    //Ticker.removeListener(window);

    var gameOverScreen = document.getElementById("gameOver");
    gameOverScreen.style.display = 'block';
}

function handleKeyDown(event) {
	
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	switch(keycode)
	{
		case 37: //left
			mrED.vr = -4;
			break;
		case 39: //right
			mrED.vr = 4;
			break;
		case 38: //up
			mrED.energy = 2;
			break;
		case 40: //down
			//mrED.vy = 2;
			break;
	}
}

function handleKeyUp(event) {
	mrED.vr = 0;
	
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    
    switch(keycode)
    {
        case 37: //left
            //mrED.vr = -2;
            break;
        case 39: //right
           // mrED.vr = 2;
            break;
        case 38: //up
            mrED.energy = 0;
            break;
        case 40: //down
            //mrED.vy = 2;
            break;
    }
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
	for (meat in meats) {
        var m = meats[meat];
        // Calling explicitly each tick method 
        // to launch the update logic of each monster
        m.tick();
 
        // If MrED is still alive and if he's too near
        // from one of the meat...
        if (mrED.alive && m.hitRadius(mrED.x, mrED.y, mrED.hit)) {
            
            scoreAlert = new Text("+"+m.value, "24px Rancho", "#000");
            scoreAlert.x = m.x;
            scoreAlert.y = m.y;
            Tween.get(scoreAlert).wait(100).to({y:scoreAlert.y-25, alpha:1, visible:true},250).wait(50).to({y:scoreAlert.y-50, alpha:0, visible:false},150).call(function(){ stage.removeChild(scoreAlert); });
            stage.addChild(scoreAlert);

            //update score
            score += m.value;
            scoreLabel.setLabel("Score: " + score);
            m.respawn(screen_width, screen_height);

            //stage.removeChild(m);
            //meats.splice(meat, 1);
            
            //...he enjoys muching the meat!
            //mrED.alive = false;

            // Playing the proper animation mrED muchging

            continue;
        }
    }

    for (hole in holes) {
        var h = holes[hole];
        // Calling explicitly each tick method 
        // to launch the update logic of each monster
        h.tick();
 
        // If MrED is still alive and if he's too near
        // from one of the meat...
        if (mrED.alive && h.hitRadius(mrED.x, mrED.y, mrED.hit)) {
            
            scoreAlert = new Text("DEAD", "24px Rancho", "#ff0000");
            scoreAlert.x = h.x;
            scoreAlert.y = h.y;
            Tween.get(scoreAlert).wait(100).to({y:scoreAlert.y-25, alpha:1, visible:true},250).wait(50).to({y:scoreAlert.y-50, alpha:0, visible:false},150).call(function(){ stage.removeChild(scoreAlert); });
            stage.addChild(scoreAlert);

            //stage.removeChild(m);
            //meats.splice(meat, 1);
            
            //...he enjoys muching the meat!
            mrED.alive = false;
            mrED.die(h.x, h.y);
            gameover();

            // Playing the proper animation mrED muchging

            continue;
        }
    }

    scoreLabel.tick();
    mrED.tick();
	stage.update();
}




