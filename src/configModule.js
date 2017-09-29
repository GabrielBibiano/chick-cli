const fs = require('fs')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

exports.createConfigModuleFile = (configModule) => {
    fs.writeFile(`${configModule.nome}/tijucli-module.json`, JSON.stringify(configModule), (err) => {
        if (err) throw err;
        console.log(bgGreen(black('Show!')), 'Configurações salvas!');
    });
}

exports.verifyConfigFile = () => {
    return new Promise((resolve, reject) => {
        fs.open('tijucli-module.json', 'r', (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    reject(err) 
                }
            }

            resolve(true)
        })
    })
}

exports.configDataModule = (projectName) => {
    return configModule = {
        nome: projectName,
        inicio: Date()
    }
}