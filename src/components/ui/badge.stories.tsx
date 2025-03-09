// Badge component stories for Ladle
// Using React.createElement to avoid webpack parsing issues with JSX
import React from 'react';

// Define the props interface for the Badge component
interface BadgeProps {
  /** The content to display in the badge */
  children?: React.ReactNode;
  /** The variant style of the badge */
  variant?: 'default' | 'secondary' | 'destructive' | 'success';
}

// Create a simple Badge component for our stories
function Badge(props: BadgeProps) {
  const { children = 'Badge', variant = 'default' } = props;
  
  // Define direct inline styles for the badge variants
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.375rem',
    padding: '0.125rem 0.625rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1.25,
    textTransform: 'uppercase' as const,
    transition: 'all 0.15s ease',
    border: '1px solid transparent',
  };
  
  // Add variant-specific styles
  let variantStyle = {};
  
  switch (variant) {
    case 'secondary':
      variantStyle = {
        backgroundColor: '#f3f4f6',
        borderColor: '#6b7280',
        color: '#374151',
      };
      break;
    case 'destructive':
      variantStyle = {
        backgroundColor: '#fee2e2',
        borderColor: '#ef4444',
        color: '#b91c1c',
      };
      break;
    case 'success':
      variantStyle = {
        backgroundColor: '#dcfce7',
        borderColor: '#22c55e',
        color: '#166534',
      };
      break;
    default: // 'default'
      variantStyle = {
        backgroundColor: '#ebf5ff',
        borderColor: '#3b82f6',
        color: '#1e40af',
      };
      break;
  }
  
  // Combine base and variant styles
  const style = { ...baseStyle, ...variantStyle };
  
  return React.createElement(
    'span', 
    { style },
    children
  );
}

// Simple default badge
export const Default = () => 
  React.createElement(Badge, null, "Default Badge");

// Secondary variant
export const Secondary = () => 
  React.createElement(Badge, { variant: "secondary" }, "Secondary Badge");

// Destructive variant
export const Destructive = () => 
  React.createElement(Badge, { variant: "destructive" }, "Destructive Badge");

// Success variant
export const Success = () => 
  React.createElement(Badge, { variant: "success" }, "Success Badge");

// Badge with icon example
export const WithIcon = () => 
  React.createElement(Badge, { variant: "default" }, "• With Icon");

// Set control values and metadata for the stories
Default.storyName = 'Default Badge';
Secondary.storyName = 'Secondary Badge';
Destructive.storyName = 'Destructive Badge';
Success.storyName = 'Success Badge';
WithIcon.storyName = 'Badge with Icon';

// Add story parameters for layout
Default.parameters = {
  layout: 'centered',
};

// Note: Styles for the Badge component are now managed in the Ladle Provider component
