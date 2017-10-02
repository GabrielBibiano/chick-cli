const fs = require('fs')
const { logSuccess, logError } = require('./generic')
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

exports.defineRootErpToConfiguration = () => {
    verifyConfigRootFile().then(() => {
        const dataConfigErp = JSON.stringify(configDataRoot())
        return new Promise((resolve, reject) => {
            fs.writeFile("./erp-config.json", dataConfigErp , (err) => {
                if (err) reject(logError(err))
            })

            resolve(logSuccess("Pasta raiz do ERP definida!"))
        })
    }).catch(() => {
        logError('Este projeto já está sendo usado.')
    })
}
