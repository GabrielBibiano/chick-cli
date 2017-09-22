// Configure atributes
const fs = require('fs')
const colors = require('chalk')

// Color to console comments
const comment = colors.grey
const bgWhite = colors.bgBlack

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

exports.createNewModule = (configModule) => {
    fs.mkdir(configModule.nome, (err) => {
        if (err) {
            if (err.code == "EEXIST") {
                console.log("Este módulo já foi criado. \n")
            }
            
            throw err;            
        }
        console.log("Diretório criado!");

        createAssets(configModule.nome)
    });

    fs.writeFile(`${configModule.nome}/tijucli-module.json`, JSON.stringify(configModule), (err) => {
        if (err) throw err;

        console.log('Módulo criado e configurações salvas!');
    });
}

const createAssets = (fatherDir) => {
    fs.mkdir(`${fatherDir}/assets`, (err) => {
        if (err) throw err;
        
        console.log("Pasta assets criada!");
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
            Data: ${data.inicio}
            `)
        });
    });
}