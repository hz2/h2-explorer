const fs = require('fs');
const os = require('os');
const path  = require('path');

// read file dir

console.log('os', fs.lstatSync('//'));
let a = fs.readdirSync('//', {
  encoding: "utf8",
  withFileTypes: true
})
console.log('isexist  ', a);

let url = document.querySelector('#uri')
let val = url && url.value

async function show(locurl) {

  console.log(' locurl ', locurl);
  document.querySelector('#uri').value = locurl

  const showDisk = () => {
    new Array(26).fill('').forEach((x, i) => {


      let dirve = String.fromCharCode(65 + i)
      if (!fs.existsSync(dirve + ':')) {
        return
      }
      let dom = document.createElement('div')
      dom.className = 'item'
      let thumb = `<div class="iconbg directory-icon"></div>`
      dom.ondblclick = () => nextPage(dirve + ':\\')
      dom.innerHTML = `${thumb}
        <div class="text">${ 'Disk ' + dirve }</div>
        `
      document.querySelector('#result').appendChild(dom)

    })
  }

  document.querySelector('#result').innerHTML = ''
  if (locurl == 'home') {
    showDisk()
    return
  }


  const dir = await fs.promises.opendir(locurl);
  for await (const dirent of dir) {
    let dom = document.createElement('div')
    dom.className = 'item'

    let thumb = ''

    let ext =  path.extname(  dirent.name ) 
    
    if (dirent.isDirectory()) {
      thumb = `<div class="iconbg directory-icon"></div>`
      dom.ondblclick = () => nextPage(locurl + '\\' + dirent.name)

    } else if (/\.(png|svg|ico|jpg|jpeg)$/i.test(dirent.name)) {
      thumb = `<div class="icon"><img src="${locurl}\\${dirent.name}"></div>`

    } else if (/\.(mp4|avi)$/i.test(dirent.name)) {
      thumb = `<div class="icon"><video src="${locurl}\\${dirent.name}"></video></div>`
    } else if (/\.(zip|rar|7z)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-archive"></div>`
    } else if (/\.(mp3|wav)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-audio"></div>`
    } else if (/\.(md|js|json|html)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-document"></div>`
    } else if (/\.(pdf)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-pdf"></div>`
    } else if (/\.(doc|docx)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-office-doc"></div>`
    } else if (/\.(xls|xlsx)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-office-sheet"></div>`
    } else if (/\.(ppt|pptx)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-office-present"></div>`
    } else {
      thumb = `<div class="iconbg filetype-plain"></div>`
    }
    dom.innerHTML = `${thumb}
      <div class="text">${dirent.name}</div>
      `
    document.querySelector('#result').appendChild(dom)
  }
}

show(val).catch(console.error);


nextPage = (val) => {
  show(val).catch(console.error);
}
document.querySelector('#gotoParent').onclick = () => {
  let newval = document.querySelector('#uri').value.split(path.sep).slice(0, -1).join('\\') || 'home'
  if (newval.endsWith(':')) {
    newval += "\\"
  }
  nextPage( path.dirname( document.querySelector('#uri').value ) )
}

document.querySelector('#getResult').onclick = () => {
  nextPage(document.querySelector('#uri').value  || 'home' )
}