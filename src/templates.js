const fs = require('fs')

const capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const requireDefaultTemplateByType = (type) => {
    type = capitalize(type)
    let fileTemplate = `${__dirname}/defaultModuleFiles/default${type}.html`

    return new Promise ((resolve, reject) => {
        fs.readFile(fileTemplate, (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}

exports.createNewTemplate = async (name, type) => {
    const template = await requireDefaultTemplateByType(type)

    fs.writeFile(`views/${name}.html`, template, (err) => {
        if(err) throw err
        console.log(`${name} criado!`)
    })
}