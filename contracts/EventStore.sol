pragma solidity ^0.4.24;
pragma experimental "ABIEncoderV2";

import "./EventStoreLib.sol";

contract EventStore {

    EventStoreLib.Storage store;

    address public owner;

    function () public payable { revert("EventStore cannot accept ETH"); }
 
    constructor() public {
        owner = tx.origin;
    }

    function count() public view 
    returns (uint) {
        return store.events.length;
    }

    function write(bytes32 key, bytes32 value) public {
        EventStoreLib.write(
            store,
            key,
            value
        );
    }
    
    function read(uint index) public view
    returns (uint, address, bytes32, bytes32 ) {
        return EventStoreLib.read(store, index);
    }

    function destroy(address target) public {
        require(msg.sender == owner, "Only owner can destroy EventStore");
        selfdestruct(target);
    }
}