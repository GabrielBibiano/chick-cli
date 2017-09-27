const fs = require('fs')
const { verifyConfigFile } = require('./config')
const { ifNotExists } = require('./generic')
const { bgWhite } = require('./colorsVariables')

const capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const requireDefaultTemplateByType = (type = "") => {
    if(type != "") type = capitalize(type)
    let fileTemplate = `${__dirname}/defaultModuleFiles/default${type}.html`

    return new Promise ((resolve, reject) => {
        fs.readFile(fileTemplate, (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}

exports.createNewTemplate = (name, type) => {
    verifyConfigFile().then( async (result) => {
        const template = await requireDefaultTemplateByType(type)
        ifNotExists(name, 'html').then(() => {
            fs.writeFile(`views/${name}.html`, template, (e) => {
                if(e) throw e
                console.log(`Arquivo ${bgWhite(name)} criado!`)
            })
        }).catch((error) => {
            console.log(`Já existe um template com o nome ${bgWhite(name)}!`)
        })
    }).catch((err) => {
        console.log('Error! Por favor, navegue até a raiz de um módulo válido.');
    })
}