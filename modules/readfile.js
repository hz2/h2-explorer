const fs = require('fs');

// read file dir


let url = document.querySelector('#uri')
let val = url && url.value

async function show(path) {
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    // console.log(dirent.name, dirent);
    let dom = document.createElement('div')
    dom.className = 'item'

    let thumb = ''
    if (dirent.isDirectory()) {
      thumb = `<div class="iconbg directory-icon"></div>`
      dom.ondblclick = () => nextPage(path + '\\' + dirent.name)

    } else if (/\.(png|svg|ico|jpg|jpeg)$/i.test(dirent.name)) {
      thumb = `<div class="icon"><img src="${path}\\${dirent.name}"></div>`

    } else if (/\.(mp4|avi)$/i.test(dirent.name)) {
      thumb = `<div class="icon"><video src="${path}\\${dirent.name}"></video></div>`
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
document.querySelector('#gotoParent').onclick = () => {

  let newval = document.querySelector('#uri').value.split('\\').slice(0,-1).join('\\')
  nextPage(newval)
}