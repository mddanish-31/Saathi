const autocannon = require('autocannon');

async function run() {
  console.log('Starting mixed query params benchmark on http://localhost:3009/api/professionals ...');
  
  const requests = [
    { method: 'GET', path: '/api/professionals?category=weddings-events' },
    { method: 'GET', path: '/api/professionals?category=music-entertainment' },
    { method: 'GET', path: '/api/professionals?city=Mumbai' },
    { method: 'GET', path: '/api/professionals?city=Bengaluru' },
    { method: 'GET', path: '/api/professionals?city=Delhi%20NCR' },
    { method: 'GET', path: '/api/professionals?page=1&limit=5' },
    { method: 'GET', path: '/api/professionals?page=2&limit=5' },
    { method: 'GET', path: '/api/professionals?search=Aura' },
    { method: 'GET', path: '/api/professionals?search=Singhal' },
    { method: 'GET', path: '/api/professionals?search=Beatbox' },
    { method: 'GET', path: '/api/professionals?category=weddings-events&city=Mumbai' },
    { method: 'GET', path: '/api/professionals?category=music-entertainment&city=Goa' }
  ];

  const result = await autocannon({
    url: 'http://localhost:3009',
    connections: 20,
    duration: 10,
    pipelining: 1,
    requests
  });

  console.log('\n--- AUTOCANNON BENCHMARK RESULT (MIXED QUERIES) ---');
  console.log(autocannon.printResult(result, { renderResultsTable: true }));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
