const fs = require('fs')
const { verifyConfigFile } = require('./configModule')
const { logSuccess, logError, prompt } = require('./generic')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

const verifyConfigRootFile = () => {
    return new Promise((resolve, reject) => {
        fs.stat(`./erp-config.json`, (err, stat) => {
            if(err == null) {
                reject(true) 
            } else if(err.code == 'ENOENT') {
                resolve(false)
            }
        })
    })
}

const configDataRoot = (projectName) => {
    return configRoot = {
        pasta: process.env.PWD,
        inicio: Date()
    }
}

const writeConfigRootFile = (dataConfigErp) => {
    return new Promise((resolve, reject) => {
        fs.writeFile("./erp-config.json", JSON.stringify(dataConfigErp) , (err) => {
            if (err) reject(logError(err))
        })

        resolve(logSuccess("Pasta raiz do ERP definida!"))
    })
}

const verifyErpConfigDir = () => {
    return new Promise((resolve, reject) => {
        fs.stat(`config/`, (err, stat) => {
            if(err == null) {
                reject(true) 
            } else if(err.code == 'ENOENT') {
                resolve(false)
            }
        })
    })
}

exports.defineRootErpToConfiguration = () => {
    verifyConfigFile().then(() => {
        logError("Você não pode usar esta pasta como raiz, ela já é um módulo.")
    })
    .catch(() => {
        verifyConfigRootFile()
        .then(() => {
            const dataConfigErp = configDataRoot()
            writeConfigRootFile(dataConfigErp)
            verifyErpConfigDir().then(() => {
                console.log("Este projeto não contém a pasta de configuração necessária.")
                prompt("Deseja criar? ", (res) => {
                    console.log(res)
                })
            })
        })
        .catch(() => {
            logError('Este projeto já está sendo usado.')
        })
    })
   
}