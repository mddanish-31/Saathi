import React from 'react';

export default function ProfessionalDashboardLoading() {
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
        {/* Header Skeleton */}
        <div
          style={{
            height: '120px',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl)',
            marginBottom: 'var(--space-8)',
            border: '1px solid var(--border-subtle)',
            animation: 'pulse 1.5s infinite ease-in-out',
          }}
        />

        {/* Metrics Grid Skeleton */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                height: '90px',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
                animation: 'pulse 1.5s infinite ease-in-out',
              }}
            />
          ))}
        </div>

        {/* Content Skeleton */}
        <div
          style={{
            height: '320px',
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
