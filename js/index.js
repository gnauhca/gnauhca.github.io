import '../css/index.scss';
import 'script-loader!jquery';
import Detector from './common/detector.js';
import {resize} from './resize.js';
import Galaxy from './galaxy.js';
import { ASSETS, BASICASSETS } from '../assets/assets.js';
import Loader from './common/loader.js';
import viewManager from './views/viewmanager.js';

let loadingView = viewManager.getView('loading');
let mainView = viewManager.getView('main');

window.loadingView = loadingView;

let assetsLoader = new Loader();


if (!!window.ActiveXObject || "ActiveXObject" in window) {
    $('html').addClass('ie');
}

// webgl
if (Detector.webgl) {

    assetsLoader.load(BASICASSETS).then(()=>{

        viewManager.activate('loading');

        document.body.style.visibility = 'visible';

        assetsLoader.load(ASSETS, (p)=>{
            // console.log(p);
            loadingView.setPercent(p*100|0);
        })
        .then((assets)=>{
            // excute preset.js
            let script = document.createElement('script');
            script.src = assets.presetjs.src;

            script.onload = ()=>{
                
                setTimeout(()=>{
                    viewManager.inactivate('loading');
                    init();
                }, TIME_1000);
            };
            document.body.appendChild(script);

            window.ZZC = {};
            window.ZZC.ASSETS = assets;
            // console.log(ASSETS, assets);
        });

    });
} else {
    $('html').addClass('no-webgl');
    viewManager.activate('main');
    viewManager.activate('greeting');
}


function init() {





TIME.start();


let galaxy = new Galaxy();
galaxy.entry();

setTimeout(()=>{
    viewManager.activate('main');
}, TIME_3500);
setTimeout(()=>{
    viewManager.activate('greeting');
}, TIME_4500);




// hover rotate plugin
class HoverRotate {

    constructor(elem) { 
        this.maxRotate = 50;
        this.$elem = $(elem);
        this.$effectElem = this.$elem.find('.a-item-box');
        this.init();
        this.resize();
    }

    init() {
        $(window).on('resize', this.resize.bind(this));
        this.$elem.hover(()=>{
            this.$elem.on('mousemove', this.mousemove.bind(this));
        }, ()=>{
            this.$elem.off('mousemove');
            this.reset();
        });
    }
    resize() {
        this.width = this.$elem.width();
        this.height = this.$elem.height();
        this.center = {
            x: this.width/2,
            y: this.height/2
        }
    }

    reset() {
        this.$effectElem.css({
            'transform': `rotate3d(0,0,0,0)`,
            'filter': 'none'
        });
    }

    mousemove(e) {
        let pos = this.$elem[0].getBoundingClientRect();
        let mouseRelativeX = e.clientX - pos.left;
        let mouseRelativeY = e.clientY - pos.top;


        let rotateX = (mouseRelativeX - this.center.x)/this.width;
        let rotateY = (mouseRelativeY - this.center.y)/this.height;

        if (rotateX * rotateY >=0) {
            rotateX *= -1;
        } else {
            rotateY *= -1;
        }


        let rotateAngle = (Math.abs(rotateX) + Math.abs(rotateY)) * this.maxRotate + 'deg';

        // console.log(`rotate3d(${rotateX}, ${-rotateY}, 0, ${rotateAngle})`);

        this.$effectElem.css({
            'transform': `rotate3d(${rotateX}, ${rotateY}, 0, ${rotateAngle})`,
            'filter': `brightness(${1- Math.abs(rotateX)*0.1})`
        });
    }
}

$.fn.hoverRotate = function($) {
    this.each(function() {
        new HoverRotate(this);
    });
    
    return this;
};

$('.a-item').hoverRotate();

resize.init();



}