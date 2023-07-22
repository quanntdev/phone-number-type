module.exports = {
    apps: [
        {
            name: 'phone-nestjs-dev-2',
            script: './dist/main.js',
            watch: false,
            env: {
                NODE_ENV: "production",
                PORT: 3001
            }
        },
    ],
}
