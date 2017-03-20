import Time from './common/time.js';
import snippetCreator from './snippets.js';

class Planet extends Time {
    constructor(name, snippetNames) {
        super();
        this.name = name;
        // this.angleRange = angleRange;// [Math.PI, Math.PI * 1.3]??
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
        'snippets': ['chaz']
    }, 
    {
        'name': 'age',
        'angle': 0,
        'snippets': ['born']
    },
    {
        'name': 'gender',
        'angle': 0,
        'snippets': ['gender']
    },
    {
        'name': 'hobbies',
        'angle': 0,
        'snippets': ['guitar', 'shufa', 'pingpangqiu', 'lanqiu', 'sumiao']
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

let angleGap = Math.PI * 0.1;
let availableAngle = Math.PI * 2 - planetData.length * angleGap;
let angleStep = availableAngle / planetData.reduce(function(p, c) {
    return p + c.snippets.length;
}, 0);

let planets = {};


let currentAngle = 0;

for (let i = 0; i < planetData.length; i++) {
    
    let planet = new Planet(
        planetData[i].name,
        planetData[i].snippets
    );
    planet.angle = currentAngle + angleStep * planetData[i].snippets.length/2;

    planet.angleItems = planetData[i].snippets.map((snippet)=>{
        return currentAngle += angleStep;
    });
    console.log(planet);

    planets[planetData[i].name] = planet;
    
    currentAngle += angleGap;
}
export default planets;