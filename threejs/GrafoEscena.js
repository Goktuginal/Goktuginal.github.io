/**
*	Seminario GPC #2. Forma Basica.
*	Dibujar formas basicas y un modelo importado.
*	Muestra el bucle tipico de inicializacion, escena y render.
*
*/

// Variables de consenso
// Motor, escena y la camara
var renderer, scene, camera;

// Otras globales
var esferaCubo, angulo = 0;

// Acciones
init();
loadScene();
loadPinzas();
render();

function init() {

	// Configurar el motor de render y el canvas
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x0000AA));
	document.getElementById("container").appendChild(renderer.domElement);

	// Escena
	scene = new THREE.Scene();

	// Camara
	var ar = window.innerWidth / window.innerHeight;
	camera = new THREE.PerspectiveCamera(50, ar, 0.1, 100);
	scene.add(camera);
	camera.position.set(0.5, 3, 9);
	camera.lookAt(new THREE.Vector3(0, 2, 0));
}

function loadPinzas() {

	var malla = new THREE.Geometry();
	var semilado = 2;
	var coordenadas = [
					semilado,  -semilado,  semilado,
					semilado,  -semilado, -semilado,
					semilado,   semilado, -semilado,
					semilado,   semilado,  semilado,
					-semilado,  semilado,  semilado,
					-semilado,  semilado, -semilado,
					-semilado, -semilado, -semilado,
					-semilado, -semilado,  semilado		];

	var colores = [
				0xFF0000,
				0xFF00FF,
				0xFFFFFF,
				0xFFFF00,
				0x00FF00,
				0x00FFFF,
				0x0000FF,
				0x000000	];

	var indices = [
				0,3,7, 7,3,4, 0,1,2,
				0,2,3, 4,3,2, 4,2,5,
				6,7,4, 6,4,5, 1,5,2,
				1,6,5, 7,6,1, ,7,1,0	];

    for (var i = 0; i < indices.length; i+=3) {
    	var triangulo = new THREE.Face3(indices[i], indices[i+1], indices[i+2]);
    	for (var j = 0; j < 3; j++) {
    		var color = new THREE.Color(colores[indices[i+j]]);
    		triangulo.vertexColors.push(color);
    	}
    	malla.faces.push(triangulo);
    }

    var material = new THREE.MeshBasicMaterial({vertexColors: THREE.vertexColors});
    cubo = new THREE.Mesh(malla, material);

    scene.add(cubo);
}

function loadScene() {

	// Construir el grafo de escena

	// Objeto contenedor
	robot = new THREE.Object3D();
	robot.position.y = 0;
	brazo = new THREE.Object3D();
	brazo.position.y = 0;
	antebrazo = new THREE.Object3D();
	antebrazo.position.y = 0;
	mano = new THREE.Object3D();
	mano.position.y = 0;

	// Modelo externo
	var loader = new THREE.ObjectLoader();
	loader.load('models/hw1/ground.json', 
				function(base){
					base.position.set(0, 0, 0);
					robot.add(base);
	});
	var loader_1 = new THREE.ObjectLoader();
	loader_1.load('models/hw1/sphere.json', 
				function(eje){
					eje.position.set(0, 1.1, 0);
					brazo.add(eje);
	});
	var loader_2 = new THREE.ObjectLoader();
	loader_2.load('models/hw1/cylinder.json', 
				function(esparrago){
					esparrago.position.set(0, 0.5, 0);
					brazo.add(esparrago);
	});
	var loader_3 = new THREE.ObjectLoader();
	loader_3.load('models/hw1/wheel.json', 
				function(rotula){
					rotula.position.set(0, 0, 0);
					brazo.add(rotula);
	});
	var loader_4 = new THREE.ObjectLoader();
	loader_4.load('models/hw1/waist.json', 
				function(disco){
					disco.position.set(0, 1.1, 0);
					antebrazo.add(disco);
	});
	var loader_5 = new THREE.ObjectLoader();
	loader_5.load('models/hw1/bone.json', 
				function(bone){
					bone.position.set(-0.1, 1.5, -0.1);
					antebrazo.add(bone);
	});
	var loader_6 = new THREE.ObjectLoader();
	loader_6.load('models/hw1/head.json', 
				function(head){
					head.position.set(0, 1.9, 0);
					antebrazo.add(head);
	});
	

	//Organizacion de la escena
	
	brazo.add(antebrazo);
	robot.add(brazo);
	scene.add(robot);
	scene.add( new THREE.AxesHelper(3));
}

function update() {

	// Variacion de la escena entre frames
	
}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}







