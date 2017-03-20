import Time from './common/time.js';
import snippetCreator from './snippets.js';

class Planet extends Time {
    constructor(name, angle, snippetNames) {
        super();
        this.name = name;
        this.angle = angle;
        this.snippetNames = snippetNames;
        this.snippets;
        //this.setup();
    }

    setup() {
        this.snippets = this.snippetNames.map((snippetName)=>{
            return snippetCreator.create(snippetName).plane;
        });
    }
}

let planetData = [
    {
        'name': 'name',
        'angle': 0,
        'snippets': ['name']
    }, 
    {
        'name': 'age',
        'angle': 0,
        'snippets': ['age', 'born']
    },
    {
        'name': 'gender',
        'angle': 0,
        'snippets': ['gender']
    },
    {
        'name': 'hobbies',
        'angle': 0,
        'snippets': ['guitar', 'shufa', 'pingpangqiu', 'yumaoqiu', 'sumiao']
    },
    {
        'name': 'works',
        'angle': 0,
        'snippets': ['meizu', 'tenda']
    },
    {
        'name': 'skills',
        'angle': 0,
        'snippets': ['html5', 'css3']
    },
    
]

let angleStep = Math.PI * 2 / planetData.length;
let planets = {};

for (let i = 0; i < planetData.length; i++) {
    planets[planetData[i].name] = new Planet(
        planetData[i].name,
        angleStep * i,
        planetData[i].snippets
    );
}
export default planets;