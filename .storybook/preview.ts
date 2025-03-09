// Import Tailwind CSS - this needs to be imported first
import '../src/styles/globals.css';

// Add custom styles for Storybook stories
import { injectGlobal } from '@emotion/css';
import type { Preview } from '@storybook/react';

// Make sure Tailwind classes are available in the preview

// Inject some basic styles for our simplified components
injectGlobal`
  .storybook-alert {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .storybook-alert.destructive {
    background-color: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.5);
    color: rgb(185, 28, 28);
  }

  .storybook-alert.default {
    background-color: rgba(96, 165, 250, 0.1);
    border-color: rgba(96, 165, 250, 0.5);
    color: rgb(30, 64, 175);
  }

  .alert-title {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .alert-content {
    font-size: 0.875rem;
  }

  .storybook-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    padding: 0.125rem 0.625rem;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.25;
    text-transform: uppercase;
    transition: color 0.15s, background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
    border: 1px solid transparent;
  }

  .storybook-badge.default {
    background-color: rgba(96, 165, 250, 0.1);
    border-color: rgba(96, 165, 250, 0.5);
    color: rgb(30, 64, 175);
  }

  .storybook-badge.secondary {
    background-color: rgba(107, 114, 128, 0.1);
    border-color: rgba(107, 114, 128, 0.5);
    color: rgb(55, 65, 81);
  }

  .storybook-badge.destructive {
    background-color: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.5);
    color: rgb(185, 28, 28);
  }

  .storybook-badge.success {
    background-color: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.5);
    color: rgb(22, 101, 52);
  }
`;

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
