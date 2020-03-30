// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require('fs');


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  console.log(process);

  for (const type of ['chrome', 'node', 'electron', 'v8']) {

    replaceText(`${type}-version`, process.versions[type])
  }




  // read file dir


  let url = document.querySelector('#uri')
  let val = url && url.value

  async function show(path) {
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
      console.log(dirent.name, dirent);
      let dom = document.createElement('div')
      dom.className = 'item'

      let thumb = ''
      if (dirent.isDirectory()) {
        thumb = `<span>目录</span>`
        dom.ondblclick = () => nextPage(path + '\\' + dirent.name)

      } else if (/\.(png|svg|ico|jpg|jpeg)$/i.test(dirent.name)) {
        thumb = `<img src="${path}\\${dirent.name}">`

      } else if (/\.(mp4|avi)$/i.test(dirent.name)) {
        thumb = `<video src="${path}\\${dirent.name}"></video>`

      }
      dom.innerHTML = `
      <div class="icon">
        ${thumb}
      </div>
      <div class="text">${dirent.name}</div>
      `
      document.querySelector('#result').appendChild(dom)
    }
  }

  show(val).catch(console.error);


  document.querySelector('#getResult').onclick = () => {
    let url = document.querySelector('#uri')
    let val = url && url.value

    document.querySelector('#result').innerHTML = ''
    show(val).catch(console.error);
  }
  nextPage = (val) => {
    let url = document.querySelector('#uri')
    url.value = val
    document.querySelector('#result').innerHTML = ''
    show(val).catch(console.error);
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