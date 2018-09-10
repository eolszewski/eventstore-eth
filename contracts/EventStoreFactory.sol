pragma solidity ^0.4.24;
pragma experimental "ABIEncoderV2";

import "./EventStore.sol";

contract EventStoreFactory {

    address[] public eventStores;

    address public owner;

    function () public payable { revert("EventStoreFactory cannot accept ETH"); }
 
    constructor() public {
        owner = msg.sender;
    }

    function createEventStore() public
    returns (address) {
        EventStore eventStore = new EventStore();
        eventStores.push(address(eventStore));
        return address(eventStore);
    }

    function getEventStores() public view
    returns (address[]) {
        return eventStores;
    }

    function destroy(address target) public {
        require(msg.sender == owner, "Only owner can destroy EventStoreFactory");
        selfdestruct(target);
    }
}