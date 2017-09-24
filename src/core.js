const fs = require('fs')
const {comment, bgWhite} = require('./colorsVariables')

const allCommands = ["iniciar", "criar", "status"]
allCommands["criar"] = ["template", "sub-modulo"]

exports.config = (projectName) => {
    const configModule = {
        nome: projectName,
        inicio: Date()
    }

    return configModule;
}

const createConfigFile = (configModule) => {
    fs.writeFile(`${configModule.nome}/tijucli-module.json`, JSON.stringify(configModule), (err) => {
        if (err) throw err;
        console.log('Módulo criado e configurações salvas!');
    });
}

exports.createNew = (...args) => {
    const createCommands = Array.from(allCommands.criar);
    const [itemToCreate, name, type] = args;

    if(createCommands.includes(itemToCreate)){
        if(itemToCreate == 'sub-modulo'){
            createNewSubModule(name, type)
        }else if(itemToCreate == 'template'){
            createNewViewByFather(name, type)
        }
    }else{
        console.log("Digite um comando suportado")
    }
}

exports.createNewModule = (configModule) => {
    fs.mkdir(configModule.nome, (err) => {
        if (err) {
            if (err.code == "EEXIST") {
                console.log("Este módulo já foi criado. \n")
            }
            
            throw err;            
        }

        console.log("Diretório criado!");

        createAssetsByFather(configModule.nome)
        createViewsDirByFather(configModule.nome)
    });

    setTimeout(() => {
        createConfigFile(configModule)
    }, 1000)
}

const createAssetsByFather = (fatherDir) => {
    fs.mkdir(`${fatherDir}/assets`, (err) => {

        if (err) throw err;
        console.log("Pasta assets criada!");

        fs.mkdir(`${fatherDir}/assets/css`, (err) => {
            if (err) throw err;
            console.log("Pasta css criada!");
        });
        
        fs.mkdir(`${fatherDir}/assets/js`, (err) => {
            if (err) throw err;
            console.log("Pasta js criada!");
        });

    });

    setTimeout(() => {
        fs.writeFile(`${fatherDir}/assets/js/${fatherDir}.js`, "", (err) => {
            if (err) throw err;
            console.log("Arquivo js do módulo criado!");
        });

        fs.writeFile(`${fatherDir}/assets/css/${fatherDir}.css`, "", (err) => {
            if (err) throw err;
            console.log("Arquivo css do módulo criado!");
        });
    }, 1000)
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

const createNewViewByFather = (nameFile, typeOfTemplate) => {
    fs.writeFile(`views/${nameFile}.html`, typeOfTemplate , (err) => {
        if (err) throw err;
    });

    console.log('Novo arquivo de template criado!')
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