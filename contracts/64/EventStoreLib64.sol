pragma solidity ^0.4.24;

library EventStoreLib64 {

    event Event(
        uint index,
        address sender,
        bytes32 key1,
        bytes32 key2,
        bytes32 value1,
        bytes32 value2
    );

    struct EventStruct {
        uint index;
        address sender;
        bytes32 key1;
        bytes32 key2;
        bytes32 value1;
        bytes32 value2;
    }

    struct Storage {
        EventStruct[] events;
    }

    function write(
        Storage storage self,
        bytes32 key1,
        bytes32 key2,
        bytes32 value1,
        bytes32 value2
    ) public returns (uint) {
        EventStruct memory evt;
        evt.index = self.events.length;
        evt.sender = msg.sender;
        evt.key1 = key1;
        evt.key2 = key2;
        evt.value1 = value1;
        evt.value2 = value2;
        emit Event(evt.index, evt.sender, evt.key1, evt.key2, evt.value1, evt.value2);
        self.events.push(evt);
        return evt.index;
    } 

    function read(Storage storage self, uint index) public view
    returns (uint, address, bytes32, bytes32, bytes32, bytes32 ) {
        EventStruct memory evt = self.events[index];
        return (
            evt.index,
            evt.sender,
            evt.key1,
            evt.key2,
            evt.value1,
            evt.value2
        );
    }   
}
