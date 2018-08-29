pragma solidity ^0.4.19;

library EventStoreLib {

    event Event(
        uint index,
        address sender,
        bytes32 key,
        bytes32 value
    );

    struct EventStruct {
        uint index;
        address sender;
        bytes32 key;  
        bytes32 value; 
    }

    struct Storage {
        EventStruct[] events;
    }

    function write(
        Storage storage self,
        bytes32 key,
        bytes32 value
    ) public returns (uint) {
        EventStruct memory evt;
        evt.index = self.events.length;
        evt.sender = msg.sender;
        evt.key = key;
        evt.value = value;
        emit Event(evt.index, evt.sender, evt.key, evt.value);
        self.events.push(evt);
        return evt.index;
    }

    function read(Storage storage self, uint index) public constant
    returns (uint, address, bytes32, bytes32 ) {
        EventStruct memory evt = self.events[index];
        return (
            evt.index,
            evt.sender,
            evt.key,
            evt.value
        );
    }   
}
