pragma solidity ^0.4.24;
pragma experimental "ABIEncoderV2";

import "./EventStoreLib64.sol";

contract EventStore64 {

    EventStoreLib64.Storage store;

    address public owner;

    function () public payable { revert("EventStore cannot accept ETH"); }

    constructor() public {
        owner = tx.origin;
    }

    function count() public view 
    returns (uint) {
        return store.events.length;
    }

    function write(bytes32 key1, bytes32 key2, bytes32 value1, bytes32 value2) public {
        EventStoreLib64.write(
            store,
            key1,
            key2,
            value1,
            value2
        );
    }
    
    function read(uint index) public view
    returns (uint, address, bytes32, bytes32, bytes32, bytes32) {
        return EventStoreLib64.read(store, index);
    }

    function destroy(address target) public {
        require(msg.sender == owner, "Only owner can destroy EventStore");
        selfdestruct(target);
    }
}