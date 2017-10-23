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
        inicio: Date(),
        modules: {}
    }
}

const writeConfigRootFile = (dataConfigErp) => {
    return new Promise((resolve, reject) => {
        fs.writeFile("./erp-config.json", JSON.stringify(dataConfigErp) , (err) => {
            if (err) reject(logError(err))
        })

        resolve( logSuccess("Pasta raiz do ERP definida!") )
    })
}

const verifyIfThisDirExists = (dir) => {
    return new Promise((resolve, reject) => {
        fs.stat(`${dir}/`, (err, stat) => {
            if(err == null) {
                reject(true) 
            } else if(err.code == 'ENOENT') {
                resolve()
            }
        })
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

const createModelsDirRoot = () => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`models/`, (err, stat) => {
            if(err) {
                reject() 
            }else{
                resolve()
            }
        })
    })
}

const questionToCreateConfigDir = () => {
    return new Promise((resolve, reject) => {
        prompt("Deseja criar?(s/n) ", (res) => {
            if(res == "s" || res == "S"){
                createConfigDirRoot()
                .then( logSuccess("Pasta de configuração criada!") )
            }else if(res == "n" || res == "N"){
                console.log("Pasta não criada!")
            }else{
                console.log("Resposta não esperada.")
            }
            resolve()
        })
    })
}

const createManagerModel = () => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./models/Manager.class.php', "Manager model", (err) => {
            if(err){
                reject(err)
                console.log(error)
            }else{
                resolve()
            }
        })
    })
}

const questionToCreateModelsDir = () => {
    prompt("Deseja criar?(s/n) ", (res) => {
        if(res == "s" || res == "S"){
            createModelsDirRoot()
            .then( () => {
                createManagerModel()
                .then( () => {
                    logSuccess("Pasta models criada!") 
                })
                .catch( () => {
                    logError("Pasta models criada com erro ao escrever arquivos necessários!") 
                })
            })
        }else if(res == "n" || res == "N"){
            console.log("Pasta não criada!")
        }else{
            logError("Resposta não esperada.")
        }

        setTimeout( () => {
            process.exit()
        }, 1000)
    })
}

const defineRootErpToConfiguration = () => {
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
                .then(() => {
                    verifyIfThisDirExists('models')
                    .then( () => {
                        console.log("\nEste projeto não contém a pasta models.")
                        questionToCreateModelsDir()
                    })
                })
            })
            .catch(err => err)
        })
        .catch(() => {
            logError('Este projeto já está sendo usado.')
        })
    })
}

const readConfigRootFile = () => {
    return new Promise( ( resolve, reject ) => {
        fs.readFile(`erp-config.json`, ( err, data ) => {
            if ( err ) reject( logError( err ) );
            resolve( JSON.parse( data ) )
        });
    }) 
}

const reWriteConfigModuleFile = ( configModule ) => {
    return new Promise( ( resolve, reject ) => {
        const param = JSON.stringify( configModule )
        fs.writeFile(`erp-config.json`, JSON.stringify( configModule ), ( err ) => {
            if ( err ) reject( logError( err ) );
            resolve( logSuccess( 'Configurações salvas!' ) )
        });
    }) 
}

const addModuleInConfigRootFile = async ( name ) => {
    let dataConfig = await readConfigRootFile()
    dataConfig.modules[ name ] = new Date()
    
    reWriteConfigModuleFile( dataConfig )
}

module.exports = {
    verifyConfigRootFile,
    defineRootErpToConfiguration,
    addModuleInConfigRootFile,
    readConfigRootFile
}