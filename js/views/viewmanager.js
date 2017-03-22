import View from './view.js';
import Loading from './loading.js';
import Main from './main.js';
import Greeting from './greeting.js';
import About from './about.js';

View.addView('loading', new Loading('.loading'));
View.addView('main', new Main('.main'));
View.addView('greeting', new Greeting('.greeting'));
View.addView('about', new About('.about'));

export default View;