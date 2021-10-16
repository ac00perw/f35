module.exports = {
    // mode: 'jit',
    purge: [
        './public/**/*.html',
        './src/**/*.vue'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'sans': ['korolev', 'sans-serif']
        },
        colors: {
            transparent: 'transparent',
            'teal': 'rgb(23, 132, 137)',
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}