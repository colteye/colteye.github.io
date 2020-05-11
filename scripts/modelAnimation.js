CANVAS_WIDTH = 1300;
CANVAS_HEIGHT = 850;

var mesh;
var blurredEdges;
const scene = new THREE.Scene();
{
  const color = 0x101025;
  const near = 8;
  const far = 9;
  scene.fog = new THREE.Fog(color, near, far);
}
var	camera = new THREE.PerspectiveCamera( 48.5, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000 );
var renderer = new THREE.WebGLRenderer( { antialiasing: true, alpha: true } );

function init() {
	
	var container = document.getElementById( 'canvas' );
	renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.bias = 0.0001;
	
	container.appendChild( renderer.domElement );

	const controls = new THREE.OrbitControls(camera, renderer.domElement);

	camera.position.z = 11;
	//camera.position.y = 20;
	controls.update();
	controls.enableZoom = controls.enablePan = false;
	
	/*var Pointloader = new THREE.meshDLoader();
	Pointloader.load('./NaPaliCoast.meshd', function (mesh) {

		mesh = mesh;

		var yMin = -10;
		var yMax = 34;
		var colors = [];
		for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
		  let yVal = mesh.geometry.attributes.position.getY(i);
		  let yNorm = (yVal - yMin) / (yMax - yMin);
		  colors.push(1, yNorm+0.4, yNorm);
		}
		
		mesh.geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
		mesh.geometry.computeVertexNormals();


		mesh.material = new THREE.PointsMaterial({size: 0.02, 
												transparent: true,
												vertexColors: THREE.VertexColors});
									
		console.log(mesh);
		mesh.name = "particles";
		mesh.sortParticles = true;
		scene.add(mesh);
	});*/
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.y = 1.1;
	directionalLight.position.x = 1;
	directionalLight.position.z = 1;
	scene.add( directionalLight );
	
	var light = new THREE.AmbientLight( 0x202035 ); // soft white light 
	scene.add( light );

	// instantiate a loader
	var loader = new THREE.PLYLoader();

	// load a resource
	loader.load('./models/moon.ply', function (geometry) {
		
		var tex = new THREE.TextureLoader();
		tex.load( './images/LOLA_map.jpg', function ( texture ) {
		tex.load( './images/LOLA_norm.jpg', function ( normal ) {
		tex.load( './images/LOLA_rough.jpg', function ( roughness ) {
			texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

			material = new THREE.MeshStandardMaterial( { map: texture, normalMap: normal, roughnessMap: roughness } );
			var object = new THREE.Mesh(geometry, material);
			mesh = object;
			mesh.rotation.x = Math.PI / 4.5;
			scene.add(object);
			});});});
	});
};
function animate() {
	requestAnimationFrame( animate );
	mesh.rotation.y += 0.001;
	renderer.render( scene, camera );
};

window.onload = function(){
	init();
	animate();
};