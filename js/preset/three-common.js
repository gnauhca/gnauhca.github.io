
THREE.Object3D.prototype.getLookAt = function () {
	var lookAt = new THREE.Vector3(0, 0, -1);
	var euler = new THREE.Euler( 0, 0, 0, 'XYZ' )

	euler.copy(this.rotation);

	lookAt.applyEuler(euler);
	lookAt.add(this.position);
	return lookAt;
}

// Object3DAnimate
THREE.Object3D.prototype.animate = function(target, dur, delay=0, tweenObj) {
	var object3D = this;
	var init = {};
	var dest = {};
	
	var attrs = ['x', 'y', 'z', 'r', 'g', 'b', 'opacity'];
	var separater = '_';

	function setInit(key) {
		let keyArr = key.split('_');
		let subObj = object3D;

		keyArr.forEach(function(subKey) { subObj = subObj[subKey]; });
		init[key] = subObj;
	}

	if (object3D instanceof THREE.Vector3 && target instanceof THREE.Vector3) {
		// 向量
		['x', 'y', 'z'].forEach(function(pos) {
			init[pos] = object3D[pos];
			dest[pos] = target[pos];
		});
	} else {
		// object3d or material
		for (let key in target) {
			let destKey = key;

			if (key === 'lookAt') {
				let initLookAt = object3D.userData.lookAt || THREE.THREEUtil.getLookAt(object3D);
				['x','y','z'].forEach(function(lookAtKey) {
					init['lookAt_' + lookAtKey] = initLookAt[lookAtKey];
					dest['lookAt_' + lookAtKey] = target['lookAt'][lookAtKey];
				});
			} else {
				if (/color/i.test(key) > 0 && !(target[key] instanceof THREE.Color)) {
					target[key] = new THREE.Color(target[key]);
				}
				if (typeof target[key] === 'object') {
					for (let cKey in target[key]) {
						destKey = key;
						if (attrs.indexOf(cKey) !== -1) {
							destKey += '_' + cKey;
							dest[destKey] = target[key][cKey];
							setInit(destKey);
						}
					}
				} else {
					dest[destKey] = target[key];
					setInit(destKey);
				}
			}
		}
	}

	// console.log(init,dest);
	return new Promise(function(resolve) {
		var tween;
		tweenObj = tweenObj || {};
		tween = new TWEEN.Tween(init)
		tween.to(dest, dur)
			.easing(tweenObj.easing || TWEEN.Easing.Cubic.InOut)
			.onUpdate(function() {
				let current = this;
				for (let currentKey in current) {
					if (currentKey.indexOf('lookAt') === -1) {
						let keyArr = currentKey.split('_');
						let last = keyArr.pop();
						let subObj = object3D;
						keyArr.forEach(function(key) { subObj = subObj[key]; });
						subObj[last] = current[currentKey];
					}
				}

				if (current.lookAt_x) {
					object3D.lookAt(
						new THREE.Vector3(current.lookAt_x, current.lookAt_y, current.lookAt_z)
					);
				}
				tweenObj.onUpdate && tweenObj.onUpdate.call(this);
			})
			.onComplete(function() {
				var completeRemove = true;
				if (tweenObj.onComplete) {
					if (tweenObj.onComplete() === false)
					completeRemove = false;
				}

				object3D.userData.tweens = object3D.userData.tweens.filter(_tween=>_tween!==tween)
				completeRemove && object3D.userData.time.removeTween(tween);
				if (object3D.userData.time.tweens.length === 0) {
					object3D.stopAnimate();
				}
				resolve();
			});

		object3D.userData = object3D.userData || {};
		object3D.userData.tweens =  object3D.userData.tweens||[];
		object3D.userData.tweens.push(tween);

		object3D.userData.time = object3D.userData.time || new Time();
		object3D.userData.time.addTween(tween);
		setTimeout(()=>tween.start(), delay);
	});
}

function stopAnimate() {
	if (this.userData && this.userData.tweens) {
		this.userData.tweens.forEach(tween=>this.userData.time.removeTween(tween));
		this.userData.time.destory();
		delete this.userData.time;
		delete this.userData.tweens;
	}
	return this;
}

THREE.Material.prototype.animate = THREE.Object3D.prototype.animate;
THREE.Vector3.prototype.animate = THREE.Object3D.prototype.animate;
THREE.Object3D.prototype.stopAnimate = stopAnimate;
THREE.Material.prototype.stopAnimate = stopAnimate;
THREE.Vector3.prototype.stopAnimate = stopAnimate;

// geometry
THREE.SVGGemetry = function(svgString, options) {
	var shape = transformSVGPathExposed(svgString);
	var defaultOptions = {
		amount: 5,
		bevelThickness: 0,
		bevelSize: 0,
		bevelSegments: 12,
		bevelEnabled: false,
		curveSegments: 80,
		steps: 1
	};
	var svgGemo;

	try {
		options = $.extend({}, defaultOptions, options);
		svgGemo = new THREE.ExtrudeGeometry(shape, options)
		svgGemo.center();	
		svgGemo.rotateX(Math.PI);
	} catch(e) {}
	return svgGemo;
}

