const fs = require('fs');
const os = require('os');
const path = require('path');
const {app, BrowserWindow , Menu } = require('electron')
// read file dir

let url = document.querySelector('#uri')
const $uri = document.querySelector('#uri')
let val = url && url.value

async function show(locurl) {

  const showDisk = () => {
    new Array(26).fill('').forEach((x, i) => {
      let dirve = String.fromCharCode(65 + i)
      if (!fs.existsSync(dirve + ':')) {
        return
      }
      let dom = document.createElement('div')
      dom.className = 'item'
      let thumb = `<div class="iconbg directory-icon"></div>`
      dom.ondblclick = () => gotoVal(dirve + ':\\')
      dom.innerHTML = `${thumb}
        <div class="text">${ 'Disk ' + dirve }</div>
        `
      document.querySelector('#result').appendChild(dom)

    })
  }

  document.querySelector('#result').innerHTML = ''
  if (locurl === 'H2:\\' || locurl === 'H2:') {
    showDisk()
    return
  }

  // console.log('os', fs.lstatSync('//'));


  const loopItem = list => list.forEach(dirent => {

    let dom = document.createElement('div')
    dom.className = 'item'

    let thumb = ''

    let ext = path.extname(dirent.name)

    if (dirent.isDirectory()) {
      thumb = `<div class="iconbg directory-icon"></div>`
      dom.ondblclick = () => gotoVal(locurl + '\\' + dirent.name)

    } else if (/\.(png|svg|ico|jpg|jpeg|webp|bmp)$/i.test(dirent.name)) {
      thumb = `<div class="icon"><img src="${locurl}\\${dirent.name}"></div>`
      if ( /\.(svg|ico)$/i.test(dirent.name) ) {
        thumb = `<div class="icon"><img class="noshadow" src="${locurl}\\${dirent.name}"></div>`
      }
      dom.ondblclick = () =>newWindow( `${locurl}\\${dirent.name}`)
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
      dom.ondblclick = () =>newWindow( `${locurl}\\${dirent.name}`)
    } else if (/\.(doc|docx)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-office-doc"></div>`
    } else if (/\.(xls|xlsx)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-office-sheet"></div>`
    } else if (/\.(ppt|pptx)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-office-present"></div>`
    } else if (/\.(txt|ini|json)$/i.test(dirent.name)) {
      thumb = `<div class="iconbg filetype-plain"></div>`
      dom.ondblclick = () =>newWindow( `${locurl}\\${dirent.name}`)
    } else {
      thumb = `<div class="iconbg filetype-plain"></div>`
    }
    dom.innerHTML = `${thumb}
      <div class="text">${dirent.name}</div>
      `
    document.querySelector('#result').appendChild(dom)


  })


  const dirSync = await fs.readdirSync(locurl, {
    withFileTypes: true
  })
  // sort list and display
  loopItem(dirSync.sort((a, b) => b.isDirectory() - a.isDirectory()))

}

show(val).catch(console.error);


nextPage = (val) => {
  show(val).catch(
    // console.error
    e => alert(e)
  );
}

const gotoResult = () => {
  nextPage($uri.value || 'H2:\\')
}

// fill address bar and goto result
const gotoVal = val => {
  $uri.value = path.normalize(val)
  gotoResult()
}

// const gotoVal = ()=> {
//   let newval = document.querySelector('#uri').value.split(path.sep).slice(0, -1).join('\\') || 'H2:\\'
//   if (newval.endsWith(':')) {
//     newval += "\\"
//   }
//   nextPage(path.dirname(document.querySelector('#uri').value))
// }

const gotoParent = () => {
  let parent;
  if ($uri.value === 'H2:\\' || $uri.value === 'H2:') {
    return
  }
  if ($uri.value === path.dirname($uri.value)) {
    parent = 'H2:\\'
  } else {
    parent = path.dirname($uri.value)
  }
  gotoVal(parent)
}



$uri.addEventListener('keyup', ({
  keyCode
}) => (keyCode == 13) && gotoResult())

document.querySelector('body').addEventListener('mouseup', ({
  button
}) => (button == 3) && gotoParent())

document.querySelector('body').addEventListener('keyup', ({
  keyCode
}) => (keyCode == 8) && gotoParent())

document.querySelector('#getResult').onclick = gotoResult
document.querySelector('#gotoParent').onclick = gotoParent