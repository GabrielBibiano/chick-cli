const fs = require('fs')
const { createConfigModuleFile } = require('./config')
const { createNewTemplate } = require('./templates')
const { createAllDefaultAssets } = require('./assets')
const { comment, bgWhite } = require('./colorsVariables')

const allCommands = ["iniciar", "criar", "status"]
allCommands["criar"] = ["template", "sub-modulo"]

exports.configModule = (projectName) => {
    return configModule = {
        nome: projectName,
        inicio: Date()
    }
}

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
    await fs.mkdir(configModule.nome, (err) => {
        if (err) {
            if (err.code == "EEXIST") {
                console.log("Este módulo já foi criado. \n")
            }
            
            throw err;            
        }

        console.log("Diretório criado!");
    });
    
    createConfigModuleFile(configModule)
    createAllDefaultAssets(configModule.nome)
    createViewsDirByFather(configModule.nome)
}

const createViewsDirByFather = (fatherDir) => {
    fs.mkdir(`${fatherDir}/views`, (err) => {
        if (err) throw err;
        console.log("Pasta views criada!");

        fs.writeFile(`${fatherDir}/views/${fatherDir}.html`, "" , (err) => {
            if (err) throw err;
        });
    });
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

        console.log("Sub módulo criado!");
    });
}