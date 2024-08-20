import { ByteBuffer } from '../src/bytebuffer';

describe('ByteBuffer', () => {

  test('putInt32 and getInt32', () => {
    const buffer = new ByteBuffer();
    buffer.putInt32(123456);
    buffer.position = 0; 
    const value = buffer.getInt32();
    expect(value).toBe(123456);
  });

  test('putUInt32 and getUInt32', () => {
    const buffer = new ByteBuffer();
    buffer.putUInt32(987654321);
    buffer.position = 0;
    const value = buffer.getUInt32();
    expect(value).toBe(987654321);
  });

  test('putByte and getByte', () => {
    const buffer = new ByteBuffer();
    buffer.putByte(255);
    buffer.position = 0;
    const value = buffer.getByte();
    expect(value).toBe(255);
  });

  test('putBool and getBool', () => {
    const buffer = new ByteBuffer();
    buffer.putBool(true);
    buffer.putBool(false);
    buffer.position = 0;
    const value1 = buffer.getBool();
    const value2 = buffer.getBool();
    expect(value1).toBe(true);
    expect(value2).toBe(false);
  });

  test('putString and getString', () => {
    const buffer = new ByteBuffer();
    const testString = "Hello World!";
    buffer.putString(testString);
    buffer.position = 0;
    const value = buffer.getString();
    expect(value).toBe(testString);
  });

  test('putFloat and getFloat', () => {
    const buffer = new ByteBuffer();
    buffer.putFloat(123.456);
    buffer.position = 0;
    const value = buffer.getFloat();
    expect(value).toBeCloseTo(123.456);
  });

  function closeTo(a: number, b: number, epsilon = 0.0001): boolean {
    return Math.abs(a - b) < epsilon;
  }
  
  test('putVector and getVector', () => {
    const buffer = ByteBuffer.createEmptyByteBuffer();
    const vector = { x: 1.1, y: 2.2, z: 3.3 };
    buffer.putVector(vector);
  
    buffer.position = 0;
    const value = buffer.getVector();
  
    expect(closeTo(value.x, vector.x)).toBe(true);
    expect(closeTo(value.y, vector.y)).toBe(true);
    expect(closeTo(value.z, vector.z)).toBe(true);
  });
  

  test('putRotator and getRotator', () => {
    const buffer = new ByteBuffer();
    const rotator = { pitch: 90.0, yaw: 180.0, roll: 270.0 };
    buffer.putRotator(rotator);
    buffer.position = 0;
    const value = buffer.getRotator();
    expect(value).toEqual(rotator);
  });

  test('putId and getId', () => {
    const buffer = ByteBuffer.createEmptyByteBuffer();
    const id = "123e4567-e89b-12d3-a456-426614174000";    
    const expectedCompactId = "LSZ3N3"; 
  
    buffer.putId(id);
    buffer.position = 0;
    const value = buffer.getId();
  
    expect(value).toBe(expectedCompactId); 
  }); 

  test('toHex', () => {
    const buffer = new ByteBuffer();
    buffer.putInt32(123456);
    const hexString = buffer.toHex();
    expect(hexString).toBe('40e20100');
  });

  test('splitPackets', () => {
    const buffer = ByteBuffer.createByteBufferFromBase64('AAABAAEAAQAAAP7+/v7+/v7+/v7+/v7+/v7+/v4AAAAA');
    const packets = ByteBuffer.splitPackets(buffer);
    expect(packets.length).toBeGreaterThan(0);
  });
});
