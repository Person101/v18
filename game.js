// Global variables
var _3 = THREE;
var renderer, scene, camera;
var keyboard;


var playerMesh;
var jumpStatus = 'down';


var camLight = {x:0,y:4,z:20};
var sceneLight;


var floorlevel = 0;
var celinglevel = 10;

function init() {
    var container = document.getElementById('gameContainer');
    setupScene(900,500);
    container.appendChild(renderer.domElement);


    //get keyboard events
    keyboard = new THREEx.KeyboardState();
    //and jquery for things that don't need to be per-frame
    $('body').keydown(jqueryKeyHandler);

    buildRoomGeometry();
    buildPlayerGeometry();
    animate();
}


function animate() {
    console.log("runframe");
    moveElement();
    movePlayer();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function jump() {
    console.log("JUMP");

    if (jumpStatus === 'down') {
        jumpStatus = 'up';
        playerMesh.position.y = celinglevel;
    }
    else {
        jumpStatus = 'down';
        playerMesh.position.y = floorlevel;
    }

}

function jqueryKeyHandler(e) {
    function swapLightCameraMove() {
        if (moveObject == camLight) {
            moveObject = sceneLight.position;
        }
        else {
            moveObject = camLight;
        }
    }

    if (e.keyCode === 73) { // press i
        swapLightCameraMove();
    }

    if (e.keyCode === 90) { // press z
        jump();
    }
}

//moveObject is a global associated with moveElement,
//and is mostly a debugging tool
var moveObject = camLight;
function moveElement() {
    var move = 0.06;

    if (keyboard.pressed("w")) {
        moveObject.y += move;
    }
    if (keyboard.pressed("s")) {
        moveObject.y -= move;
    }

    if (keyboard.pressed("a")) {
        moveObject.x -= move;
    }
    if (keyboard.pressed("d")) {
        moveObject.x += move;
    }

    if (keyboard.pressed("q")) {
        moveObject.z -= move;
    }

    if (keyboard.pressed("e")) {
        moveObject.z += move;
    }

    camera.position.set(camLight.x, camLight.y, camLight.z);
}

function movePlayer() {

    var move = 0.07;

    if (keyboard.pressed('up')) {
        playerMesh.position.z -= move;
    }
    if (keyboard.pressed('down')) {
        playerMesh.position.z += move;
    }
    if (keyboard.pressed('left')) {
        playerMesh.position.x -= move;
    }
    if (keyboard.pressed('right')) {
        playerMesh.position.x += move;
    }
}




function setupScene(width, height) {

    function makeLight(x, y, z) {
        var light = new _3.PointLight(0xffffff, 1.0);
        light.position.set(x,y,z);
        scene.add(light);
        sceneLight = light;
    }

    scene = new _3.Scene();
    camera = new _3.PerspectiveCamera(45, width/height, 1, 10000);
    camera.position.set(camLight.x, camLight.y, camLight.z);


    var ambientLight = new _3.AmbientLight(0x909090);
    scene.add(ambientLight);


    makeLight(0,3,0);

    /*
    var light = new _3.PointLight( 0xffffff, 1.0);
    light.position.set(0,1,0);
    scene.add(light);

    var light2 = new _3.PointLight(0xffffff, 0.5);
    light2.position.set(0,4,0);
    scene.add(light2);
    */

    /*
    var light3 = new _3.DirectionalLight(0xffffff, 1.0);
    light3.position.set(7,2,0);
    scene.add(light3);
    */

    renderer = new _3.WebGLRenderer({antialias:true, clearColor: 0x000000, clearAlpha:1});
    renderer.setSize(width,height);
}

function buildRoomGeometry() {
    //floor
    var geo = new _3.Geometry();
    geo.vertices.push(new _3.Vector3(5,0,5));
    geo.vertices.push(new _3.Vector3(5,0,-5));
    geo.vertices.push(new _3.Vector3(-5,0,-5));
    geo.vertices.push(new _3.Vector3(-5,0,5));

    //4,5
    geo.vertices.push(new _3.Vector3(5,2,5));
    geo.vertices.push(new _3.Vector3(5,2,-5));

    //6,7
    geo.vertices.push(new _3.Vector3(-5, 4, 5));
    geo.vertices.push(new _3.Vector3(-5, 4, -5));

    geo.faces.push(new _3.Face4(0,1,2,3));
    geo.faces.push(new _3.Face4(0,4,5,1));
    geo.faces.push(new _3.Face4(2,7,6,3));

    geo.computeFaceNormals();
    geo.computeVertexNormals();
    var mesh = new _3.Mesh(geo, new _3.MeshLambertMaterial({color:0xff2020, side:_3.DoubleSide}));
    scene.add(mesh);


    //ceiling
    var celing = new _3.Geometry();
    celing.vertices.push(new _3.Vector3(5,celinglevel,5));
    celing.vertices.push(new _3.Vector3(5,celinglevel,-5));
    celing.vertices.push(new _3.Vector3(-5,celinglevel,-5));
    celing.vertices.push(new _3.Vector3(-5,celinglevel,5));

    celing.faces.push(new _3.Face4(0,1,2,3));
    celing.computeFaceNormals(); celing.computeVertexNormals();
    scene.add(new _3.Mesh(celing, new _3.MeshLambertMaterial({color:0x2020ff, side:_3.DoubleSide})));

}


function buildPlayerGeometry() {

    var geo = new _3.SphereGeometry(0.3, 20, 20);
    var mat = new _3.MeshPhongMaterial({color:0x00ff00});
    playerMesh = new  _3.Mesh(geo, mat);
    scene.add(playerMesh);
}


