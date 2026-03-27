export default [
   {
    ignores: [
      'public/assets/dist/js/bootstrap.bundle.min.js',
      'public/assets/js/color-modes.js'
    ],
  }, 
  {
    files: ['**/*.js'], // only check .js files in server directory
    rules: {
      semi: 'error', //force semicolons
      'no-unused-vars': 'warn', //warn if variables are unused
    },
  },
];
