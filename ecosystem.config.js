module.exports = {
    apps: [{
        name: "app-api-1",
        script: "./src/app.js",
        watch: true,
        max_memory_restart: '1000M',
        exec_mode: "cluster",
        instances: 1,
        cron_restart: "59 23 * * *",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}