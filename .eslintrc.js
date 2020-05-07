module.exports = {
    extends: [
        'react-app',
        'plugin:prettier/recommended',
        'plugin:import/errors',
    ],
    settings: {
        'import/resolver': {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    }
};
