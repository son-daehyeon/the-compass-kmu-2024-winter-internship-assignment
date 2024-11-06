export default {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    // Libraries
    '<THIRD_PARTY_MODULES>',

    // Common
    '^@/common/(.*)$',

    // Domain
    '^@/domain/project/(.*)$',
    '^@/domain/task/(.*)$',

    // Other
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
