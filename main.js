const{app, BrowserWindow} = require('electron')
const path = require('path')
//require('electron-reload')(__dirname, { electron: path.join(__dirname,'/node_modules/electron') })

let win
app.on('ready', createWindow)
app.on('window-all-closed',()=>{ app.quit() })
app.on('activate',()=>{
    // Su macOS è comune ri-creare la finestra dell'app quando
    // viene cliccata l'icona sul dock e non ci sono altre finestre aperte.
    if(win===null){ createWindow() }
})

function createWindow() {
    win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.loadFile('main.html')
    win.webContents.openDevTools()
    win.on('closed',()=>{ win = null })
}