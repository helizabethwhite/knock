module.export = {
    apps: [
        {
            name: 'Start npm',
            script: 'npm',
        },
        {
            name: 'Start server',
            script: 'npm run server',
        },
        {
            name: 'Serve frontend',
            script: 'serve /home/site/wwwroot/build --no-daemon --spa',
        },
    ],
};
