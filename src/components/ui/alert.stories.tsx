// Alert component stories for Ladle
// Using React.createElement to avoid webpack parsing issues with JSX
import React from 'react';

// Define the props interface for the Alert component
interface AlertProps {
  /** The content to display in the alert */
  children?: React.ReactNode;
  /** The variant style of the alert */
  variant?: 'default' | 'destructive';
  /** Optional title for the alert */
  title?: string;
}

// Create a simple Alert component for our stories using inline styles
function Alert(props: AlertProps) {
  const { children, variant = 'default', title } = props;
  
  // Base styles for the alert container
  const baseStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid',
  };
  
  // Variant-specific styles
  const variantStyle = variant === 'default' 
    ? {
        backgroundColor: '#ebf5ff',
        borderColor: '#3b82f6',
        color: '#1e40af',
      }
    : {
        backgroundColor: '#fee2e2',
        borderColor: '#ef4444',
        color: '#b91c1c',
      };
  
  // Styles for title
  const titleStyle = {
    marginTop: 0,
    marginBottom: '0.5rem',
    fontWeight: 600,
  };
  
  // Styles for content
  const contentStyle = {
    fontSize: '0.875rem',
  };
  
  // Combine all styles
  const alertStyle = { ...baseStyle, ...variantStyle };
  
  return React.createElement(
    'div',
    { style: alertStyle },
    title && React.createElement('h5', { style: titleStyle }, title),
    React.createElement('div', { style: contentStyle }, children)
  );
}

// Default story
export const Default = () => 
  React.createElement(
    Alert,
    null,
    'Default Alert - This is a default alert that provides information to the user.'
  );

// Destructive variant story
export const Destructive = () => 
  React.createElement(
    Alert,
    { variant: 'destructive' },
    'Destructive Alert - This is a destructive alert that warns the user of a potential issue.'
  );

// Alert with title story
export const WithTitle = () => 
  React.createElement(
    Alert,
    { title: 'Alert Title' },
    'Alert with title'
  );

// Alert with description only
export const DescriptionOnly = () => 
  React.createElement(
    Alert,
    null,
    'This is an alert with only a description and no title.'
  );

// Set control values and metadata for the stories
Default.storyName = 'Default Alert';
Destructive.storyName = 'Destructive Alert';
WithTitle.storyName = 'Alert with Title';
DescriptionOnly.storyName = 'Description Only Alert';

// Add story parameters
Default.parameters = {
  layout: 'centered',
};

// Note: Styles for the Alert component are now managed in the Ladle Provider component
