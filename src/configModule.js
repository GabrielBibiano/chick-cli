const fs = require('fs')
const { logSuccess, logError } = require('./generic')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

exports.createConfigModuleFile = (configModule) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${configModule.nome}/tijucli-module.json`, JSON.stringify(configModule), (err) => {
            if (err) reject(logError(err));
            resolve(logSuccess('Configurações salvas!'))
        });
    }) 
}

exports.verifyConfigFile = () => {
    return new Promise((resolve, reject) => {
        fs.open('./tijucli-module.json', 'r', (err) => {
            if (err) {
                reject(err) 
            }else{
                resolve(true)
            }
        })
    })
}

exports.configDataModule = (projectName) => {
    return configModule = {
        nome: projectName,
        inicio: Date()
    }
}