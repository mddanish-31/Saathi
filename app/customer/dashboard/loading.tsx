import React from 'react';

export default function CustomerDashboardLoading() {
  return (
    <div
      style={{
        paddingTop: 'var(--space-10)',
        paddingBottom: 'var(--space-20)',
        minHeight: '80vh',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-4)' }}>
        <div
          style={{
            height: '110px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            marginBottom: 'var(--space-8)',
            border: '1px solid var(--border-subtle)',
            animation: 'pulse 1.5s infinite ease-in-out',
          }}
        />
        <div
          style={{
            height: '240px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-subtle)',
            animation: 'pulse 1.5s infinite ease-in-out',
          }}
        />
      </div>
    </div>
  );
}
