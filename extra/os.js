import os from 'os';


console.log("System Info:");
console.log("----------------------------");
console.log("OS Type:", os.type());
console.log("OS hostname:", os.hostname());
console.log("OS Platform:", os.platform());
console.log("CPU Architecture:", os.arch());
console.log("Total Memory (in GB):", os.totalmem() / (1024 * 1024 * 1024));
console.log("Free Memory (in MB):", os.freemem() / (1024 * 1024));
console.log("Uptime (in hours):", os.uptime() / 3600);
console.log("User Info:", os.userInfo());
console.log("CPU Info:", os.cpus());
console.log("Network Interfaces:", os.networkInterfaces());
console.log("Home Directory:", os.homedir());
console.log("Temporary Directory:", os.tmpdir());

