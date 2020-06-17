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




  require('./modules/readfile.js')

  const BrowerWindow = require('electron').remote.BrowserWindow;
  window.newWindow = path => {
    win = new BrowerWindow({
      width: 960,
      height: 640,
      frame: true, // false隐藏关闭按钮、菜单选项 true显示
      fullscreen: false, // 全屏展示
    })

    // win.webContents.openDevTools()
    win.removeMenu()
    win.loadURL(path );
    win.on('close', () => {
      win = null
    });
  }




  // 创建菜单  

  require('./modules/menu.js')
  // 引入菜单模块
  // require('./modules/ipcMain.js')


})