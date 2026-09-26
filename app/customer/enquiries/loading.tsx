import React from 'react';

export default function CustomerEnquiriesLoading() {
  return (
    <div
      style={{
        paddingTop: 'var(--space-10)',
        paddingBottom: 'var(--space-20)',
        minHeight: '80vh',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 var(--space-4)' }}>
        <div
          style={{
            height: '40px',
            width: '260px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-6)',
            animation: 'pulse 1.5s infinite ease-in-out',
          }}
        />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: '130px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-xl)',
              marginBottom: 'var(--space-4)',
              border: '1px solid var(--border-subtle)',
              animation: 'pulse 1.5s infinite ease-in-out',
            }}
          />
        ))}
      </div>
    </div>
  );
}
