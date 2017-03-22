import View from './view.js';

export default class Greeting extends View {
    init() {
        this.$enterBtn = this.$wrap.find('.enter-btn');
        this.$enterBtn.on('click', ()=>{
            this.inactivate();
            View.activate('about', {'$trigger': this.$enterBtn});
        });
    }
}