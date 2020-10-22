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
var l = b = -4;
var r = t = -l;
var cameraControls;

// Acciones
init();
loadScene();
render();

function setCameras(ar) {

	// Construye las camaras planta, alzado, perfil y perspectiva
	var origen = new THREE.Vector3(0, 0, 0);

	if (ar > 1) {
		var camaraOrtografica = new THREE.OrthographicCamera(l*ar, r*ar, t, b, -20, 20);
	}
	else {
		var camaraOrtografica = new THREE.OrthographicCamera(l, r, t/ar, b/ar, -20, 20);
	}

	// Camara perspectiva
	var camaraPerspectiva = new THREE.PerspectiveCamera(70, ar, 0.1, 50);
	camaraPerspectiva.position.set(1, 2, 10);
	camaraPerspectiva.lookAt(origen);

	camera = camaraPerspectiva.clone();
	
	scene.add(camera);

}

function init() {

	// Configurar el motor de render y el canvas
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(new THREE.Color(0x000000));
	renderer.autoClear = false;
	document.getElementById("container").appendChild(renderer.domElement);

	// Escena
	scene = new THREE.Scene();

	// Camara
	var ar = window.innerWidth / window.innerHeight;
	/*camera = new THREE.PerspectiveCamera(50, ar, 0.1, 100);
	scene.add(camera);
	camera.position.set(0.5, 3, 9);
	camera.lookAt(new THREE.Vector3(0, 2, 0));*/

	setCameras(ar);

	// Control de camara
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set(0, 0, 0);
	cameraControls.noKeys = true;

	// Captura de eventos
	window.addEventListener('resize', updateAspectRation);
	renderer.domElement.addEventListener('dblclick', rotate);
}

function rotate(event) {

	// Gira el objeto senyalado 45 grados
	var x = event.clientX;
	var y = event.clientY;

	var derecha = false, abajo = false;
	var cam = null;

	// Cuadrante para la x,y?
	if (x > window.innerWidth/2) {
		x -= window.innerWidth/2;
		derecha = true;
	};
	if (y > window.innerHeight/2) {
		y -= window.innerHeight/2;
		abajo = true;
	};
	if (derecha)
		if (abajo)	cam = camera;
		else 	cam = perfil;
	else 
		if (abajo) cam = planta;
		else cam = alzado;
		

	// Transformacion a cuadrado de 2x2
	x = (2 * x / window.innerWidth) * 2 - 1;
	y = -(2 * y / window.innerHeight) * 2 + 1;

	console.log(x + "," + y);
	var rayo = new THREE.Raycaster();
	rayo.setFromCamera(new THREE.vector2(x, y), camera);

	var interseccion = rayo.intersectObjects(scene.children, true);

	if (interseccion.length > 0) {
		interseccion[0].object.rotation.y += Math.PI/4;
	}
}

function updateAspectRation(argument) {

	// Renueva la relacion de aspecto de la camara

	// Ajustar el tamano del canvas
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Razon de aspecto
	var ar = window.innerWidth/window.innerHeight;

	/* Camara ortografica
	if (ar > 1) { //büyük ise ekranın sol ve sağına tersinde aşağı ve yukarı
		camera.left = -4*ar;
		camera.right = 4*ar;
		camera.bottom = -4;
		camera.top = 4;
	}
	else {
		camera.top = 4/ar;
		camera.bottom = -4/ar;
		camera.left = -4;
		camera.right = 4;
	}
*/

	// Camara perspectiva
	camera.aspect = ar;
	camera.updateProjectionMatrix();
}

