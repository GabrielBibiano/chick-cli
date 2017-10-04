const fs = require('fs')
const { logSuccess, logError } = require('./generic')
const { createConfigModuleFile, verifyConfigFile } = require('./configModule')
const { createNewTemplate } = require('./templates')
const { createAllDefaultAssets } = require('./assets')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

const allCommands = ["iniciar", "criar", "status"]
allCommands["criar"] = ["template", "sub-modulo"]

exports.createNew = (...args) => {
    const createCommands = Array.from(allCommands.criar);
    const [itemToCreate, name, type] = args;

    if(createCommands.includes(itemToCreate)){
        if(itemToCreate == 'sub-modulo'){
            createNewSubModule(name, type)
        }else if(itemToCreate == 'template'){
            createNewTemplate(name, type)
        }
    }else{
        console.log("Digite um comando suportado")
    }
}

exports.createNewModule = async (configModule) => {
    const issetConfigFile = await verifyConfigFile()

    if(issetConfigFile != true){
        createModuleDir()
        .then( async (result) => {
            logSuccess(result)
            await createConfigModuleFile(configModule)
            createViews(configModule.nome)
            createModels(configModule.nome)
            createControllers(configModule.nome)
        })
        .catch(error => {
            logError(error)
        })
    }else{
        logError("Você não pode criar um módulo dentro de outro, crie um sub módulo.")
    }
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

const createViews = (fatherDir) => {
    createViewsDir(fatherDir)
    .then( async response => {
        logSuccess(response)
        await createModalsDir(fatherDir)
            .then(res => logSuccess(res))
            .catch(error => logError(error))
        createDefaultViewFile(fatherDir)
            .then(res => logSuccess(res))
            .catch(error => logError(error))
        createAllDefaultAssets(fatherDir)
            .then(res => logSuccess(res))
            .catch(error => logError(error))
    })
    .catch((error) => {
        logError(error)
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

const createModels = (fatherDir) => {
    createModelsDir(fatherDir)
    .then(response => {
        logSuccess(response)
    })
    .catch((error) => { 
        logError(error)
    })
}

const createControllers = (fatherDir) => {
    createControllersDir(fatherDir)
    .then(response => {
        createAjaxDir(fatherDir)
        .catch(err => err)
        logSuccess(response)
    })
    .catch(error => logError(error))
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
    const filesCRUD = ['Incluir', 'Alterar', 'Excluir', 'Visualizar']

    fs.mkdir(subModuleName, (err) => {
        if (err) {
            if (err.code == "EEXIST") {
                logError("Este sub módulo já existe. \n")
            }
            
            logError(err);            
        }

        if(subModuleType == 'crud'){
            for(let i = 0; filesCRUD.length > i; i++){
                const fileName = `${subModuleName}/${subModuleName}${filesCRUD[i]}.php`;
                fs.writeFile(fileName, filesCRUD[i] , (err) => {
                    if (err) logError(err);
                });
            }
        }

        logSuccess('Sub módulo criado!');
    });
}