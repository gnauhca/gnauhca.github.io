import Time from './common/time.js';
import planets from './planets.js'

export default class Galaxy extends Time {
    constructor() {
        super();

        // 基本场景
        this.renderer = new THREE.WebGLRenderer({ antialias: true , alpha: true});

        this.scene = new THREE.Scene();
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0x2abced, 0);

        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;

        this.renderer.setSize(winWidth, winHeight);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);

        // 场景参数
        this.radius = 300;


        // planet
        this.planets = planets;

        this._controls// = new THREE.TrackballControls(this.camera, this.renderer.domElement);
		// this._controls.enabled = false;

        this.objects = {};

        this.setup();
        this.render();
    }

    setup() {
        this.createBasic();
        this.setupPlanet();
        Object.keys(this.objects).forEach(function(o) { this.scene.add(this.objects[o]);}.bind(this));

        this._controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
        this._controls.travel = true;
    }

    createBasic() {
        let outCircleGeom = new THREE.TorusGeometry( this.radius, 0.3, 3, 100 );

        let outMat = new THREE.MeshBasicMaterial({'color': '#35b4d9'});
        let outCircle = new THREE.Mesh(outCircleGeom, outMat);
        outCircle.rotation.x = Math.PI * 0.5;
        this.objects.outCircle = outCircle;

        let inCircleGeom = new THREE.TorusGeometry( 300, 0.3, 3, 100 );
        let inMat = new THREE.MeshBasicMaterial({'color': '#35b4d9'});
        let inCircle = new THREE.Mesh(inCircleGeom, inMat);
        inCircle.rotation.x = Math.PI * 0.5;
        this.objects.inCircle = inCircle;


        let cameraRotate = new THREE.Euler(0, 0, Math.PI * 0.3);
        this.camera.up.applyEuler(cameraRotate);
        // console.log(this.camera.up);
        this.camera.position.set(0,200,700);
        this.camera.lookAt(new THREE.Vector3);
    }

    setupPlanet() {
        let snippetGroup = new THREE.Group();

        let planet;
        for (let key in planets) {
            planet = planets[key];
            planet.setup();
            planet.snippets.forEach((snippet, i)=>{
                snippet.position.set(
                    this.radius * Math.cos(planet.angle+i*0.02),
                    Math.random() * 40 - 20,
                    this.radius * Math.sin(planet.angle+i*0.02),
                );
                snippetGroup.add(snippet);
            });
            
        }
        this.objects.snippetGroup = snippetGroup;
    }

    travel() {

    }

    seePlanet(planetname) {

    }

    render() {
        this.addTick(()=>{
            this._controls.update();
             this.objects.snippetGroup.children.forEach((c)=>{
                c.lookAt(this.camera.position);
             });
            this.renderer.render(this.scene, this.camera);
        });
    }
}
