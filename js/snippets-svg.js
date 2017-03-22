class Snippet {
    constructor(name) {
        this.name = name;
        this.createData = window.ZZC.ASSETS.snippets[name];
        this.create();
        this.mesh;
    }
    create() {
        let geom = new THREE.SVGGemetry(this.createData.d);

        // Normalize the geometry. 
        // Make the geometry centered and have a bounding sphere of radius 1.0.
        // geom.center();

       
        geom.scale(10,10,10);
        if (/[\u4E00-\u9FA5]/.test(this.name)) {
            geom.rotateX(Math.PI);
        }
        // let mat = new THREE.MeshPhongMaterial({
		// 	color: 0x095c75,
		// 	emissive: 0xffffff
		// });
        let mat = new THREE.MeshBasicMaterial({
			color: 0x095c75,
			// emissive: 0xffffff
		});
        this.mesh = new THREE.Mesh(geom, mat);
    }
}

let snippetCreator = {
    create(name) {
        return new Snippet(name);
    }
};
export default snippetCreator;