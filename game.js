var renderer, scene, camera;

var keyboard;

var _3 = THREE;
var camLight = {x:0,y:4,z:20};

function init() {
    var container = document.getElementById('gameContainer');
    setupScene(900,500);
    container.appendChild(renderer.domElement);


    //get keyboard events
    keyboard = new THREEx.KeyboardState();


    buildRoomGeometry();
    animate();
}

function animate() {
    runFrame();
    requestAnimationFrame(animate);
}

function moveCamera() {
    var move = 0.06;
    if (keyboard.pressed("up")) {
        camLight.y += move;
    }
    if (keyboard.pressed("down")) {
        camLight.y -= move;
    }

    if (keyboard.pressed("left")) {
        camLight.x -= move;
    }
    if (keyboard.pressed("right")) {
        camLight.x += move;
    }

    if (keyboard.pressed("z")) {
        camLight.z -= move;
    }

    if (keyboard.pressed("x")) {
        camLight.z += move;
    }

    camera.position.set(camLight.x, camLight.y, camLight.z);

}

function runFrame() {
    console.log("runframe");

    moveCamera();
    renderer.render(scene, camera);
}


function setupScene(width, height) {
    scene = new _3.Scene();
    camera = new _3.PerspectiveCamera(45, width/height, 1, 10000);
    camera.position.set(camLight.x, camLight.y, camLight.z);


    var light = new _3.PointLight( 0xffffff, 1.0);
    light.position.set(0,1,0);
    scene.add(light);

    var light2 = new _3.PointLight(0xffffff, 0.5);
    light2.position.set(0,4,0);
    scene.add(light2);

    var light3 = new _3.DirectionalLight(0xffffff, 1.0);
    light3.position.set(7,2,0);
    scene.add(light3);

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
    var mesh = new _3.Mesh(geo, new _3.MeshLambertMaterial({color:0xffa0a0, side:_3.DoubleSide}));
    scene.add(mesh);


    //ceiling
    var celing = new _3.Geometry();
    celing.vertices.push(new _3.Vector3(5,6,5));
    celing.vertices.push(new _3.Vector3(5,6,-5));
    celing.vertices.push(new _3.Vector3(-5,6,-5));
    celing.vertices.push(new _3.Vector3(-5,6,5));

    celing.faces.push(new _3.Face4(0,1,2,3));
    celing.computeFaceNormals(); celing.computeVertexNormals();
    scene.add(new _3.Mesh(celing, new _3.MeshLambertMaterial({color:0xa0a0ff, side:_3.DoubleSide})));

}


function buildPlayerGeometry() {

    var geo = new _3.SphereGeometry(0.1, 20, 20);
    var mat = new _3.MeshPhongMaterial({color:0x00ff00});

}


