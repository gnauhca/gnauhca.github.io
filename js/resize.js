export let resize = {
    body: document.body,
    mainElem: document.querySelector('.main'),
    init() {
        this.resize();
        this.body.className = this.body.className.replace('hide', '');
        window.addEventListener('resize', ()=>{this.resize()});
    },
    resize() {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let maxWidth = 500;
        let mainWidth;
        let scale;
        let transformStr = 'none';
        
        mainWidth = Math.min(windowWidth, windowHeight, maxWidth);

        scale = mainWidth/500;
        
        if (scale !== 1) {
            transformStr = `scale(${scale})`;
        }

        this.mainElem.style['transform'] = transformStr;
        this.mainElem.style['-webkit-transform'] = transformStr;
    }
}