const { app, BrowserWindow, screen } = require('electron')
const path = require('path')

function createWindow () {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const win = new BrowserWindow({
        width: 800,
        minWidth: 800,
        maxWidth: width,
        height: 600,
        minHeight: 600,
        maxHeight: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})