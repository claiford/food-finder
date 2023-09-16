module.exports = {
    env: {
      node: true, // Indicates it's a Node.js environment
    },
    extends: ['eslint:recommended', 'plugin:node/recommended'],
    // Add any additional rules or configurations specific to your project
    rules: {
      'no-console': 'off', // Allow console.log in your Node.js code
    },
  };
  