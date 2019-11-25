const port = 9096;
const host = '127.0.0.1';
const net = require('net');

const client = new net.Socket();

/**
 * 设置编码
 * */
client.setEncoding('binary');

/**
 * 接收主进程发来的数据
 * */
client.on('data', function (data) {
  console.log('from server:' + data)
});

/**
 * 工作进程与主进程通信出现错误之后关闭连接
 * */
client.on('error', function (error) {
  client.destroy();
});

/**
 * 工作进程与主进程通信出现正常关闭连接
 * */
client.on('close', function () {
  process.exit(1);
});

process.on('message', function (message) {
  if (message === 'connectServer') {
    client.connect(port, host, function () {
      client.write('hello server')
    });
  }
});

/**
 * 进程发生异常
 * */
process.on('uncaughtException', function (err) {
  console.log('err');
  client.destroy();
  process.send({accept: 'suicide'});
  process.exit(1);
});
