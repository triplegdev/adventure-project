const { Food } = require('./food');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // Picks up an item from the current room into the player's inventory
        const pickedUpItem = this.currentRoom.getItemByName(itemName)
        if (pickedUpItem) {
            this.items.push(pickedUpItem)
            const itemIndex = this.currentRoom.items.indexOf(pickedUpItem)
            this.currentRoom.items.splice(itemIndex, 1)
        } else {
         console.log(`${itemName} not found in room`)
        }
        // Your code here
    }

    dropItem(itemName) {
        // Drops an item the player is holding into their current room
        const droppedItem = this.getItemByName(itemName)
       if (droppedItem) {
           this.currentRoom.items.push(droppedItem)
           const itemIndex = this.items.indexOf(droppedItem)
           this.items.splice(itemIndex, 1)
       } else {
        console.log(`${itemName} not found in inventory`)
       }

        // Your code here
    }

    eatItem(itemName) {
        // Allow the player to eat food items, but not non-food items

        // Your code here
        const itemToEat = this.getItemByName(itemName);
        if (itemToEat && itemToEat instanceof Food) {
            const itemIndex = this.items.indexOf(itemToEat);
            this.items.splice(itemIndex, 1);
        }
        else console.log(`You can't eat ${itemName}`);
    }

    getItemByName(name) {
        // Retrieves an item from a player's inventory by item name
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.name === name) return item
          }
        // Your code here
    }
}

module.exports = {
  Player,
};
