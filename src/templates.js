const fs = require('fs')
const { logSuccess, logError } = require('./generic')
const { verifyConfigFile } = require('./configModule')
const { ifNotExists } = require('./generic')
const { bgWhite } = require('./colorsVariables')

const capitalize = ( str ) => str.charAt( 0 ).toUpperCase() + str.slice( 1 )

const requireDefaultTemplateByType = ( type = '' ) => {
    let typeCap;
    ( type != '' ) 
        ? typeCap = capitalize( type )
        : typeCap = ''

    let fileTemplate = `${__dirname}/defaultModuleFiles/default${ typeCap }.html`
    return new Promise( ( resolve, reject ) => {
        fs.readFile( fileTemplate, ( err, data ) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    reject(`Por favor, escolha um tipo de template válido \nO template ${ bgWhite(type) } não existe.`) 
                }
            }else{
                resolve(data)
            }
        })
    })
}

exports.createNewTemplate = (name, type) => {
    verifyConfigFile()
    .then( (result) => {
        requireDefaultTemplateByType(type)
        .then(template => {
            ifNotExists(name, 'html')
            .then(() => {
                fs.writeFile(`views/${name}.html`, template, (e) => {
                    if(e) throw e
                    logSuccess(`Arquivo ${bgWhite(name)} criado!`)
                })
            })
            .catch((error) => {
                logError(`Já existe um template com o nome ${bgWhite(name)}!`)
            })
        })
        .catch((err) => {
            logError(err)
        })
    })
    .catch((err) => {
        logError('Error! Por favor, navegue até a raiz de um módulo válido.')
    })
}