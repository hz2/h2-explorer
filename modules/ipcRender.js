// src/render/ipcRender.js
//渲染进程

let send = document.querySelector('#send');
const { ipcRenderer } = require('electron');

send.onclick = function () {
    // 传递消息给主进程
    // 异步
    ipcRenderer.send('sendMsg', {name:'poetries', age: 23})
}
