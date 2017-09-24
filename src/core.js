// Configure atributes
const fs = require('fs')
const colors = require('chalk')

// Color to console comments
const comment = colors.grey
const bgWhite = colors.bgBlack

// iniciar <nome do novo modulo>
// criar <outro argumento == rota, template, sub-modulo>
const allCommands = ["iniciar", "criar", "status"]
allCommands["criar"] = ["template", "sub-modulo"]

exports.displayHelpers = (command = null) => {
    let helpers;
    if (command == null){
        helpers = `
    Modo de uso: tiju <comando> [...opcionais]

    Comandos:

      iniciar             criar novo módulo
      criar               criar novo template(view) ou sub-modulo
      status              ver as configurações do módulo
      ajuda <comando>     mostrar instruções de como usar <comando>
        `;
    }else if (command == 'iniciar'){
        helpers = `
    Modo de uso: $ tiju iniciar <nome-do-modulo>

    Exemplo:
    
      ${comment('# cria um novo módulo chamado viagens')}
      $ tiju iniciar viagens
        `;
    }else if (command == 'criar'){
        helpers = `
    ${comment('# <> = comando obrigatório; [] = argumento opcional;')}
    Modo de uso: $ tiju criar <item> <nome> [tipo]

    <item> = template || sub-modulo

    [tipo] para <item> = template:   (vazio), form, dataTable, formTable
    [tipo] para <item> = sub-modulo: (vazio), crud

    Exemplo template:
    
      ${comment('# cria uma view chamada vizualizarCombustivel do tipo vazio')}
      $ tiju criar template vizualizarPedido

    Exemplo sub-modulo:
    
      ${comment('# cria um sub módulo chamado motoristas do tipo crud')}
      $ tiju criar sub-modulo motoristas crud
        `;
    }
   
    console.log(helpers)
}

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

exports.displayConfig = () => {
    fs.open('tijucli-module.json', 'r', (err, fd) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error("O aquivo de configuração não existe.");
                return;
            }

            throw err;
        }

        fs.readFile('tijucli-module.json', (err, data) => {
            if (err) throw err;
            data = JSON.parse(data)
            console.log(
            `
            Nome: ${data.nome}
            Inicio: ${data.inicio}
            `)
        });
    });
}