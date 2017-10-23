const fs = require('fs')
const { comment, bgWhite } = require('./colorsVariables')
const { logSuccess, logError } = require( './generic' )
const { readConfigModuleFile } = require( './configModule' )
const { verifyConfigRootFile, readConfigRootFile } = require( './configRoot' )

exports.displayHelpers = ( command = null ) => {
    let helpers;
    if (command == null){
        helpers = `
    Modo de uso: tiju <comando> [...opcionais]

    Comandos:
      
      usar                define este diretório como a raiz do projeto
      iniciar             criar novo módulo
      criar               criar novo template(view) ou sub-modulo
      status              ver as configurações do módulo
      ajuda <comando>     mostrar instruções de como usar <comando>
        `;
    }else if (command == 'iniciar'){
        helpers = `
    Modo de uso: $ tiju iniciar <nome-do-modulo>

    Exemplo:
    
      ${ comment('# cria um novo módulo chamado viagens') }
      $ tiju iniciar viagens
        `;
    }else if (command == 'criar'){
        helpers = `
    ${ comment('# <> = comando obrigatório; [] = argumento opcional;') }
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
   
    console.log( helpers )
}

exports.displayConfig = () => {
    verifyConfigRootFile()
    .then( () => {
        fs.open('tijucli-module.json', 'r', ( err ) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    logError( "O aquivo de configuração não existe." )
                    return;
                }

                throw err;
            }

            fs.readFile('tijucli-module.json', ( err, data ) => {
                if ( err ) throw err;
                data = JSON.parse( data )
                console.log(
                `
                Nome: ${ data.nome }
                Inicio: ${ data.inicio }
                `)

            });
        });
    })
    .catch( async () => {
        // Lê o arquivo de configuração raiz
        const dataConfig = await readConfigRootFile()
        const modulos = Object.keys( dataConfig.modules )
        let log = '';

        modulos.forEach( async item => {
            let logSubmodules = ''

            // Lê o arquivo de configuração do múdulo
            const sub = await readConfigModuleFile( item )
            const subModulos = Object.keys( sub.subModules )
            
            subModulos.forEach( sub => {
                logSubmodules += `\n \t \t \t    | --  ${ sub } `
            })

            log += `\n \t \t \t| -- ${ item } ${ logSubmodules } `
        })

        setTimeout( () => {
            console.log(
            `
            Pasta raiz: ${ dataConfig.pasta }
            Inicio: ${ dataConfig.inicio }
            Módulos: ---${ log }
            `)
        }, 500)
    })
}