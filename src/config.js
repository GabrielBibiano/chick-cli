const fs = require('fs')

exports.createConfigModuleFile = (configModule) => {
    fs.writeFile(`${configModule.nome}/tijucli-module.json`, JSON.stringify(configModule), (err) => {
        if (err) throw err;
        console.log('Módulo criado e configurações salvas!');
    });
}

exports.verifyConfigFile = () => {
    return new Promise((resolve, reject) => {
        fs.open('tijucli-module.json', 'r', (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    reject(err) 
                }
            }

            resolve(true)
        })
    })
}