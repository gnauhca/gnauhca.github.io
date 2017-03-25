const distPath = './dist';

const BASICASSETS = {
    fonts: [
        {url: 'http://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0', size: 76},
        {url: 'http://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0', size: 76},
        // {url: require('../css/fonts/yanti.woff'), size: 76},
        // {url: require('../css/fonts/yanti.ttf'), size: 76},
    ], 
};

const ASSETS = {
    presetjs: {url: distPath + '/preset.js', size: 220},

    // svg
    /*snippets: {
        url: require('./svg/snippets/snippetssvg.json'), size: 20
    }*/


    // img
    snippets: {
        'chaz': {
            url: require('./images/snippets/chaz.png'), size: 10
        },
        'born': {
            url: require('./images/snippets/born.png'), size: 10
        },
        'guitar': {
            url: require('./images/snippets/guitar.png'), size: 10
        },
        'lanqiu': {
            url: require('./images/snippets/lanqiu.png'), size: 10
        },
        'pingpangqiu': {
            url: require('./images/snippets/pingpangqiu.png'), size: 10
        },
        'sumiao': {
            url: require('./images/snippets/sumiao.png'), size: 10
        },
        'ps': {
            url: require('./images/snippets/ps.png'), size: 10
        },
        'maya': {
            url: require('./images/snippets/maya.png'), size: 10
        },
        '永': {
            url: require('./images/snippets/shufa.png'), size: 10
        },
        'yumaoqiu': {
            url: require('./images/snippets/yumaoqiu.png'), size: 10
        },
        'ironman': {
            url: require('./images/snippets/ironman.jpg'), size: 10
        },
        'spiderman': {
            url: require('./images/snippets/spiderman.png'), size: 3
        },


        /*'meizu': {
            url: require('./images/snippets/meizu.png'), size: 10
        },
        /*'tenda': {
            url: require('./images/snippets/tenda.png'), size: 10
        },
        'html5': {
            url: require('./images/snippets/html5.png'), size: 10
        },
        'css3': {
            url: require('./images/snippets/css3.png'), size: 10
        },*/
    }
};
export { ASSETS, BASICASSETS};