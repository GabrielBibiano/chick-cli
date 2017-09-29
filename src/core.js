const fs = require('fs')
const { createConfigModuleFile } = require('./configModule')
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

exports.createNewModule = (configModule) => {
    createModuleDir().then((result) => {
        createConfigModuleFile(configModule)
        createViews(configModule.nome)
        createModels(configModule.nome),
        createControllers(configModule.nome),
        console.log(bgGreen(black('Show!')), result);
    }).catch(error => {
        console.log(bgRed('Ops!'), error)
    })
}

const createModuleDir = () =>{
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

const createViews = async (fatherDir) => {
    return Promise.all([
        createViewsDir(fatherDir),
        createDefaultViewFile(fatherDir),
        createAllDefaultAssets(fatherDir),
    ]).then(result => {
        for(let i = 0; i < result.length; i++){
            console.log(bgGreen(black('Show!')), result[i]);
        }
    }).catch((error) => {
        console.log(bgRed('Ops!'), error)
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
    createModelsDir(fatherDir).then(response => {
        console.log(bgGreen(black('Show!')), response)
    })
    .catch((error) => { 
        console.log(bgRed('Ops!'), error)
    })
}

const createControllers = (fatherDir) => {
    createControllersDir(fatherDir).then(response => {
        createAjaxDir(fatherDir).catch(err => err)
        console.log(bgGreen(black('Show!')), response)
    })
    .catch((error) => { 
        console.log(bgRed('Ops!'), error)
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
    const filesCRUD = ['Incluir', 'Alterar', 'Excluir', 'Visualizar']

    fs.mkdir(subModuleName, (err) => {
        if (err) {
            if (err.code == "EEXIST") {
                console.log("Este sub módulo já existe. \n")
            }
            
            throw err;            
        }

        if(subModuleType == 'crud'){
            for(let i = 0; filesCRUD.length > i; i++){
                const fileName = `${subModuleName}/${subModuleName}${filesCRUD[i]}.php`;
                fs.writeFile(fileName, filesCRUD[i] , (err) => {
                    if (err) throw err;
                });
            }
        }

        console.log(bgGreen(black('Show!')), "Sub módulo criado!");
    });
}