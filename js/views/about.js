import View from './view.js';

export default class About extends View {
    init() {
        this.$backBtn = this.$wrap.find('.back-btn');
        this.$aItems = this.$wrap.find('.a-item');
        this.animateData;
        this.$trigger;

        this.$backBtn.on('click', ()=>{
            this.inactivate();
            View.activate('greeting');
        });
    }
    show() {
        this.$wrap.show();
    }
    getAnimateData($trigger) {
        let triggerPos = $trigger[0].getBoundingClientRect();
        let triggerWidth = $trigger.outerWidth();
        let triggerHeight = $trigger.outerHeight();
        let animateData = {};

        this.$aItems.each(function() {
            let $elem = $(this);
            let animateId = Math.random() + '';
            let elemPos = $elem[0].getBoundingClientRect();
            let elemWidth = $elem.outerWidth();
            let elemHeight = $elem.outerHeight();

            let translateX = (triggerPos.left + triggerWidth / 2) - (elemPos.left + elemWidth/2);
            let translateY = (triggerPos.top + triggerHeight / 2) - (elemPos.top + elemHeight/2);

            let scaleX = triggerWidth / elemWidth;
            let scaleY = triggerHeight / elemHeight;

            $(this).data('animate-id', animateId);
            animateData[animateId] = {
                'transform': `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY}) rotateX(${(Math.random()*180 + 180) * (Math.random()<0.5?-1:1)}deg)`
            }
        });
        return animateData;
    }

    setInitAnimateStyle() {
        let animateData = this.animateData;
        this.$aItems.each(function() {
            let $elem = $(this);
            let animateId = $elem.data('animate-id');
            let animateAttrs = animateData[animateId];

            for (var key in animateAttrs) {
                $elem.css(key, animateAttrs[key]);
            }
        });
    }

    setFinalAnimateStyle() {
        this.$aItems.css({
            'transform': 'none'
        });
    }

    activate(data) {
        if (!this.animateData)
        this.animateData = this.getAnimateData(data.$trigger);
        this.$trigger = data.$trigger;
        super.activate();
        // fly from trigger pos
        this.$aItems.removeClass('animate');
        this.setInitAnimateStyle();
        setTimeout(()=>{
            this.$aItems.addClass('animate');
            this.setFinalAnimateStyle();
        }, 10);
    }

    inactivate() {
        super.inactivate();

        if (this.$trigger)
        // backto trigger pos
        setTimeout(()=>{
            this.$aItems.addClass('animate');
            this.setInitAnimateStyle();
        }, 10);
    }
}