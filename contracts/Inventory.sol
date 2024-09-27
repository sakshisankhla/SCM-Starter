// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Inventory {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        uint256 quantity;
    }

    Item[] public items;
    mapping(uint256 => Item) public itemIdToItem;

    event ItemAdded(uint256 itemId, string name, uint256 quantity);
    event ItemRemoved(uint256 itemId, string name);
    event ItemUpdated(uint256 itemId, uint256 quantity);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    // Function to check if an item exists by its ID
    function itemExists(uint256 _id) internal view returns (bool) {
        return bytes(itemIdToItem[_id].name).length > 0; // Check if item with the given ID has a non-empty name
    }

    function addItem(uint256 _id, string memory _name, uint256 _quantity) public onlyOwner {
        require(!itemExists(_id), "Item with this ID already exists");

        Item memory newItem = Item({id: _id, name: _name, quantity: _quantity});
        items.push(newItem);
        itemIdToItem[_id] = newItem;
        emit ItemAdded(_id, _name, _quantity);
    }

    function removeItem(uint256 _id) public onlyOwner {
        string memory itemName = itemIdToItem[_id].name;

        bool itemFound = false;

        for (uint256 i = 0; i < items.length; i++) {
            if (items[i].id == _id) {
                itemFound = true;
                delete itemIdToItem[_id]; // Delete from mapping

                // Shift the remaining elements to fill the gap
                for (uint256 j = i; j < items.length - 1; j++) {
                    items[j] = items[j + 1];
                }
                items.pop(); // Remove the last item in the array, as it's now duplicated

                emit ItemRemoved(_id, itemName);
                break;
            }
        }

        require(itemFound, "Item with the given ID does not exist");
    }

    function updateItemQuantity(uint256 _id, uint256 _newQuantity) public onlyOwner {
        
        Item storage item = itemIdToItem[_id];
        require(bytes(item.name).length != 0, "Item with the given ID does not exist"); // Ensure the item exists
        item.quantity = _newQuantity;

        // Update the item in the array
        bool itemFound = false;
        for (uint256 i = 0; i < items.length; i++) {
            if (items[i].id == _id) {
                items[i].quantity = _newQuantity;
                itemFound = true;
                break;
            }
        }

        require(itemFound, "Item with the given ID does not exist in the array");

        emit ItemUpdated(_id, _newQuantity);
    }


    // function getItem(uint256 _id) public view returns (Item memory) {
    //     require(itemExists(_id), "Item with this ID does not exist");
    //     return itemIdToItem[_id];
    // }

    function getAllItems() public view returns (Item[] memory) {
        return items;
    }
}
