import { performance } from 'perf_hooks';
import { ByteBuffer, ConcurrentByteBufferPool } from './src'; 

function benchmarkWithoutPool(): number {
    const start = performance.now();

    for (let i = 0; i < 1000000; i++) {
        const buffer = new ByteBuffer(); 

        for (let j = 0; j < buffer.buffer.length; j++) 
            buffer.buffer[j] = j % 256;
        
        buffer.reset();
    }

    const end = performance.now();
    return end - start;
}

function benchmarkWithPool(): number {
    const start = performance.now();

    for (let i = 0; i < 1000000; i++) {
        const buffer = ConcurrentByteBufferPool.acquire();

        for (let j = 0; j < buffer.buffer.length; j++) 
            buffer.buffer[j] = j % 256;
        
        buffer.reset();
        ConcurrentByteBufferPool.release(buffer);
    }

    const end = performance.now();
    return end - start;
}

function runBenchmarks() {
    console.log("Warming up...");

    benchmarkWithoutPool();
    benchmarkWithPool();

    console.log("Running benchmarks...");

    const withoutPoolTime = benchmarkWithoutPool();
    const withPoolTime = benchmarkWithPool();

    console.table([
        {
            'Scenario': 'Without Pool',
            'Time (ms)': withoutPoolTime.toFixed(2),
        },
        {
            'Scenario': 'With Pool',
            'Time (ms)': withPoolTime.toFixed(2),
        }
    ]);
}

runBenchmarks();
