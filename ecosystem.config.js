module.exports = {
    apps: [
        {
            name: 'phone-nestjs-dev',
            script: './dist/main.js',
            watch: false,
            env: {
                NODE_ENV: "production",
                PORT: 3001
            }
        },
    ],
}