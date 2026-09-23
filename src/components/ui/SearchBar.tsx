import React, { useState } from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface SearchBarProps {
  onSearch?: (query: string, location?: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Try "Bridal stylist", "Interior designer", "Candid photographer"...',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All India');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, location);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`saathi-search-bar ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg-surface)',
        border: '1.5px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '0.45rem',
        boxShadow: 'var(--shadow-md)',
        width: '100%',
        maxWidth: '720px',
        transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
      }}
    >
      {/* Service / Query input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          flex: '1 1 60%',
          paddingLeft: '0.85rem',
          paddingRight: '0.5rem',
        }}
      >
        <Search size={19} color="var(--saathi-maroon)" style={{ flexShrink: 0 }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search service or professional"
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-sm)',
            width: '100%',
          }}
        />
      </div>

      {/* Location / Scope divider */}
      <div
        style={{
          width: '1px',
          height: '24px',
          backgroundColor: 'var(--border-subtle)',
          margin: '0 0.5rem',
          display: 'block',
        }}
      />

      {/* Location / Scope Selector */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          flex: '0 0 auto',
          paddingRight: '0.5rem',
        }}
      >
        <MapPin size={16} color="var(--text-muted)" />
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Location selector"
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <option value="All India">All India</option>
          <option value="Delhi NCR">Delhi NCR</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Chennai">Chennai</option>
          <option value="Jaipur">Jaipur</option>
        </select>
      </div>

      {/* Submit CTA */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        style={{ borderRadius: 'var(--radius-lg)' }}
        rightIcon={<Sparkles size={15} />}
      >
        Search
      </Button>
    </form>
  );
};
