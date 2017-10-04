const fs = require('fs')
const { verifyConfigFile } = require('./configModule')
const { logSuccess, logError, prompt } = require('./generic')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

const verifyConfigRootFile = exports.verifyConfigRootFile = () => {
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

const verifyRootConfigDir = () => {
    return new Promise((resolve, reject) => {
        fs.stat(`config/`, (err, stat) => {
            if(err == null) {
                reject(true) 
            } else if(err.code == 'ENOENT') {
                resolve()
            }
        })
    })
}

const createConfigDirRoot = () => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`config/`, (err, stat) => {
            if(err) {
                reject(true) 
            }else{
                resolve(err)
            }
        })
    })
}

const questionToCreateConfigDir = () => {
    prompt("Deseja criar?(s/n) ", (res) => {
        if(res == "s" || res == "S"){
            createConfigDirRoot()
            .then( logSuccess("Pasta de configuração criada!") )
        }else if(res == "n" || res == "N"){
            console.log("Pasta não criada!")
        }else{
            console.log("Resposta não esperada.")
        }
        process.exit();
    })
}

exports.defineRootErpToConfiguration = () => {
    verifyConfigFile()
    .then(() => {
        logError("Você não pode usar esta pasta como raiz, ela já é um módulo.")
    })
    .catch(() => {
        verifyConfigRootFile()
        .then(() => {
            const dataConfigErp = configDataRoot()
            writeConfigRootFile(dataConfigErp)
            verifyRootConfigDir()
            .then(() => {
                console.log("\nEste projeto não contém a pasta de configuração necessária.")
                questionToCreateConfigDir()
            })
            .catch(err => err)
        })
        .catch(() => {
            logError('Este projeto já está sendo usado.')
        })
    })
}