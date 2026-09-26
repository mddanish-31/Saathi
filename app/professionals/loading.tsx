import React from 'react';

export default function ProfessionalsLoading() {
  return (
    <div
      style={{
        paddingTop: 'var(--space-12)',
        paddingBottom: 'var(--space-20)',
        minHeight: '80vh',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-4)' }}>
        {/* Hero skeleton */}
        <div
          style={{
            height: '180px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            marginBottom: 'var(--space-8)',
            animation: 'pulse 1.5s infinite ease-in-out',
            border: '1px solid var(--border-subtle)',
          }}
        />

        {/* Grid skeleton */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                height: '360px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                padding: 'var(--space-4)',
                animation: 'pulse 1.5s infinite ease-in-out',
              }}
            >
              <div
                style={{
                  height: '140px',
                  backgroundColor: 'var(--bg-surface-soft)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <div
                style={{
                  height: '24px',
                  width: '60%',
                  backgroundColor: 'var(--bg-surface-soft)',
                  borderRadius: 'var(--radius-sm)',
                }}
              />
              <div
                style={{
                  height: '16px',
                  width: '90%',
                  backgroundColor: 'var(--bg-surface-soft)',
                  borderRadius: 'var(--radius-sm)',
                }}
              />
              <div
                style={{
                  height: '36px',
                  marginTop: 'auto',
                  backgroundColor: 'var(--bg-surface-soft)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
