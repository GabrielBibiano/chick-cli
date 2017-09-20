// Configure atributes
const fs = require('fs')

exports.config = (projectName) => {
    const configModule = {
        nome: projectName,
        inicio: Date()
    }

    return configModule;
}

exports.createNewModule = (configModule) => {
    fs.writeFile('tijucli-module.json', JSON.stringify(configModule), (err) => {
        if (err) throw err;
        console.log('Módulo criado e configurações salvas!');
    });
}

exports.viewConfig = () => {
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
            Data: ${data.inicio}
            `)
        });
    });
}