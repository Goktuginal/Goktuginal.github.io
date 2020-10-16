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

function loadScene() {

	// Construir el grafo de escena

	// Materiales
	var material = new THREE.MeshBasicMaterial({color: 'yellow', wireframe: true});

	// Geometrias
	var cylinder = new THREE.CylinderGeometry(2.5, 2.5, 1.5);
	//var geoesfera = new THREE.SphereGeometry(1, 3, 3);

	// Objetos
	var base = new THREE.Mesh(cylinder, material);

	// Orden de las transformaciones TRS
	//cubo.rotation.y = Math.PI/4;
	//cubo.position.x = -1;
	//var esfera = new THREE.Mesh(geoesfera, material);
	//esfera.position.x = 1;

	// Objeto contenedor
	robot = new THREE.Object3D();
	/*esferacubo.position.y = 0.5;
	esferacubo.rotation.y = angulo;*/

	// Modelo externo
	/*var loader = new THREE.ObjectLoader();
	loader.load('models/soldado/soldado.json', 
				function(obj){
					obj.position.set(0, 1, 0);
					cubo.add(obj);
	});*/

	//Organizacion de la escena
	
	robot.add(base);
	scene.add(robot);
	scene.add( new THREE.AxisHelper(3));
}

function update() {

	// Variacion de la escena entre frames
	//angulo += Math.PI/100;
	//esferacubo.rotation.y = angulo;

}

function render() {
	
	// Construir el frame y mostrarlo
	requestAnimationFrame(render);
	update();
	renderer.render(scene, camera);
}







