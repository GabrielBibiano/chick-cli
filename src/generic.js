const fs = require('fs')
const { bgWhite } = require('./colorsVariables')

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