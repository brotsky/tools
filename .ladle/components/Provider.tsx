import React from 'react';
import type { StoryDefault } from '@ladle/react';

// Simple wrapper component for Ladle stories
// Styles are now handled directly in config.mjs
export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {children}
    </div>
  );
};

export default {
  Provider,
} as StoryDefault;
