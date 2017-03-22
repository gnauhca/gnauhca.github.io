let views = {};

class View {
    static activate(name, data) {
        views[name].activate(data);
    }
    static inactivate(name, data) {
        views[name].inactivate(data);
    }

    static addView(name, view) {
        views[name] = view;
    }

    static getView(name, view) {
        return views[name];
    }

    constructor(wrap) {
        this.$wrap = $(wrap);
        this.viewClass = 'view';
        this.activeClass = 'active';
        this.inactiveClass = 'inactive';
        this.inactivate();
        this.$wrap.addClass(this.viewClass);
        this.init();
    }
    init() {}
    activate(data) {
        this.$wrap.removeClass(this.inactiveClass);
        this.$wrap.addClass(this.activeClass);
    }
    inactivate(data) {
        this.$wrap.addClass(this.inactiveClass);
        this.$wrap.removeClass(this.activeClass);
    }
}
export default View;