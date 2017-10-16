const fs = require('fs')
const { comment, black, bgWhite, bgRed, bgGreen, green } = require('./colorsVariables')
const Spinner = require('cli-spinner').Spinner;

const random = () => Math.random() * 3

const prompt = (question, callback) => {
    const stdin = process.stdin
    const stdout = process.stdout

    stdin.resume();
    stdout.write(question);

    stdin.once( 'data', ( data ) => callback( data.toString().trim() ) );
}

const logSuccess = ( msg, time = 0 ) => setTimeout( () => console.log( bgGreen( black( 'Show!' ) ) , msg ) , time * 1000 )
const logError = ( msg, time = 0 ) => setTimeout( () => console.log( bgRed( 'Ops!' ), msg ) , time * 1000 )

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

const spinner = new Spinner({
    text: `Aguarde ${green('%s')}`,
    stream: process.stderr,
    onTick: function(msg) {
        this.clearLine(this.stream);
        this.stream.write(msg);
    }
})

const progressStart = () => {
    spinner.setSpinnerString('|/-\\');
    spinner.start();
}

const spinnerCheck = (r) => {
    setTimeout(() => {
        spinner.onTick(`${bgGreen(black(' Concluído! '))} \n`);
        spinner.clearLine()
        spinner.stop()
    }, r)
}

const progressStop = async () => {
    let r = random() * 1000

    while(r < 2){
        r = random() * 1000
    } 

    spinnerCheck(r)
}

module.exports = {
    prompt,
    logSuccess,
    logError,
    ifNotExists,
    progressStart,
    progressStop,
    random,
    spinner
}