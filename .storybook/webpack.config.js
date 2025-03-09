module.exports = ({ config }) => {
  // Modify the existing TypeScript rule
  const tsRule = config.module.rules.find(
    (rule) => rule.test && rule.test.toString().includes('tsx')
  );

  if (tsRule) {
    tsRule.use = [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            ['@babel/preset-react', { runtime: 'automatic' }],
            ['@babel/preset-typescript', { 
              allowNamespaces: true, 
              allowDeclareFields: true, 
              onlyRemoveTypeImports: true 
            }]
          ],
          plugins: [
            ['@babel/plugin-transform-typescript', { 
              allowNamespaces: true,
              allowDeclareFields: true
            }]
          ]
        }
      }
    ];
  }

  // Add path alias for @ to point to src
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': require('path').resolve(__dirname, '../src')
  };

  return config;
};
