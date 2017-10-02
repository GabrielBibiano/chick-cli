#! /usr/bin/env node
const { defineRootErpToConfiguration } = require('../src/configRoot');
const { createNew, createNewModule} = require('../src/core');
const { configDataModule } = require('../src/configModule');
const { displayConfig, displayHelpers } = require('../src/displays');

const cliArguments = process.argv.splice(2, process.argv.length -1)

const verifyArguments = (arguments) => {
    const [firstArgument, secondArgument, thirdArgument, fourthArgument] = arguments;

    if (arguments.length == 0) {
        displayHelpers()
    } else if (firstArgument == "iniciar") {
        createNewModule(configDataModule(secondArgument))
    } else if (firstArgument == "criar") {
        createNew(secondArgument, thirdArgument, fourthArgument) 
    } else if (firstArgument == "status") {
        displayConfig()
    } else if (firstArgument == "ajuda") {
        displayHelpers(secondArgument)
    } else if (firstArgument == "usar") {
        defineRootErpToConfiguration()
    }
}

verifyArguments(cliArguments)