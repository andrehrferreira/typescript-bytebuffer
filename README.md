# @tos/bytebuffer

`@tos/bytebuffer` is a lightweight and efficient library for managing binary data in TypeScript. It provides functionalities for reading, writing, queuing, and pooling buffers, along with support for generic network connectors (TCP, UDP, WebSocket).

## Installation

To install the library via npm, run:

```bash
npm install @tos/bytebuffer
```

## Features

- Efficient binary data manipulation with `ByteBuffer`.
- Buffer aggregation with `QueueBuffer` to reduce header overhead.
- Buffer pooling with `ByteBufferPool` to optimize memory allocation in high-frequency systems.
- Interface for generic network connectors supporting TCP, UDP, and WebSocket.

## Usage Example

Here is a basic example of how to use the API provided by the library for binary buffer manipulation:

```typescript
import { ByteBuffer, ByteBufferPool, QueueBuffer } from 'typescript-bytebuffer';

// Initializing a ByteBuffer
const buffer = new ByteBuffer();
buffer.putInt32(1234).putString("Hello, ByteBuffer!");

// Resetting and reading the data
buffer.reset();
const num = buffer.getInt32();
const str = buffer.getString();

console.log(num);  // 1234
console.log(str);  // "Hello, ByteBuffer!"

// Using ByteBufferPool to manage buffers
const pool = new ByteBufferPool();
const pooledBuffer = pool.acquire();
pooledBuffer.putFloat(3.14);
pool.release(pooledBuffer);

// Aggregating buffers with QueueBuffer
const queue = new QueueBuffer();
queue.enqueue(buffer);
queue.enqueue(pooledBuffer);

const combinedBuffer = queue.combine();
```

## API

### `ByteBuffer`

The main class for managing binary data. It provides methods for reading and writing various types of binary data.

- **`putInt32(value: number): ByteBuffer`**: Inserts a 32-bit integer into the buffer.
- **`getInt32(): number`**: Reads a 32-bit integer from the buffer.
- **`putString(value: string): ByteBuffer`**: Inserts a UTF-8 encoded string into the buffer.
- **`getString(): string`**: Reads a UTF-8 encoded string from the buffer.
- **`reset(): void`**: Resets the buffer's position for reuse.

### `QueueBuffer`

Aggregates multiple binary buffers to reduce header overhead in packet transmissions.

- **`enqueue(buffer: ByteBuffer): void`**: Adds a buffer to the queue.
- **`combine(): ByteBuffer`**: Combines all enqueued buffers into a single buffer.

### `ByteBufferPool`

Manages a pool of `ByteBuffer` instances to avoid frequent memory allocations, optimizing performance in high-load systems.

- **`acquire(): ByteBuffer`**: Retrieves a buffer from the pool or creates a new one if necessary.
- **`release(buffer: ByteBuffer): void`**: Returns a buffer to the pool, making it available for reuse.

### Generic Connector Interface

Interface for creating generic network adapters that support TCP, UDP, and WebSocket.

- Supports socket creation and handling binary data packets.
- Integration with `ByteBuffer` for easy manipulation of network data.

## Contribution

Contributions are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