function loadScene() {

	// Construir el grafo de escena

	// Materiales
	var material = new THREE.MeshBasicMaterial({color: 'yellow', wireframe: true});
	var material2 = new THREE.MeshBasicMaterial({color: 'red', wireframe: true});

	base = new THREE.Object3D();
	var base_del_robot = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.25, 10, 2), material);
	base_del_robot.position.set(0, 0.25, 0);
	base.add(base_del_robot);

	brazo = new THREE.Object3D();
	var wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.3, 10, 2), material);
	wheel.position.set(0, 0.25, 0);
	brazo.add(wheel);
	var legs = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.3), material);
	legs.position.set(0, 1.5, 0);
	brazo.add(legs);
	var belly = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 10), material);
	belly.position.set(0, 2.5, 0);
	brazo.add(belly);

	antrebrazo = new THREE.Object3D();
	var belt = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.1, 10, 2), material);
	belt.position.set(0, 2.5, 0);
	antrebrazo.add(belt);
	var head = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.3, 10, 2), material);
	head.position.set(0, 4.0, 0);
	antrebrazo.add(head);
	var rib1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), material);
	rib1.position.set(-0.3, 3.3, -0.3);
	antrebrazo.add(rib1);
	var rib2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), material);
	rib2.position.set(-0.3, 3.3, 0.3);
	antrebrazo.add(rib2);
	var rib3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), material);
	rib3.position.set(0.3, 3.3, -0.3);
	antrebrazo.add(rib3);
	var rib4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.7, 0.1), material);
	rib4.position.set(0.3, 3.3, 0.3);
	antrebrazo.add(rib4);

	pinzas = new THREE.Object3D();
	var malla = new THREE.Geometry();
	var semilado = 0.5;

	var coordenadas = [
					 semilado/4, -semilado/2,  semilado,
					 semilado/4, -semilado/2, -semilado,
					 semilado/4,  semilado/2, -semilado,
					 semilado/4,  semilado/2,  semilado,
					-semilado/4,  semilado/2,  semilado,
					-semilado/4,  semilado/2, -semilado,
					-semilado/4, -semilado/2, -semilado,
					-semilado/4, -semilado/2,  semilado,
					 semilado/8, -semilado/4,  semilado*3,
					 semilado/4, -semilado/2,  semilado,
					 semilado/4,  semilado/2,  semilado,
					 semilado/8,  semilado/4,  semilado*3,
					-semilado/8,  semilado/4,  semilado*3,
					-semilado/4,  semilado/2,  semilado,
					-semilado/4, -semilado/2,  semilado,
					-semilado/8, -semilado/4,  semilado*3	];

	var indices = [
				0,3,7, 7,3,4, 0,1,2,	
				0,2,3, 4,3,2, 4,2,5,
				6,7,4, 6,4,5, 1,5,2,
				1,6,5, 7,6,1, 7,1,0,
				8,11,15, 15,11,15, 8,9,10,
				8,10,11, 12,11,10, 12,10,13,
				14,15,12, 14,12,13, 9,13,10,
				9,14,13, 15,14,9, 15,9,8	];

	for(var i = 0; i < coordenadas.length; i+=3){
		var vertice = new THREE.Vector3(coordenadas[i], coordenadas[i+1], coordenadas[i+2]);
		malla.vertices.push(vertice);
	}
	for(var i = 0; i < indices.length; i+=3){
		var triangulo = new THREE.Face3(indices[i], indices[i+1], indices[i+2]);
		malla.faces.push(triangulo);
	}

	cubo = new THREE.Mesh(malla, material);
	cubo.position.set(-0.5, 4.0, 0.5);
	cubo2 = new THREE.Mesh(malla, material);
	cubo2.position.set(0.5, 4.0, 0.5);
	pinzas.add(cubo);
	pinzas.add(cubo2);

	base.add(brazo);
	brazo.add(antrebrazo);
	antrebrazo.add(pinzas);

	base.rotation.y = Math.PI/16;

	robot = new THREE.Object3D();
	robot.position.set(0,0,0);
	robot.add(base);
	scene.add(robot);
	

	// Geometrias
	// var cylinder = new THREE.CylinderGeometry(1.45, 1.45, 0.25, 30);
	// wheel
	/*var cylinder2 = new THREE.CylinderGeometry(0.59, 0.59, 0.38, 30);
	var sphere = new THREE.SphereGeometry(0.55, 30, 30);
	var boks = new THREE.BoxGeometry(0.3, 2.5, 0.3);*/
	// belt
	// var cylinder3 = new THREE.CylinderGeometry(0.75, 0.75, 0.18, 30);
	// head
	/*var cylinder4 = new THREE.CylinderGeometry(0.35, 0.35, 1.38, 30);
	var boks2 = new THREE.BoxGeometry(0.1, 1.7, 0.1);
	var boks3 = new THREE.BoxGeometry(0.1, 1.7, 0.1);
	var boks4 = new THREE.BoxGeometry(0.1, 1.7, 0.1);
	var boks5 = new THREE.BoxGeometry(0.1, 1.7, 0.1);*/
	// Objetos
