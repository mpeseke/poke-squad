/* 

X. need to shepherd pokemon data into a single cell (css)
2. need to implement correct search functionality (invovle region methods)
3. need to make the push function work for multiple cells(js) 

Backlog: 
HP/Status Display 
 1. Manually 
 2. Automagically 
Learn assembly
*/
class Pokemon {
    constructor(name, id, level, sprite, moveList, regionKey) {
        this.name = name;
        this.id = id;
        this.level = level;
        this.sprite = sprite;
        this.moveList = moveList;
        this.regionKey = regionKey;
    }

    get name() {
        const properName = capitalize(this._name);
        return properName;
    }

    set name(value) {
        this._name = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        if(value < 1 ||value > 151) {
            console.log("Pokémon ID must be between 1 and 151.");
            return;
        }
        this._id = value;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        if(value < 1 || value > 99) {
            console.log("Pokémon level must be between 1 and 99");
            return;
        }
        this._level = value;
    }

    get sprite() {
        return this._sprite;
    }

    set sprite(value) {
        return this._sprite = value;
    }

    get moveList() {
        return this._moveList;
    }

    set moveList(list) {
        return this._moveList = list;
    }

    get regionKey() {
        return this._regionKey;
    }

    set regionKey(value) {
        this._regionKey = value;
    }
    
}

function getRegionalMoveSet(rawList) {
    console.log("In getRegionalMoveSet()" + rawList);
    const regionalMoveList = [];
    for (const item in rawList) {
        let move = rawList[item];
        let versionDetails = move.version_group_details;
        for(const version in versionDetails) {
            if (versionDetails[version].version_group.name === this.regionKey && versionDetails[version].move_learn_method.name === "level-up") {

                let moveSlot = {};
                moveSlot["name"] = capitalize(move.move.name);
                moveSlot["details"] = versionDetails[version];

                regionalMoveList.push(moveSlot);
            }
        }
    }
    regionalMoveList.sort(function(a,b) {
        return a.details.level_learned_at - b.details.level_learned_at;
    });

    console.log(regionalMoveList);
    return regionalMoveList;
}



function capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function getNextFiveMovesByLevel(monsterRegionalMoveSet) {
    console.log(monsterRegionalMoveSet);

}

function createCellSkeleton(cellNumber) {
    const fillCell = document.getElementById('slot'+cellNumber);
    const elements = ['figure', 'picture', 'img','figcaption', 'ul', 'li']

    const childElement;

    for (let element of elements) {
        childElement = document.createElement(element);
        
    }


    const spriteFig = document.createElement('figure');
    const spritePic = document.createElement('picture');
    const spriteImg = document.createElement('img');
    const spriteCap = document.createElement('figcaption');
    const moveList = document.createElement('ul');
    spritePic.appendChild(spriteImg);
    spriteFig.appendChild(spritePic);
    spriteFig.appendChild(spriteCap);
    fillCell.appendChild(spriteFig);
    fillCell.appendChild(moveList);

    console.log(fillCell);
}

function pushToCell(pokemonObject, cellNumber) {
    console.log(pokemonObject, cellNumber);
    createCellSkeleton(cellNumber);

    



}

function searchMonster() {
    const grabName = document.getElementById('nameInput').value;
    const grabRegion = document.getElementById('regionInput').value;
    const grabLevel = document.getElementById('levelInput').value;

    const req = new Request('https://pokeapi.co/api/v2/pokemon/' + grabName);

    fetch(req).then(response => {
        if(response.status === 200) {
            return response.json();
        } else {
            throw new Error('Check your API, bozo!');
        }
    }).then(response => {
        let monster = new Pokemon(response.name, response.id, grabLevel, response.sprites.front_default, response.moves, grabRegion);
        let slotNumber = document.getElementById('slotSelect').value;
        pushToCell(monster, slotNumber);
    
    }).catch(error => {
        console.error(error);
    });
    
}







