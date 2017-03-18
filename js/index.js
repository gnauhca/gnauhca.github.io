import 'script-loader!jquery';
import '../css/index.scss';
import {resize} from './resize.js';


// enter change
(function() {
    let $greeting = $('.greeting');
    let $about = $('.about');

    let $enterBtn = $('.enter-btn');
    let $backBtn = $('.back-btn');
    let $aItems = $('.a-item');

    let animateData = {};
    


    function init() {
        resize();
        hideAbout();
        $greeting.addClass('animate');
        $about.addClass('animate');
        $enterBtn.on('click', function() {
            showAbout();
        });
        $backBtn.on('click', function() {
            hideAbout();
        });
    }

    function showAbout() {
        $greeting.addClass('invisible');
        $about.removeClass('invisible');
        escapeFromEnter();
    }

    function hideAbout() {
        $about.addClass('invisible');
        $greeting.removeClass('invisible');
        hideIntoEnter();
    }

    function resize() {
        setAnimateData();
    }

    // calc escapeFromEnter attr
    function setAnimateData() {
        let enterPos = $enterBtn[0].getBoundingClientRect();
        let enterWidth = $enterBtn.outerWidth();
        let enterHeight = $enterBtn.outerHeight();

        $aItems.each(function() {
            let $elem = $(this);
            let animateId = Math.random() + '';
            let elemPos = $elem[0].getBoundingClientRect();
            let elemWidth = $elem.outerWidth();
            let elemHeight = $elem.outerHeight();

            let translateX = enterPos.left - elemPos.left;
            let translateY = enterPos.top - elemPos.top;

            let scaleX = enterWidth / elemWidth;
            let scaleY = enterHeight / elemHeight;

            $(this).data('animate-id', animateId);
            animateData[animateId] = {
                'transform': `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY}) rotateX(${Math.random()*360-180}deg)`
            }
        });
    }
    

    function hideIntoEnter() {
        $aItems.each(function() {
            let $elem = $(this);
            let animateId = $elem.data('animate-id');
            let animateAttrs = animateData[animateId];

            for (var key in animateAttrs) {
                $elem.css(key, animateAttrs[key]);
            }
        });
    }

    function escapeFromEnter() {
        $aItems.css({
            'transform': 'none'
        });
    }

    init();
})();


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
            'transform': `rotate3d(0,0,0,0)`
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
            'transform': `rotate3d(${rotateX}, ${rotateY}, 0, ${rotateAngle})`
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
