import { ByteBuffer, ConcurrentByteBufferPool } from '../src';

describe('ConcurrentByteBufferPool', () => {
    it('should acquire a new buffer if pool is empty', () => {
        const buffer = ConcurrentByteBufferPool.acquire();
        expect(buffer).toBeInstanceOf(ByteBuffer);
    });

    it('should release a buffer back to the local pool', () => {
        const buffer = ConcurrentByteBufferPool.acquire();
        ConcurrentByteBufferPool.release(buffer);

        const buffer2 = ConcurrentByteBufferPool.acquire();
        expect(buffer2).toBe(buffer);
    });

    it('should merge the local pool into the global pool', () => {
        const buffer = ConcurrentByteBufferPool.acquire();
        ConcurrentByteBufferPool.release(buffer);
        ConcurrentByteBufferPool.merge();

        const bufferFromGlobal = ConcurrentByteBufferPool.acquire();
        expect(bufferFromGlobal).toBe(buffer);
    });

    it('should clear the global pool', () => {
        const buffer = ConcurrentByteBufferPool.acquire();
        ConcurrentByteBufferPool.release(buffer);

        ConcurrentByteBufferPool.merge();

        const clearedBuffer = ConcurrentByteBufferPool.clear();
        expect(clearedBuffer).toBe(buffer);

        const bufferFromGlobal = ConcurrentByteBufferPool.acquire();
        expect(bufferFromGlobal).not.toBe(buffer); 
    });
});