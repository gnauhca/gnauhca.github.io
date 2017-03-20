class Snippet {
    constructor(snippetCfg) {
        this.snippetCfg = snippetCfg; // text or imgsrc or ... used by createTexture
        this.plane = this.createPlane();

        this.cvs = document.createElement('canvas');
        this.cvs.width = 256;
        this.cvs.height = 256;
        this.ctx = this.cvs.getContext('2d');

        this.snippetCfg = snippetCfg; // text or imgsrc or ... used by createTexture
        this.createTexture();
    }
    createPlane() {
        let planeGeom = new THREE.PlaneGeometry(100,100,10,10);
        let planeMat = new THREE.MeshBasicMaterial({color: 0xffffff/*, wireframe: true*/});
    
        planeMat.side = THREE.DoubleSide;
        planeMat.opacity = 1;
        planeMat.transparent = true;

        let plane = new THREE.Mesh(planeGeom, planeMat);
        
        plane.scale.multiplyScalar((this.snippetCfg.width|| 100)/100);

        return plane;
    }
    createTexture() {
        // extends
    }
}

class TextSnippet extends Snippet {
    createTexture() {
        let text = this.snippetCfg.text;
        let font = this.snippetCfg.font || '100px microsoft yahei';
        let pos = this.snippetCfg.pos || {x: 0, y: 100};

        this.ctx.fillStyle = '#000';
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
            if (radio > 0) {
                drawHeight = drawWidth / radio
            } else {
                drawWidth = drawHeight / radio
            }

            this.ctx.drawImage(
                img,
                0,0,img.width,img.height,
                0,0,drawWidth,drawHeight
            );
            let texture = new THREE.CanvasTexture(this.cvs);
            // document.body.appendChild(this.cvs);
            this.plane.material.map = texture;
            this.plane.material.needsUpdate = true;
        }


        img.src = imgSrc;
    }
}

// concrete Snippet
let snippetCreator = {
    snippets: {
        'name': function() {
            return new TextSnippet({
                text: 'Chaz',
                font: '70px microsoft yahei',
                pos: {x: 50, y: 150}
            })
        },
        'age': function() {
            return new TextSnippet({
                text: '25',
                font: '30px microsoft yahei'
            })
        },
        'born': function() {
            return new TextSnippet({
                text: '1991.9',
                font: '30px microsoft yahei'
            })
        },

        'gender': function() {
            return new TextSnippet({
                text: "\uf222",
                font: "30px FontAwesome"
            })
        },

        // hobbies
        'guitar': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.guitar.src,
                width: 20
            }) 
        },
        'shufa': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.shufa.src,
                width: 20
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
        'sumiao': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.sumiao.src,
                width: 20
            }) 
        },

        // works
        'meizu': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.meizu.src,
                width: 20
            }) 
        },
        'tenda': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.tenda.src,
                width: 20
            }) 
        },

        // skills
        'html5': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.html5.src,
                width: 20
            }) 
        },
        'css3': function() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.css3.src,
                width: 20
            }) 
        },
    },

    create(name) {
        return snippetCreator.snippets[name]();
    }

};

export default snippetCreator;