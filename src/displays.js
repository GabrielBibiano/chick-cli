const fs = require('fs')
const { comment, bgWhite } = require('./colorsVariables')

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