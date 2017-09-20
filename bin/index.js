#! /usr/bin/env node
const fs = require('fs');
const config = require('./config');

const cliArguments = process.argv.splice(2, process.argv.length -1)

// iniciar <nome do novo modulo>
// criar <outro argumento == rota, template >

const allCommands = ["iniciar", "criar"]
allCommands["criar"] = ["rota", "template"]

const verifyFirstArgument = (firstArgument, secondArgument) => {
    if(firstArgument == "iniciar"){
        console.log(config(secondArgument))
    }else if(firstArgument == "criar"){
        createNew(secondArgument) 
    }
}

createNew = (arg) => {
    const createCommands = Array.from(allCommands.criar);
    createCommands.includes(arg) ? 
        console.log("Criado: " + arg)
    :
        console.log("Digite um comando suportado")
}

verifyFirstArgument(cliArguments[0], cliArguments[1])