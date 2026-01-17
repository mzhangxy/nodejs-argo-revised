const express = require("express");
const app = express();

// 获取端口，确保兼容环境变量
const PORT = process.env.SERVER_PORT || process.env.PORT || 3000;

// 极简路由，用于健康检查
app.get("/", (req, res) => {
  console.log(`[${new Date().toISOString()}] Health check received at /`);
  res.send("Diagnostic Server is Running!");
});

// 打印所有环境变量（排除敏感信息），帮助排查配置问题
console.log("--- Environment Variables ---");
console.log("PORT:", PORT);
console.log("NODE_VERSION:", process.env.NODE_VERSION);
console.log("FILE_PATH:", process.env.FILE_PATH || "Not Set");

// 立即启动监听
app.listen(PORT, '0.0.0.0', () => {
  console.log(`SUCCESS: HTTP server is listening on 0.0.0.0:${PORT}`);
});

// 捕获未处理的异常，防止静默退出
process.on('uncaughtException', (err) => {
  console.error('FATAL: Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('FATAL: Unhandled Rejection at:', promise, 'reason:', reason);
});
