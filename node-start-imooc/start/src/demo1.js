// 读取系统的cpu的信息

const os = require('os');

const cpus = os.cpus(); // 获取当前系统的cpu的数量

console.log(cpus.length) // 8核

// 获取内存的信息
const total = os.totalmem(); // bytes

// 16g内存
console.log(total/1024/1024/1024); // GB

// 获取当前剩下的内存
const free = os.freemem();

// 剩余0.4370765686035156可用
console.log(free/1024/1024/1024); // GB