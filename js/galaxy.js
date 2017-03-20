import Time from './common/time.js';
import planets from './planets.js'

import Stats from 'stats.js';
import BezierEasing from 'bezier-easing';


var stats = new Stats();
// document.body.appendChild( stats.dom );

export default class Galaxy extends Time {
    constructor() {
        super();

        // 基本场景
        this.renderer = new THREE.WebGLRenderer({ antialias: true , alpha: true});

        this.scene = new THREE.Scene();
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0x2abced, 0);

        let fog = new THREE.Fog(0xffffff, 0, 1500);
	    this.scene.fog = fog;



        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;

        this.renderer.setSize(winWidth, winHeight);

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);

        // 场景参数
        this.radius = 400;


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

        let allGroup = new THREE.Group;

        Object.keys(this.objects).forEach((o)=>{ allGroup.add(this.objects[o]);});

        this.objects.allGroup = allGroup;
        this.scene.add(this.objects.allGroup);

        // Object.keys(this.objects).forEach((o)=>{ this.scene.add(this.objects[o]);});

        this._controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
        this._controls.travel = false;
        this._controls.enabled = false;
    }

    createBasic() {
        let outCircleGeom = new THREE.TorusGeometry( this.radius, 1.3, 2, 200 );

        let outMat = new THREE.MeshBasicMaterial({'color': '#59cced'});
        let outCircle = new THREE.Mesh(outCircleGeom, outMat);
        outCircle.rotation.x = Math.PI * 0.5;
        this.objects.outCircle = outCircle;

        let inCircleGeom = new THREE.TorusGeometry( this.radius + 10, 1.3, 2, 200 );
        let inMat = new THREE.MeshBasicMaterial({'color': '#ddd'});
        let inCircle = new THREE.Mesh(inCircleGeom, inMat);
        inCircle.rotation.x = Math.PI * 0.54;
        inCircle.position.set(2,4,10);
        // inCircle.rotation.x = Math.PI * 0.5;
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

            let randomR = this.radius * (1.1 - 0.2 * Math.random());
            planet.snippets.forEach((snippet, i)=>{
                snippet.position.set(
                    randomR * Math.cos(planet.angleItems[i]),
                    Math.random() * 40 - 20,
                    randomR * Math.sin(planet.angleItems[i]),
                );
                snippetGroup.add(snippet);
            });
            
        }
        this.objects.snippetGroup = snippetGroup;
    }

    travel() {
        // this._controls.travel = true;
        this.travel = true;
    }

    entry() {

        let aniDur = 3000;
        let cameraDur = aniDur + 1000;
        let easingFn = (function() {
            let bezierEasing = BezierEasing(0.2, 0.5, 0.7, 0.2);
            return function(k) {
                // console.log(k);
                return bezierEasing(k);
            }
        })();


        // this.objects.allGroup.rotation.y = -(Math.PI * 2 * cameraDur/this._controls.travelSpeed);
        // this.objects.allGroup.animate({
        //     rotation: new THREE.Euler
        // }, cameraDur, 0, {easing: TWEEN.Easing.Linear.None});

        this.camera.userData.animate = {
            init: {
                position: new THREE.Vector3(0, 100, 200),
                //up: new THREE.Vector3(-1, -1, -1)
            },
            final: {
                position: this.camera.position.clone(),
                //up: this.camera.up.clone()
            }
        };
        this.camera.userData.lookAt = new THREE.Vector3;
        // set init status
        for (let key in this.camera.userData.animate.init) {
            this.camera[key].copy(this.camera.userData.animate.init[key]);
        }

        this.camera.animate(
            this.camera.userData.animate.final,
            cameraDur,
            0,
            {
                easing: TWEEN.Easing.Linear.None,
                onComplete: ()=>{
                   this.travel();
                }
            }
        );

        // snippets animate
        this.objects.snippetGroup.children.forEach((snippet)=>{
            snippet.userData.animate = {
                init: {
                    position: new THREE.Vector3(
                        // 0 + Math.random() * 20,
                        // 600 + Math.random() * 20,
                        // 1200 + Math.random() * 20
                    ),
                    rotation: new THREE.Euler(
                        0,//Math.random() * Math.PI * 2,
                        0,//Math.random() * Math.PI * 2,
                        Math.random() * Math.PI * 2
                    )
                },
                final: {
                    position: snippet.position.clone(),
                    rotation: snippet.rotation.clone()
                }
            };
            // set init status
            for (let key in snippet.userData.animate.init) {
                snippet[key].copy(snippet.userData.animate.init[key]);
            }

            snippet.animate(
                snippet.userData.animate.final,
                aniDur,
                0,
                {easing: easingFn}
            );
        });


    }

    seePlanet(planetname) {

    }

    render() {
        this.addTick((delta)=>{
            stats.update();
            this._controls.update();
            this.objects.allGroup.rotation.y += Math.PI * 2 * delta / 50000;


            // if (this._controls.travel)
            this.objects.snippetGroup.children.forEach((c)=>{
                if (this.travel)
                // c.lookAt(this.camera.position);
                c.rotation.y = -this.objects.allGroup.rotation.y;
            });
            this.renderer.render(this.scene, this.camera);
        });
    }
}
