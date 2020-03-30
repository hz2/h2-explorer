// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
console.log(process);

  for (const type of ['chrome', 'node', 'electron', 'v8']) {

    replaceText(`${type}-version`, process.versions[type])
  }

  // const btn = document.querySelector('#btn');
  // const path = require('path');
  // const BrowerWindow = require('electron').remote.BrowserWindow;

  // setTimeout(() => {


  // // btn.onclick = () => {
  // //   win = new BrowerWindow({ 
  // //       width: 300,
  // //       height: 200, 
  // //       frame: false, // false隐藏关闭按钮、菜单选项 true显示
  // //       fullscreen:false, // 全屏展示
  // //       transparent: false 
  // //   }) 

  // //   win.loadURL(path.join('file:',__dirname,'news.html'));

  // //   win.on('close',()=>{win = null});
  // // }

  // }, 1000 );


  // 创建菜单  

  require('./modules/menu.js')
  // 引入菜单模块
  // require('./modules/ipcMain.js')


})