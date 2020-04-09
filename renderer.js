// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.querySelector('#switchLayout').addEventListener('click', (e) => {
  console.log('e', e);
  let dom = document.querySelector('#result')
  let className = dom.className

  if (className === 'layout-icon') {
    dom.className = 'layout-list'
    e.target.classList.replace('layout-icon','layout-list')
  } else {
    dom.className = 'layout-icon'
    e.target.classList.replace('layout-list','layout-icon')
  }
})