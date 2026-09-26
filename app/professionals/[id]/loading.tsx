import React from 'react';

export default function ProfessionalDetailLoading() {
  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      {/* Banner Skeleton */}
      <div
        style={{
          height: '280px',
          width: '100%',
          backgroundColor: 'var(--bg-surface-soft)',
          animation: 'pulse 1.5s infinite ease-in-out',
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 600px' }}>
            <div
              style={{
                height: '40px',
                width: '50%',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 'var(--space-4)',
                animation: 'pulse 1.5s infinite ease-in-out',
              }}
            />
            <div
              style={{
                height: '120px',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-6)',
                animation: 'pulse 1.5s infinite ease-in-out',
              }}
            />
          </div>
          <div style={{ flex: '0 0 340px' }}>
            <div
              style={{
                height: '280px',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                animation: 'pulse 1.5s infinite ease-in-out',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
