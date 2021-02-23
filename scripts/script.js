/* 

x. Set up the request method for the app, and return a valid object
x. Set up and HTML Skeleton
x. Start routing some of the data we return from the API onto the screen


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
        if(value < 5 || value > 99) {
            console.log("Pokémon level must be between 5 and 99");
            return;
        }
        this._level = value;
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
    
    
    // getRegionalMoveSet(regionKey) {
    //     const regionalMoveList = [];
    //     for (const item in this.moveList) {
    //         let move = this.moveList[item];
    //         let versionDetails = move.version_group_details;
    //         for(const version in versionDetails) {
    //             if (versionDetails[version].version_group.name === regionKey && versionDetails[version].move_learn_method.name === "level-up") {

    //                 let moveSlot = {};
    //                 moveSlot["name"] = capitalize(move.move.name);
    //                 moveSlot["details"] = versionDetails[version];

    //                 regionalMoveList.push(moveSlot);
    //             }
    //         }
    //     }
    //     regionalMoveList.sort(function(a,b) {
    //         return a.details.level_learned_at - b.details.level_learned_at;
    //     });
    //     return regionalMoveList;
    // }
}



function capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}


function getNextFiveMovesByLevel(monsterRegionalMoveSet) {
    console.log(monsterRegionalMoveSet);

}

function pushToPage(pokemonObject) {
    //pull out the variable you need
    const spriteImg = document.createElement('img');
    spriteImg.src = pokemonObject.sprite;
    spriteImg.alt = "Sprite image of " + pokemonObject.name + ", from Pokémon FR/LG.";

    //push to parent element
    document.getElementById("poke-name").innerHTML = pokemonObject.monsterName;
    document.querySelector('.picturebox').appendChild(spriteImg);


}


const slotSelector = document.getElementById('slotSelect');
for (i = 0; i < slotSelector.length; i++) {
    let slot = slotSelector[i];
    console.log(slot.value);
}

slotSelector.addEventListener('change', (event) => {
});

const req = new Request('https://pokeapi.co/api/v2/pokemon/venusaur');

fetch(req).then(response => {
    if(response.status === 200) {
        return response.json();
    } else {
        throw new Error('Check your API, bozo!');
    }
}).then(response => {
    let monster = new Pokemon(response.name, response.id, '50', response.sprites.front_default, response.moves, "red-blue");

    console.log(monster);



    pushToPage(monster);




}).catch(error => {
    console.error(error);
});





