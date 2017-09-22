#! /usr/bin/env node
const { 
    config, 
    createNewModule, 
    displayConfig,
    displayHelpers
} = require('./core');

const cliArguments = process.argv.splice(2, process.argv.length -1)

// iniciar <nome do novo modulo>
// criar <outro argumento == rota, template, sub-modulo>
const allCommands = ["iniciar", "criar", "status"]
allCommands["criar"] = ["rota", "template", "sub-modulo"]

const verifyArguments = (arguments) => {
    const [firstArgument, secondArgument] = arguments;

    if (arguments.length == 0) {
        displayHelpers()
    } else if (firstArgument == "iniciar") {
        const configModule = config(secondArgument)
        createNewModule(configModule)
    } else if (firstArgument == "criar") {
        createNew(secondArgument) 
    } else if (firstArgument == "status") {
        displayConfig()
    } else if (firstArgument == "ajuda") {
        displayHelpers(secondArgument)
    }
}

const createNew = (arg) => {
    const createCommands = Array.from(allCommands.criar);

    createCommands.includes(arg) ? 
        console.log(`Criado: ${arg}`)
    :
        console.log("Digite um comando suportado")
}

verifyArguments(cliArguments)  