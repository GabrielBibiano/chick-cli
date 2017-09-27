#! /usr/bin/env node
const { configModule, createNew, createNewModule} = require('../src/core');
const { displayConfig, displayHelpers } = require('../src/displays');

const cliArguments = process.argv.splice(2, process.argv.length -1)

const verifyArguments = (arguments) => {
    const [firstArgument, secondArgument, thirdArgument, fourthArgument] = arguments;

    if (arguments.length == 0) {
        displayHelpers()
    } else if (firstArgument == "iniciar") {
        createNewModule(configModule(secondArgument))
    } else if (firstArgument == "criar") {
        createNew(secondArgument, thirdArgument, fourthArgument) 
    } else if (firstArgument == "status") {
        displayConfig()
    } else if (firstArgument == "ajuda") {
        displayHelpers(secondArgument)
    }
}

verifyArguments(cliArguments)  