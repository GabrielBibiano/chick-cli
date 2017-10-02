const fs = require('fs')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

exports.logSuccess = (msg) => {
    console.log(bgGreen(black('Show!')), msg);
}

exports.logError = (msg) => {
    console.log(bgRed('Ops!'), msg);
}

exports.ifNotExists = (name, ext) => {
    return new Promise((resolve, reject) => {
        fs.stat(`views/${name}.${ext}`, (err, stat) => {
            if(err == null) {
                reject(true) 
            } else if(err.code == 'ENOENT') {
                resolve(false)
            }
        })
    })
}