/*	var ba = new THREE.Mesh(cylinder, material);

	var ground = new THREE.Mesh(cylinder2, material);
	ground.rotation.x = -105;
	ground.rotation.z = -15;
	var head = new THREE.Mesh(sphere, material);
	head.position.y = 3;
	head.rotation.y = 45;
	var body = new THREE.Mesh(boks, material);
	body.position.y = 1.5;
	body.rotation.y = 45;

	var disco = new THREE.Mesh(cylinder3, material);
	disco.position.y = 3;
	disco.rotation.y = 45;
	var head2 = new THREE.Mesh(cylinder4, material);
	head2.position.y = 5;
	head2.rotation.x = 90;
	head2.rotation.z = 55;
	var leg1 = new THREE.Mesh(boks2, material);
	leg1.position.x = -0.2;
	leg1.position.z = -0.2;
	leg1.position.y = 4;
	leg1.rotation.y = 45;
	var leg2 = new THREE.Mesh(boks3, material);
	leg2.position.x = -0.1;
	leg2.position.z = 0.2;
	leg2.position.y = 4;
	leg2.rotation.y = 45;
	var leg3 = new THREE.Mesh(boks4, material);
	leg3.position.x = 0.1;
	leg3.position.z = -0.2;
	leg3.position.y = 4;
	leg3.rotation.y = 45;
	var leg4 = new THREE.Mesh(boks5, material);
	leg4.position.x = 0.3;
	leg4.position.z = 0.2;
	leg4.position.y = 4;
	leg4.rotation.y = 45;*/

	// pinzas

	/*var malla = new THREE.Geometry();
	var semilado = 0.5;

	var coordenadas = [
					 semilado/4, -semilado/2,  semilado,
					 semilado/4, -semilado/2, -semilado,
					 semilado/4,  semilado/2, -semilado,
					 semilado/4,  semilado/2,  semilado,
					-semilado/4,  semilado/2,  semilado,
					-semilado/4,  semilado/2, -semilado,
					-semilado/4, -semilado/2, -semilado,
					-semilado/4, -semilado/2,  semilado,
					 semilado/8, -semilado/4,  semilado*3,
					 semilado/4, -semilado/2,  semilado,
					 semilado/4,  semilado/2,  semilado,
					 semilado/8,  semilado/4,  semilado*3,
					-semilado/8,  semilado/4,  semilado*3,
					-semilado/4,  semilado/2,  semilado,
					-semilado/4, -semilado/2,  semilado,
					-semilado/8, -semilado/4,  semilado*3	];

	var indices = [
				0,3,7, 7,3,4, 0,1,2,	
				0,2,3, 4,3,2, 4,2,5,
				6,7,4, 6,4,5, 1,5,2,
				1,6,5, 7,6,1, 7,1,0,
				8,11,15, 15,11,15, 8,9,10,
				8,10,11, 12,11,10, 12,10,13,
				14,15,12, 14,12,13, 9,13,10,
				9,14,13, 15,14,9, 15,9,8	];

	for(var i = 0; i < coordenadas.length; i+=3){
		var vertice = new THREE.Vector3(coordenadas[i], coordenadas[i+1], coordenadas[i+2]);
		malla.vertices.push(vertice);
	}
	for(var i = 0; i < indices.length; i+=3){
		var triangulo = new THREE.Face3(indices[i], indices[i+1], indices[i+2]);
		malla.faces.push(triangulo);
	}
	cubo = new THREE.Mesh(malla, material);
	cubo.position.x = -0.3;
	cubo.position.y = 4.95;
	cubo.position.z = 0.3;
	cubo.rotation.y = 57;
	cubo2 = new THREE.Mesh(malla, material);
	cubo2.position.x = 0.3;
	cubo2.position.y = 4.95;
	cubo2.position.z = 0.3;
	cubo2.rotation.y = 57;*/


	// Objeto contenedor
	/*pinzes = new THREE.Object3D();
	antebrazo = new THREE.Object3D();
	brazo = new THREE.Object3D();
	base = new THREE.Object3D();
	robot = new THREE.Object3D();*/
	/*esferacubo.position.y = 0.5;
	esferacubo.rotation.y = angulo;*/

	

	//Organizacion de la escena
	/*pinzes.add(cubo);
	pinzes.add(cubo2);*/
	/*antebrazo.add(leg1);
	antebrazo.add(leg2);
	antebrazo.add(leg3);
	antebrazo.add(leg4);
	antebrazo.add(head2);
	antebrazo.add(disco);
	brazo.add(body);
	brazo.add(head);
	brazo.add(ground);
	base.add(brazo);
	base.add(ba);
	
	antebrazo.add(pinzes);
	brazo.add(antebrazo);
	robot.add(base);
	scene.add(robot);*/
	//head2.add( new THREE.AxisHelper(3));
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

	// Thumnail
	renderer.setViewport(0, window.innerHeight/16, 
						window.innerWidth/8, window.innerHeight/8);
	renderer.render(scene, camera); 	

	// Robot
	renderer.setViewport(0, window.innerHeight/4, 
						window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

// https://goktuginal.github.io/usocanvas.html







