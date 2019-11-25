const net = require('net');
const cpus = require('os').cpus();
const fork = require('child_process').fork;

const workers = {};
const clients = {};
/**
 * 获取连接的客户端主机名称
 * */
const getHostName = (socket) => {
  if (socket._peername) {
    return `${socket._peername.address}:${socket._peername.port}`
  }
  return `${socket.remoteAddress}:${socket.remotePort}`
};

/**
 * 创建TCP 服务
 * */
const server = net.createServer(function (socket) {

  clients[getHostName(socket)] = socket;

  /**
   * 设置编码
   * */
  socket.setEncoding('binary');

  /**
   * 接收主进程发来的数据
   * */
  socket.on('data', function (data) {
    console.log('client send :' + data);

    socket.write('The server received your message.')
  });

  /**
   * 与工作进程通信出现错误
   * */
  socket.on('error', function (exception) {
    socket.end();
    delete clients[getHostName(socket)]
  });

  /**
   * 工作进程关闭连接
   * */
  socket.on('close', function (data) {
    delete clients[getHostName(socket)]
  })

}).listen('9096');

/**
 * 主进程监听事件
 * */
server.on('listening', function (res) {

});

/**
 * 主进程服务异常
 * */
server.on('error', function (exception) {
});


/**
 * 主进程异常事件
 * */
cpus.forEach(() => {

});

/**
 * 创建工作进程
 * */
const createWorker = () => {
  const worker = fork('worker.js');
  workers[worker.pid] = worker;

  worker.on('message', function (message) {
    if (message.accept === 'suicide') {
      createWorker();
    }
  });

  worker.on('exit', function () {
    delete workers[worker.pid];
  });

  worker.send('connectServer')
};

/**
 * 主进程退出处理
 * */
const processExitHandle = code => {

  if (code !== 0) {
    Object.keys(workers).forEach(pid => {
      console.log('master process exited, kill worker pid: ', pid);
      workers[pid].kill('SIGINT');
      delete workers[pid];
    })
  }

  process.exit(0);
};

process.once('SIGINT', processExitHandle.bind(this, 'SIGINT')); // kill(2) Ctrl-C
process.once('SIGQUIT', processExitHandle.bind(this, 'SIGQUIT')); // kill(3) Ctrl-\
process.once('SIGTERM', processExitHandle.bind(this, 'SIGTERM')); // kill(15) default
process.once('exit', processExitHandle.bind(this));




