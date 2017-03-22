import Time from './common/time.js';
import planets from './planets.js'

// import Stats from 'stats.js';
import BezierEasing from 'bezier-easing';

// var stats = new Stats();
// document.body.appendChild( stats.dom );

export default class Galaxy extends Time {
    constructor() {
        super();

        // 基本场景
        this.renderer = new THREE.WebGLRenderer({ antialias: true , alpha: true});

        this.scene = new THREE.Scene();
        document.body.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0x2abced, 0);

        let fog = new THREE.Fog(0xffffff, 0, 3500);
        fog.opacity = 0.1;
	    this.scene.fog = fog;

        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;

        this.renderer.setSize(winWidth, winHeight);
        this.renderer.setPixelRatio ( 1.5 );

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);

        window.addEventListener('resize', ()=>{this.resize();});
        this.resize();
        

        // 场景参数
        this.radius = 400;
        this.center = new THREE.Vector3(0, 0, 0);


        // planet
        this.planets = planets;

        this._controls// = new THREE.TrackballControls(this.camera, this.renderer.domElement);
		// this._controls.enabled = false;

        this.objects = {};

        this.setup();
        this.render();
    }

    resize() {
        let CAMERA_TO_MAIN_DIS = 100;
        let MAIN_CONTENT_WIDTH = 60;
        let winWidth = window.innerWidth;
        let winHeight = window.innerHeight;
        this.planeRY = 0;
        function calcFov(d, w, r) {
            var f;
            var vertical = w;
            if (r < 1) {
                vertical = vertical/r;
            }
            f = Math.atan(vertical/d/2)*2 * (180 / Math.PI);
            return f;
        }
        this.renderer.setSize(winWidth, winHeight);
        // this.renderer.setViewport (0, 0, winWidth * 1.2, winHeight * 1.2 )
        this.camera.fov = calcFov(CAMERA_TO_MAIN_DIS, MAIN_CONTENT_WIDTH, winWidth / winHeight);
        this.camera.aspect = winWidth / winHeight;
        this.camera.updateProjectionMatrix();
    }

    setup() {
        this.createBasic();
        this.setupPlanet();

        Object.keys(this.objects).forEach((o)=>{ this.scene.add(this.objects[o]);});

        this._controls = new THREE.TrackballControls(this.camera, this.center, this.renderer.domElement);
        this._controls.travel = false;
        this._controls.enabled = false;
    }

    createBasic() {
        let outCircleGeom = new THREE.TorusGeometry( this.radius, 1.3, 2, 200 );

        let outMat = new THREE.MeshBasicMaterial({'color': '#59cced'});
        let outCircle = new THREE.Mesh(outCircleGeom, outMat);
        outCircle.rotation.x = Math.PI * 0.48;
        this.outCircle = outCircle;

        let inCircleGeom = new THREE.TorusGeometry( this.radius + 10, 1.3, 2, 200 );
        let inMat = new THREE.MeshBasicMaterial({'color': '#ddd'});
        let inCircle = new THREE.Mesh(inCircleGeom, inMat);
        inCircle.rotation.x = Math.PI * 0.52;
        inCircle.position.set(10,4,10);
        // inCircle.rotation.x = Math.PI * 0.5;
        this.inCircle = inCircle;


        this.circleGroup = new THREE.Group();
        this.circleGroup.add(outCircle, inCircle);
        this.objects.circleGroup = this.circleGroup;

        let cameraRotate = new THREE.Euler(0, 0, Math.PI * 0.3);
        this.camera.up.applyEuler(cameraRotate);
        // console.log(this.camera.up);
        this.camera.position.set(0,200,800);
        this.camera.lookAt(this.center);
    }

    setupPlanet() {
        let snippetGroup = new THREE.Group();

        let planet;
        for (let key in planets) {
            planet = planets[key];
            planet.setup();

            let randomR = this.radius * (1.1 - 0 * Math.random());
            planet.snippets.forEach((snippet, i)=>{
                snippet.position.set(
                    randomR * Math.cos(planet.angleItems[i]),
                    Math.random() * 10 - 5,
                    randomR * Math.sin(planet.angleItems[i]),
                );
                snippetGroup.add(snippet);
            });
            
        }
        this.objects.snippetGroup = snippetGroup;
    }

    travel() {
        this._controls.setTravel();
        this._controls.travel = true;
        this.travel = true;
    }

    entry() {

        let aniDur = 4000;
        let cameraDur = aniDur + 500;
        let easingFn = (function() {
            let easing0 = BezierEasing(0.5, 0.5, 0.5, 1);
            let easing2 = BezierEasing(0, 0, 1, 1);
            let easing3 = BezierEasing(0.5, 0, 0.5, 1);
            let bezierEasings = [
                function(k) {return easing0(k) * 0.3},
                function(k) {return 0.3 + 0.03 * easing2(k);},
                function(k) { return 0.33 + easing3(k) * 0.67},
            ];
            return function(k) {
                let k3 = (k-0.000000001) * 3
                let index = k3 | 0;
                let _k = k3 - index;
                return bezierEasings[index](_k);
            }
        })();

        this.camera.userData.animate = {
            init: {
                position: new THREE.Vector3(0, 100, 3300),
                lookAt: new THREE.Vector3(0, -500, 500),
                up: new THREE.Vector3(0, 1, 0)
            },
            final: {
                position: this.camera.position.clone(),
                lookAt: this.center.clone(),
                up: this.camera.up.clone()
            }
        };
        this.camera.userData.lookAt = this.camera.userData.animate.init.lookAt;
        // set init status
        
        this.camera.up.copy(this.camera.userData.animate.init.up);
        this.camera.position.copy(this.camera.userData.animate.init.position);

        this.camera.animate(
            this.camera.userData.animate.final,
            cameraDur,
            200,
            {
                easing: easingFn,
                // easing: TWEEN.Easing.Linear.None,
                onComplete: ()=>{
                   this.travel();
                }
            }
        );



        // circle
        let inCircle = this.inCircle;
        inCircle.userData.animate = {
            init: {
                scale: new THREE.Vector3(4,4,4),
                rotation: new THREE.Euler(5, 2, 0.3)
            },
            final: {
                scale: new THREE.Vector3(1,1,1),
                rotation: inCircle.rotation.clone()
            }
        }

        inCircle.scale.copy(inCircle.userData.animate.init.scale);
        inCircle.rotation.copy(inCircle.userData.animate.init.rotation);
        inCircle.animate(
            inCircle.userData.animate.final,
            aniDur,
            0,
            {
                easing: easingFn
            }
        );

        let outCircle = this.outCircle;
        outCircle.userData.animate = {
            init: {
                scale: new THREE.Vector3(3,3,3),
                rotation: new THREE.Euler(2, 6 ,4)
            },
            final: {
                scale: new THREE.Vector3(1,1,1),
                rotation: outCircle.rotation.clone()
            }
        }

        outCircle.scale.copy(outCircle.userData.animate.init.scale);
        outCircle.rotation.copy(outCircle.userData.animate.init.rotation);
        outCircle.animate(
            outCircle.userData.animate.final,
            aniDur,
            0,
            {
                easing: easingFn
            }
        );



        // return;

        // snippets animate
        this.objects.snippetGroup.children.forEach((snippet)=>{
            snippet.userData.animate = {
                init: {
                    position: new THREE.Vector3(//0, Math.random()* -150-120, 0
                        // 0 + Math.random() * 20,
                        // 600 + Math.random() * 20,
                        // 1200 + Math.random() * 20

                        0+Math.random() * 100, 300+Math.random() * 100, 2800
                    ),
                    rotation: new THREE.Euler(
                        0,//Math.random() * Math.PI * 2,
                        0,//Math.random() * Math.PI * 2,
                        (Math.random() * 2 - 1) * Math.PI * 3
                    )
                },
                final: {
                    // position: new THREE.Vector3,
                    position: snippet.position.clone(),
                    rotation: snippet.rotation.clone()
                }
            };
            // set init status
            snippet.position.copy(snippet.userData.animate.init.position);
            snippet.rotation.copy(snippet.userData.animate.init.rotation);

            snippet.animate(
                snippet.userData.animate.final,
                aniDur,
                Math.random() * 500,
                {easing: easingFn}
            );
        });

        let that = this;
        /*let tween = new TWEEN.Tween({p: 1}).to({p: 0}, aniDur).onUpdate(function(){
           
            that.objects.snippetGroup.children.forEach((snippet)=>{
                snippet.rotation.z = snippet.userData.animate.init.rotation.z * this.p;
            });
        });
        tween.start();
        this.addTween(tween);*/

    }

    seePlanet(planetname) {

    }

    render() {
        this.addTick((delta)=>{
            // stats.update();
            this._controls.update();

            if (this._controls.travel) {
                this.circleGroup.rotation.y += 0.002;
                this.objects.snippetGroup.children.forEach((c)=>{
                    c.lookAt(this.camera.position);
                });
            }

            this.renderer.render(this.scene, this.camera);
        });
    }
}
