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

exports.createAllDefaultAssets = async (fatherDir) => {
    return Promise.all([
        createAssetsDirByFather(fatherDir),
        createJsDir(fatherDir),
        createCssDir(fatherDir),
        new Promise((resolve, reject) => {
            fs.writeFile(`${fatherDir}/views/assets/js/${fatherDir}.js`, "", (err) => {
                if (err) reject(err)
                else resolve("Arquivo js do módulo criado!")
            })
        }),
        new Promise((resolve, reject) => {
            fs.writeFile(`${fatherDir}/views/assets/css/${fatherDir}.css`, "", (err) => {
                if (err) reject(err)
                else resolve("Arquivo css do módulo criado!")
            })
        })
    ]).then((result) => {
        return 'Assets criados!'
    }).catch((err) => {
        return err[0]
    })
}