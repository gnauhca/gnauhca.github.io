class Snippet {
    constructor(snippetCfg) {
        this.snippetCfg = snippetCfg; // text or imgsrc or ... used by createTexture
        this.mesh = this.createPlane();

        this.cvs = document.createElement('canvas');
        this.cvs.width = 256;
        this.cvs.height = 256;
        this.ctx = this.cvs.getContext('2d');

        this.snippetCfg = snippetCfg; // text or imgsrc or ... used by createTexture
        this.createTexture();
    }
    createPlane() {
        let planeGeom = new THREE.PlaneGeometry(50,50,6,6);
        let planeMat = new THREE.MeshBasicMaterial({color: 0xffffff/*, wireframe: true*/});
    
        planeMat.side = THREE.DoubleSide;
        planeMat.opacity = 1;
        planeMat.transparent = true;
        planeMat.blending = THREE.AdditiveBlending;

        let plane = new THREE.Mesh(planeGeom, planeMat);
        
        plane.scale.multiplyScalar((this.snippetCfg.width|| 100)/100);
        this.plane = plane;

		let outGeom = new THREE.SphereGeometry(20 + Math.random() * 3, 6, 4);
		// outGeom = new THREE.TetrahedronGeometry(100, 0);
		if (Math.random() > 0.5) {
			outGeom = new THREE.BoxGeometry(40, 40, 40);
		}

		let outMat = new THREE.MeshBasicMaterial({color: 0x333333, wireframe: true, opacity: 0.3});
        let out = new THREE.Mesh(outGeom, outMat);


        let group = new THREE.Group();
        group.add(plane);
        // group.add(out);


        return group;
    }
    createTexture() {
        // extends
    }
}

class TextSnippet extends Snippet {
    createTexture() {
        let colors = ['#2ea5c1', '#666', '#abcdef', '#e86240'];
        let text = this.snippetCfg.text;
        let font = this.snippetCfg.font || '100px microsoft yahei';
        let pos = this.snippetCfg.pos || {x: 0, y: 100};

        this.ctx.fillStyle = this.snippetCfg.fillStyle || colors[Math.random()*colors.length|0];
        if (/[\u4E00-\u9FA5]/.test(text)) {
            this.ctx.fillStyle = "#333";
        }
        this.ctx.font = font;
        // this.ctx.font = '100px Georgia';
        this.ctx.fillText(text, pos.x, pos.y);


        // this.strokeStyle = "#f00";
        // this.ctx.strokeRect(50,50,100,100);
 
        let texture = new THREE.CanvasTexture(this.cvs);
        this.plane.material.map = texture;
        this.plane.material.needsUpdate = true;
    }
}
 
class ImgSnippet extends Snippet {
    createTexture() {
        let imgSrc = this.snippetCfg.imgSrc;
        let img = new Image();



        img.onload = ()=>{
            // console.log(img);
            
            let radio = img.width / img.height;
            let drawWidth = this.cvs.width;
            let drawHeight = this.cvs.height;
            if (radio > 1) {
                drawHeight = drawWidth / radio
            } else {
                drawWidth = drawHeight * radio
            }
            // console.log(drawWidth, drawHeight);

            this.ctx.drawImage(
                img,
                0,0,img.width,img.height,
                0,0,drawWidth,drawHeight
            );
            let texture = new THREE.CanvasTexture(this.cvs);

            // document.body.appendChild(this.cvs);
            this.plane.material.map = texture;
            this.plane.material.bumpMap = texture;
            this.plane.material.bumpScale = texture;
            this.plane.material.needsUpdate = true;
        }


        img.src = imgSrc;
    }
}

// concrete Snippet
let snippetCreator = {
    snippets: {
        'nametxt': function() {
            return new TextSnippet({
                text: 'Chaz',
                font: '70px microsoft yahei',
                pos: {x: 50, y: 150}
            })
        },
        'chaz': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.chaz.src,
                width: 40
            }) 
        },
        '周': function() {
            return new TextSnippet({
                text: "周",
                font: "70px yanti",
                pos: {x: 50, y: 150}
            })
        },

        'age': function() {
            return new TextSnippet({
                text: '1991',
                font: '60px Arial',
                pos: {x: 50, y: 150}
            })
        },
        'born': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.born.src,
                width: 25
            }) 
        },

        'gender': function() {
            return new TextSnippet({
                text: "\uf222",
                font: "50px FontAwesome",
                pos: {x: 50, y: 150}
            })
        },

        // hobbies
        'guitar': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.guitar.src,
                width: 30
            }) 
        },
        '永': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets['永'].src,
                width: 35
            }) 
        },
        '篮': function() {
            return new TextSnippet({
                text: "篮",
                font: "50px yanti",
                pos: {x: 50, y: 150}
            })
        },
        'pingpangqiu': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.pingpangqiu.src,
                width: 20
            }) 
        },
        'yumaoqiu': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.yumaoqiu.src,
                width: 20
            }) 
        },
        'lanqiu': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.lanqiu.src,
                width: 20
            }) 
        },
        'sumiao': function() {
            return new TextSnippet({
                text: "\uf040",
                font: "50px FontAwesome",
                pos: {x: 50, y: 150}
            })
        },
        'ironman': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.ironman.src,
                width: 30
            }) 
        },        
        'spiderman': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.spiderman.src,
                width: 40
            }) 
        },

        // works
        '前': function() {
            return new TextSnippet({
                text: "前",
                font: "70px yanti",
                pos: {x: 50, y: 150}
            })
        },
        '端': function() {
            return new TextSnippet({
                text: "端",
                font: "70px yanti",
                pos: {x: 50, y: 150}
            })
        },
        '设': function() {
            return new TextSnippet({
                text: "设",
                font: "70px yanti",
                pos: {x: 50, y: 150}
            })
        },
        '计': function() {
            return new TextSnippet({
                text: "计",
                font: "70px yanti",
                pos: {x: 50, y: 150}
            })
        },
        'meizu': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.meizu.src,
                width: 30
            }) 
        },
        'tenda': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.tenda.src,
                width: 30
            }) 
        },

        // skills
        'html5': function() {
            return new TextSnippet({
                text: "\uf13b",
                font: "80px FontAwesome",
                pos: {x: 50, y: 150},
                fillStyle: '#e54d26'
            })
        },
        'ps': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.ps.src,
                width: 25
            }) 
        },
        'css3': function() {
            return new TextSnippet({
                text: "\uf13c",
                font: "80px FontAwesome",
                pos: {x: 50, y: 150},
                fillStyle: '#3799d6'
            })
        },
        'maya': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.maya.src,
                width: 30
            }) 
        },
    },

    create(name) {
        return snippetCreator.snippets[name]();
    }

};

export default snippetCreator;