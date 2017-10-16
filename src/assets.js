const fs = require('fs')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

const createAssetsDirByFather = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/views/assets`, (err) => {
            err ? reject(err) : resolve(true)
        });
    })
}

const createCssDir = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/views/assets/css`, (err) => {
           err ? reject(err) : resolve(true)
        });
    })
}

const createJsDir = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/views/assets/js`, (err) => {
            err ? reject(err) : resolve(true)
        });
    })
}

const createJsDefaultFile = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${fatherDir}/views/assets/js/${fatherDir}.js`, "", (err) => {
            if (err) reject(err)
            else resolve("Arquivo js do módulo criado!")
        })
    })
}

const createCssDefaultFile = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${fatherDir}/views/assets/css/${fatherDir}.css`, "", (err) => {
            if (err) reject(err)
            else resolve("Arquivo css do módulo criado!")
        })
    })
}

exports.createAllDefaultAssets = (fatherDir) => {
    return new Promise((resolve, reject) => {
        createAssetsDirByFather(fatherDir)
            .then( async () => {
                await createJsDir(fatherDir)
                    .then(() =>  createJsDefaultFile(fatherDir))
                    .catch((err) => reject(err))
                await createCssDir(fatherDir)
                    .then(() => createCssDefaultFile(fatherDir))
                    .catch((err) => reject(err))
                resolve('Assets criados!')
            })
            .catch((err) => reject(err))
    })
}