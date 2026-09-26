const baseUrl = 'http://localhost:3009';

const tests = [
  // 1. /api/professionals
  {
    name: 'GET /api/professionals (valid)',
    url: `${baseUrl}/api/professionals?limit=2`,
    options: { method: 'GET' },
  },
  {
    name: 'GET /api/professionals (invalid param / out of bounds page)',
    url: `${baseUrl}/api/professionals?page=-1`,
    options: { method: 'GET' },
  },

  // 2. /api/categories
  {
    name: 'GET /api/categories (valid)',
    url: `${baseUrl}/api/categories`,
    options: { method: 'GET' },
  },
  {
    name: 'GET /api/categories/non-existent-category/non-existent-sub (invalid)',
    url: `${baseUrl}/api/categories/non-existent-category/non-existent-sub`,
    options: { method: 'GET' },
  },

  // 3. /api/services
  {
    name: 'GET /api/services (valid)',
    url: `${baseUrl}/api/services?limit=2`,
    options: { method: 'GET' },
  },
  {
    name: 'GET /api/services?category=non-existent-xyz (invalid)',
    url: `${baseUrl}/api/services?category=non-existent-xyz`,
    options: { method: 'GET' },
  },

  // 4. /api/enquiries
  {
    name: 'POST /api/enquiries (valid payload)',
    url: `${baseUrl}/api/enquiries`,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        professionalId: 'pro-vedic-heritage',
        customerName: 'Test Client',
        customerEmail: 'test.client@example.com',
        customerPhone: '+91 98765 43210',
        serviceName: 'Full Vedic Ceremony',
        eventDate: '2026-12-15',
        eventLocation: 'Bengaluru',
        message: 'Diagnostic test enquiry payload.',
      }),
    },
  },
  {
    name: 'POST /api/enquiries (invalid - missing required fields)',
    url: `${baseUrl}/api/enquiries`,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: '',
        message: '',
      }),
    },
  },

  // 5. /api/contact
  {
    name: 'POST /api/contact (valid payload)',
    url: `${baseUrl}/api/contact`,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Anita Desai',
        email: 'anita@example.com',
        phone: '+91 98765 12345',
        subject: 'Concierge Inquiry',
        message: 'Looking for luxury palace venues in Udaipur for 400 guests.',
      }),
    },
  },
  {
    name: 'POST /api/contact (invalid - missing email/message)',
    url: `${baseUrl}/api/contact`,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Incomplete Request',
      }),
    },
  },
];

async function run() {
  console.log('=== API ROUTES DIAGNOSTIC (REAL & INVALID REQUESTS) ===\n');
  for (const test of tests) {
    try {
      const res = await fetch(test.url, test.options);
      let text = await res.text();
      let bodyPreview;
      try {
        const json = JSON.parse(text);
        bodyPreview = JSON.stringify(json, null, 2);
        if (bodyPreview.length > 300) {
          bodyPreview = bodyPreview.slice(0, 300) + '... [truncated]';
        }
      } catch {
        bodyPreview = text.slice(0, 200);
      }

      console.log(`[TEST] ${test.name}`);
      console.log(`HTTP STATUS: ${res.status} ${res.statusText}`);
      console.log(`RESPONSE BODY:`);
      console.log(bodyPreview);
      console.log('--------------------------------------------------\n');
    } catch (err) {
      console.error(`[FAILED] ${test.name}:`, err.message);
    }
  }
}

run();
