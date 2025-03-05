export default [
    {
        ignores: ['node_modules'],
        rules: {
            eqeqeq: 'off',
            'no-unused-vars': 'warn',
            'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
        },
    },
];
