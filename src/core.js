const fs = require( 'fs' )
const { verifyConfigRootFile, addModuleInConfigRootFile } = require( './configRoot' )
const { logSuccess, logError, progressStart, progressStop, random } = require( './generic' )
const { verifyConfigFile, createConfigModuleFile, addModuleInConfigFile } = require( './configModule' )
const { createNewTemplate } = require( './templates' )
const { createAllDefaultAssets } = require( './assets' )
const { comment, black, bgWhite, bgRed, bgGreen } = require( './colorsVariables' )

const filesCRUD = [ 'Incluir', 'Alterar', 'Excluir', 'Visualizar' ]
const allCommands = [ 'iniciar', 'criar', 'status' ]
allCommands[ 'criar' ] = [ 'template', 'sub' ]

const createNew = ( ...args ) => {
    const createCommands = Array.from( allCommands.criar )
    const [ itemToCreate, name, type ] = args

    if ( createCommands.includes( itemToCreate ) ) {
        if ( itemToCreate == 'sub' ) { 
            verifyConfigFile()
            .then( () => {
                createNewSubModule( name, type )
            }).catch( () => {
                logError( 'Você só pode criar um sub módulo no diretório de um módulo.' )
            })
        } else if ( itemToCreate == 'template' ) {
            createNewTemplate( name, type )
        }
    } else {
        logError( 'Digite um comando suportado' )
    }
}

const createNewModule = ( configModule ) => {
    // Se existir arquivo de configuração raiz
    verifyConfigRootFile()
        .then( () => logError( 'Você só pode criar um módulo na raiz do projeto.' ) )
        .catch( () => {
            createModuleDir()
                .then( async result => {
                    progressStart( 'Aguarde' )
                    logSuccess( result )
                    await createConfigModuleFile( configModule )
                    await createViews( configModule.nome )
                    await createModels( configModule.nome )
                    await createControllers( configModule.nome )
                    addModuleInConfigRootFile( configModule.nome )
                    progressStop()
                })
                .catch( error => logError( error ) )
        })
}

const createModuleDir = () => {
    return new Promise( ( resolve, reject ) => {
        fs.mkdir( configModule.nome, ( err ) => {
            if ( err ) {
                if ( err.code == 'EEXIST' ) {
                    reject( 'Este módulo já existe.' )
                }
            }else{
                resolve( 'Módulo criado!' );
            }
        });
    })
}

const createViews = ( fatherDir ) => new Promise( ( resolve, reject ) => {
    createViewsDir( fatherDir )
        .then( async ( response ) => {
            logSuccess( response )
            await createModalsDir( fatherDir )
                .then( res => logSuccess( res ) )
                .catch( error => logError( error ) )
            await createDefaultViewFile( fatherDir )
                .then( res => logSuccess( res) )
                .catch( error => logError( error ) )
            await createAllDefaultAssets( fatherDir )
                .then( res => logSuccess( res) )
                .catch( error => logError( error ) )
            resolve()
        })
        .catch( ( error ) => {
            logError( error )
            reject()
        })
})

const createViewsDir = ( fatherDir ) => new Promise( ( resolve, reject ) => {
    fs.mkdir(`${ fatherDir }/views`, ( err ) => {
        ( err ) 
            ? reject( err )
            : resolve( "Pasta views criada!" )
    });
})

const createModalsDir = ( fatherDir ) => new Promise( ( resolve, reject ) => {
    fs.mkdir(`${ fatherDir }/views/modal`, ( err ) => {
        ( err ) 
            ? reject( err )
            : resolve( "Pasta modal criada!" )
    });
})

const createDefaultViewFile = ( fatherDir ) => new Promise( ( resolve, reject ) => {
    fs.writeFile(`${ fatherDir }/views/${fatherDir}.html`, "" , ( err ) => {
        ( err ) 
            ? reject( err )
            : resolve( "Arquivo view padrão do módulo criado!" )
    });
});

const createControllersDir = ( fatherDir ) => new Promise( ( resolve, reject ) => {
    fs.mkdir(`${ fatherDir }/controllers`, ( err ) => {
        ( err ) 
            ? reject( err ) 
            : resolve( "Pasta controllers criada!" )
    });
})

const createAjaxDir = ( fatherDir ) => new Promise( ( resolve, reject ) => {
    fs.mkdir(`${ fatherDir }/controllers/ajax`, ( err ) => {
        ( err ) 
        ? reject( err )
        : resolve()
    });
})

const createModels = ( fatherDir ) => new Promise( ( resolve, reject ) => {
    createModelsDir( fatherDir )
        .then( response => {
            resolve( logSuccess( response ) )
        })
        .catch( error => { 
            logError( error )
            reject()
        })
})

const createControllers = ( fatherDir ) => new Promise( ( resolve, reject ) => {
    createControllersDir( fatherDir )
        .then( response => {
            resolve( logSuccess( response ) )
        })
        .catch( error => { 
            reject()
            logError( error ) 
        })
})

const createModelsDir = ( fatherDir ) => new Promise( ( resolve, reject ) => {
    fs.mkdir(`${ fatherDir }/models`, ( err ) => {
        ( err )
            ? reject( err )
            : resolve("Pasta models criada!")
    });
})

const createNewSubModule = ( ...moduleAttributes ) => {
    const [ subModuleName, subModuleType ] = moduleAttributes

    // Criar views do submódulo
    fs.mkdir(`views/${ subModuleName }`, ( err ) => {
        if ( err ) {
            if ( err.code == 'EEXIST' ) {
                logError( 'Este sub módulo já existe. \n' )
            }
            
            logError( err );            
        }else {
            progressStart( 'Aguarde' )
            if( subModuleType == 'crud' ){
                for( let i = 0; filesCRUD.length > i; i++ ){
                    const fileName = `views/${ subModuleName }/${ subModuleName }${ filesCRUD[ i ] }.html`;
                    fs.writeFile( fileName, filesCRUD[ i ], ( err ) => {
                        if ( err ) logError( err )
                    });
                }
            }

            logSuccess('Sub módulo criado!')

            fs.mkdir(`controllers/${ subModuleName }`, ( err ) => {
                if ( err ) {
                    if ( err.code == 'EEXIST' ) {
                        logError( 'Este sub módulo já existe. \n' )
                    }
                    
                    logError( err )
                }

                logSuccess( 'Pasta controllers criada!' )
            });

            addModuleInConfigFile( subModuleName )
            progressStop()
        }

    });
}

module.exports = {
    createNew,
    createNewModule
}