const fs = require('fs')
const { verifyConfigRootFile } = require('./configRoot')
const { logSuccess, logError, progressStart, progressStop, random } = require('./generic')
const { verifyConfigFile, createConfigModuleFile, addModuleInConfigFile } = require('./configModule')
const { createNewTemplate } = require('./templates')
const { createAllDefaultAssets } = require('./assets')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

const filesCRUD = ['Incluir', 'Alterar', 'Excluir', 'Visualizar']
const allCommands = ["iniciar", "criar", "status"]
allCommands["criar"] = ["template", "sub"]

const createNew = (...args) => {
    const createCommands = Array.from(allCommands.criar);
    const [itemToCreate, name, type] = args;

    if(createCommands.includes(itemToCreate)){
        if(itemToCreate == 'sub'){
            verifyConfigFile()
            .then(() => {
                progressStart("Aguarde")
                createNewSubModule(name, type)
                progressStop()
            }).catch(() => {
                logError("Você só pode criar um sub módulo no diretório de um módulo.")
            })
        }else if(itemToCreate == 'template'){
            createNewTemplate(name, type)
        }
    }else{
        console.log("Digite um comando suportado")
    }
}

const createNewModule = (configModule) => {
    // Se existir arquivo de configuração raiz
    verifyConfigRootFile()
        .then( () => logError("Você só pode criar um módulo na raiz do projeto.") )
        .catch( () => {
            createModuleDir()
                .then( async result  => {
                    progressStart("Aguarde")
                    logSuccess(result)
                    await createConfigModuleFile( configModule )
                    await createViews( configModule.nome )
                    await createModels( configModule.nome )
                    await createControllers( configModule.nome )
                    progressStop()
                })
                .catch( error => logError(error) )
        })
}

const createModuleDir = () => {
    return new Promise((resolve, reject) => {
        fs.mkdir(configModule.nome, (err) => {
            if (err) {
                if (err.code == "EEXIST") {
                    reject("Este módulo já existe.")
                }
            }else{
                resolve("Módulo criado!");
            }
        });
    })
}

const createViews = ( fatherDir ) => {
    return new Promise( ( resolve, reject ) => {
        createViewsDir( fatherDir )
            .then( async ( response ) => {
                logSuccess( response )
                await createModalsDir( fatherDir )
                    .then( res => logSuccess( res ) )
                    .catch( error => logError( error ) )
                await createDefaultViewFile( fatherDir )
                    .then( res => logSuccess( res) )
                    .catch( error => logError( error ) )
                await createAllDefaultAssets( fatherDir )
                    .then( res => logSuccess( res) )
                    .catch( error => logError( error ) )
                resolve()
            })
            .catch( ( error ) => {
                logError( error )
                reject()
            })
    })
}

const createViewsDir = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/views`, (err) => {
            if (err){
                reject(err)
            }else{
                resolve("Pasta views criada!")
            }
        });
    })
}

const createModalsDir = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/views/modal`, (err) => {
            if (err){
                reject(err)
            }else{
                resolve("Pasta modal criada!")
            }
        });
    })
}

const createDefaultViewFile = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${fatherDir}/views/${fatherDir}.html`, "" , (err) => {
            if (err) reject(err)
            else resolve("Arquivo view padrão do módulo criado!")
        });
    });
}

const createControllersDir = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/controllers`, (err) => {
            if (err){
                reject(err)
            }else{
                resolve("Pasta controllers criada!");
            }
        });
    })
}

const createAjaxDir = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/controllers/ajax`, (err) => {
            if (err){
                reject(err)
            }else{
                resolve();
            }
        });
    })
}

const createModels = ( fatherDir ) => {
    return new Promise( ( resolve, reject ) => {
        createModelsDir( fatherDir )
            .then( response => {
                resolve( logSuccess( response ) )
            })
            .catch( error => { 
                logError( error )
                reject()
            })
    })
}

const createControllers = (fatherDir) => {
    return new Promise( (resolve, reject) => {
        createControllersDir(fatherDir)
        .then( response => {
            resolve( logSuccess(response) )
        })
        .catch( error => { 
            reject() 
            logError(error) 
        })
    })
}

const createModelsDir = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/models`, (err) => {
            if (err){
                reject(err)
            }else{
                resolve("Pasta models criada!");
            }
        });
    })
}

const createNewSubModule = (...moduleAttributes) => {
    const [subModuleName, subModuleType] = moduleAttributes;

    //Criar views do submódulo
    fs.mkdir(`views/${subModuleName}`, (err) => {
        if (err) {
            if (err.code == "EEXIST") {
                logError("Este sub módulo já existe. \n")
            }
            
            logError(err);            
        }

        if(subModuleType == 'crud'){
            for(let i = 0; filesCRUD.length > i; i++){
                const fileName = `views/${subModuleName}/${subModuleName}${filesCRUD[i]}.html`;
                fs.writeFile(fileName, filesCRUD[i] , (err) => {
                    if (err) logError(err);
                });
            }
        }

        logSuccess('Sub módulo criado!');
    });

    fs.mkdir(`controllers/${subModuleName}`, (err) => {
        if (err) {
            if (err.code == "EEXIST") {
                logError("Este sub módulo já existe. \n")
            }
            
            logError(err);            
        }

        logSuccess('Pasta controllers criada!');
    });

    addModuleInConfigFile(subModuleName)
}

module.exports = {
    createNew,
    createNewModule
}