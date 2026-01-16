const { exec } = require('child_process');

const port = 5000;

// Command to find and kill the process on the specified port for Windows
const cmd = `for /f "tokens=5" %a in ('netstat -aon ^| findstr :${port}') do taskkill /f /pid %a`;

exec(cmd, (err, stdout, stderr) => {
    // We don't necessarily care if it fails (e.g., if the port is already free)
    console.log(`Checking port ${port}...`);
    if (stdout) console.log('Cleaning up existing processes...');
    process.exit(0);
});
