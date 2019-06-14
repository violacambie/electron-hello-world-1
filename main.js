const{app, BrowserWindow, Menu} = require('electron')
const path = require('path')

//require('custom-env').env('production')
require('custom-env').env('development')
process.env.NODE_ENV='development'
//require('electron-reload')(__dirname, { electron: path.join(__dirname,'/node_modules/electron') })

let win
let addWindow

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
    //win.webContents.openDevTools()
    win.on('closed',()=>{
        app.quit()
    })
    const mainManu = Menu.buildFromTemplate(mainMenuTemplate) //build menu from template
    Menu.setApplicationMenu(mainManu) //Insert menu
}

function createAddWindow(){
    addWindow = new BrowserWindow({
        width:300,
        height:200,
        title:"new window",
        webPreferences:{
            nodeIntegration:true
        }
    })
    addWindow.loadFile('addWindow.html')
    addWindow.on('closed',()=>{ addWindow = null })
}

//create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add new window',
                accelerator:process.platform == 'darwin'?'Command+w':'Ctrl+w',
                click(){
                    createAddWindow()
                }
            },
            {
                label:'Quit',
                accelerator:process.platform == 'darwin'?'Command+Q':'Ctrl+Q',
                click(){
                    app.quit()
                }
            }
        ]
    },
    {
        label:'?',
        submenu:[
            {
                label:app.getVersion()
            }
        ]
    }
]

//add devTool if not in production
if(process.env.NODE_ENV == 'development'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Toggle DevTools',
                accelerator:process.platform == 'darwin'?'Command+I':'F12',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role:'reload',
                accelerator:process.platform == 'darwin'?'Command+I':'F5',
            }
        ]
    })
}