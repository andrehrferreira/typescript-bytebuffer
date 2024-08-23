import { ByteBuffer, ByteBufferPool } from '../src';

describe('ByteBufferPool', () => {
    it('should add a buffer to the pool and take it back', () => {
        const pool = new ByteBufferPool();
        const buffer = new ByteBuffer();

        pool.add(buffer);
        const takenBuffer = pool.take();

        expect(takenBuffer).toBe(buffer);
    });

    it('should clear the pool', () => {
        const pool = new ByteBufferPool();
        pool.add(new ByteBuffer());

        const clearedBuffer = pool.clear();
        expect(clearedBuffer).not.toBeNull();
        expect(pool.take()).toBeNull();
    });

    it('should merge another pool into the current pool', () => {
        const pool1 = new ByteBufferPool();
        const pool2 = new ByteBufferPool();

        const buffer1 = new ByteBuffer();
        const buffer2 = new ByteBuffer();

        pool1.add(buffer1);
        pool2.add(buffer2);

        pool1.merge(pool2);

        expect(pool1.take()).toBe(buffer1);
        expect(pool1.take()).toBe(buffer2);
        expect(pool2.take()).toBeNull(); 
    });

    it('should correctly count the length of the pool', () => {
        const pool = new ByteBufferPool();
        expect(pool.length).toBe(0);

        pool.add(new ByteBuffer());
        pool.add(new ByteBuffer());

        expect(pool.length).toBe(2);
    });
});