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
    presetjs: {url: distPath + '/preset.js', size: 8},

    // svg
    /*snippets: {
        url: require('./svg/snippets/snippetssvg.json'), size: 20
    }*/


    // img
    snippets: {
        'chaz': {
            url: require('./images/snippets/chaz.png'), size: 20
        },
        'born': {
            url: require('./images/snippets/born.png'), size: 20
        },
        'guitar': {
            url: require('./images/snippets/guitar.png'), size: 20
        },
        'lanqiu': {
            url: require('./images/snippets/lanqiu.png'), size: 20
        },
        'meizu': {
            url: require('./images/snippets/meizu.png'), size: 20
        },
        'pingpangqiu': {
            url: require('./images/snippets/pingpangqiu.png'), size: 20
        },
        'sumiao': {
            url: require('./images/snippets/sumiao.png'), size: 20
        },
        '永': {
            url: require('./images/snippets/shufa.png'), size: 20
        },
        /*'yumaoqiu': {
            url: require('./images/snippets/yumaoqiu.png'), size: 20
        },*/
        'tenda': {
            url: require('./images/snippets/tenda.png'), size: 20
        },
        'html5': {
            url: require('./images/snippets/html5.png'), size: 20
        },
        'css3': {
            url: require('./images/snippets/css3.png'), size: 20
        },
    }
};
export { ASSETS, BASICASSETS};