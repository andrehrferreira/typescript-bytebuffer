import { ByteBuffer, QueueBuffer } from '../src';

describe("QueueBuffer", () => {
    beforeEach(() => {
        QueueBuffer["queues"].clear();
        QueueBuffer["sockets"].clear();
    });

    test("addSocket and getSocket", () => {
        const socketId = "socket1";
        const socketMock = { send: jest.fn() };

        QueueBuffer.addSocket(socketId, socketMock);
        const socket = QueueBuffer.getSocket(socketId);

        expect(socket).toBe(socketMock);
    });

    test("removeSocket", () => {
        const socketId = "socket1";
        const socketMock = { send: jest.fn() };

        QueueBuffer.addSocket(socketId, socketMock);
        QueueBuffer.removeSocket(socketId);
        const socket = QueueBuffer.getSocket(socketId);

        expect(socket).toBeNull();
    });

    test("addBuffer and checkAndSend", () => {
        const socketId = "socket1";
        const socketMock = { send: jest.fn() };

        QueueBuffer.addSocket(socketId, socketMock);

        const buffer = ByteBuffer.createEmptyByteBuffer();
        buffer.putInt32(1234);

        QueueBuffer.addBuffer(socketId, buffer);

        QueueBuffer.tick();

        expect(socketMock.send).toHaveBeenCalledWith(buffer.getBuffer());
    });

    test("isDuplicatePacket", () => {
        const socketId = "socket1";
        const socketMock = { send: jest.fn() };

        QueueBuffer.addSocket(socketId, socketMock);

        const buffer = ByteBuffer.createEmptyByteBuffer();
        buffer.putInt32(1234);

        QueueBuffer.addBuffer(socketId, buffer);

        const isDuplicate = QueueBuffer.isDuplicatePacket(socketId, buffer);

        expect(isDuplicate).toBe(true);
    });

    test("sendBuffers combines multiple buffers", () => {
        const socketId = "socket1";
        const socketMock = { send: jest.fn() };
    
        QueueBuffer.addSocket(socketId, socketMock);
    
        const buffer1 = ByteBuffer.createEmptyByteBuffer();
        buffer1.putInt32(1234); 
    
        const buffer2 = ByteBuffer.createEmptyByteBuffer();
        buffer2.putInt32(5678); 
    
        QueueBuffer.addBuffer(socketId, buffer1);
        QueueBuffer.addBuffer(socketId, buffer2);
    
        QueueBuffer.tick();
    
        expect(socketMock.send).toHaveBeenCalledTimes(1);
    
        const sentBuffer = socketMock.send.mock.calls[0][0];
    
        const expectedLength = buffer1.getBuffer().length + buffer2.getBuffer().length + QueueBuffer["endRepeatByte"] + 5;
        expect(sentBuffer.length).toBe(expectedLength);
    });
    

    test("tick sends remaining buffers", () => {
        const socketId = "socket1";
        const socketMock = { send: jest.fn() };

        QueueBuffer.addSocket(socketId, socketMock);

        const buffer = ByteBuffer.createEmptyByteBuffer();
        buffer.putInt32(1234);

        QueueBuffer.addBuffer(socketId, buffer);

        QueueBuffer.tick();

        expect(socketMock.send).toHaveBeenCalledTimes(1);
    });
});
