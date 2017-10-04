const fs = require('fs')
const { logSuccess, logError } = require('./generic')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

const createConfigModuleFile = (configModule) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${configModule.nome}/tijucli-module.json`, JSON.stringify(configModule), (err) => {
            if (err) reject(logError(err));
            resolve(logSuccess('Configurações salvas!'))
        });
    }) 
}

const verifyConfigFile = () => {
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

const configDataModule = (projectName) => {
    return configModule = {
        nome: projectName,
        inicio: Date()
    }
}

module.exports = {
    createConfigModuleFile,
    verifyConfigFile,
    configDataModule
}