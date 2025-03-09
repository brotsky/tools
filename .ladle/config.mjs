// Ladle configuration
export default {
  stories: 'src/**/*.stories.{js,jsx,ts,tsx}',
  port: 61000,
  previewPath: '/',
  appendToHead: `
    <!-- Load Tailwind CSS Play CDN as per the official documentation -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Configure Tailwind theme with custom properties -->
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: {
                DEFAULT: 'hsl(222.2 47.4% 11.2%)',
                foreground: 'hsl(210 40% 98%)',
              },
              secondary: {
                DEFAULT: 'hsl(210 40% 96.1%)',
                foreground: 'hsl(222.2 47.4% 11.2%)',
              },
              destructive: {
                DEFAULT: 'hsl(0 84.2% 60.2%)',
                foreground: 'hsl(210 40% 98%)',
              },
              muted: {
                DEFAULT: 'hsl(210 40% 96.1%)',
                foreground: 'hsl(215.4 16.3% 46.9%)',
              },
              accent: {
                DEFAULT: 'hsl(210 40% 96.1%)',
                foreground: 'hsl(222.2 47.4% 11.2%)',
              },
              background: 'hsl(0 0% 100%)',
              foreground: 'hsl(222.2 84% 4.9%)',
              border: 'hsl(214.3 31.8% 91.4%)',
            },
            borderRadius: {
              lg: 'var(--radius)',
              md: 'calc(var(--radius) - 2px)',
              sm: 'calc(var(--radius) - 4px)',
            },
          },
        },
      }
    </script>
    
    <!-- Define CSS Custom Properties / Variables -->
    <style>
      :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --radius: 0.5rem;
      }

      /* Additional component specific styling */
      .alert {
        @apply w-full flex flex-col items-start rounded-md p-4 mb-4;
      }
      
      .alert-title {
        @apply font-semibold mb-2 mt-0;
      }
      
      .alert-content {
        @apply text-sm;
      }
    </style>
  `,
  viteConfig: './vite.config.ts',
};
