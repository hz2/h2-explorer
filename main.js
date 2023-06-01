// Modules to control application life and create native browser window
const {app, BrowserWindow , Menu } = require('electron')
const path = require('path')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


const template = [
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }]


function createWindow () {
  // Other code removed for brevity
  // ctrl shift i

  // var menu = Menu.buildFromTemplate([
  //     // {
  //     //     label: 'Menu',
  //     //     submenu: [
  //     //         {label:'Adjust Notification Value'},
  //     //         {label:'CoinMarketCap'},
  //     //         {label:'Exit'}
  //     //     ]
  //     // }
  // ])
  // Menu.setApplicationMenu(menu); 
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/src/h2assets/logos/logo-v1.ico',
    backgroundColor: '#f5faff',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // like here
      webSecurity: false
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // mainWindow.setMenu(null)
  mainWindow.removeMenu()
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})