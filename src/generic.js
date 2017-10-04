const fs = require('fs')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

const prompt = (question, callback) => {
    const stdin = process.stdin
    const stdout = process.stdout

    stdin.resume();
    stdout.write(question);

    stdin.once( 'data', (data) => callback( data.toString().trim() ) );
}

const logSuccess = (msg) => console.log( bgGreen( black( 'Show!' ) ), msg )
const logError = (msg) => console.log( bgRed( 'Ops!' ), msg )

const ifNotExists = (name, ext) => {
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

module.exports = {
    prompt,
    logSuccess,
    logError,
    ifNotExists
}