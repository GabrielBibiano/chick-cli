const fs = require('fs')

const createCssDir = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/assets/css`, (err) => {
           err ? reject(err) : resolve(true)
        });
    })
}

const createJsDir = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/assets/js`, (err) => {
            err ? reject(err) : resolve(true)
        });
    })
}

const createAssetsDirByFather = (fatherDir) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(`${fatherDir}/assets`, (err) => {
            err ? reject(err) : resolve(true)
        });
    })
}

const createDefaultAssetsFiles = (fatherDir) => {
    fs.writeFile(`${fatherDir}/assets/js/${fatherDir}.js`, "", (err) => {
        if (err) throw err;
        console.log("Arquivo js do módulo criado!");
    });

    fs.writeFile(`${fatherDir}/assets/css/${fatherDir}.css`, "", (err) => {
        if (err) throw err;
        console.log("Arquivo css do módulo criado!");
    });
}

exports.createAllDefaultAssets = async (fatherDir) => {
    try {
        await createAssetsDirByFather(fatherDir);
        await createJsDir(fatherDir);
        await createCssDir(fatherDir);
        await createDefaultAssetsFiles(fatherDir)
        console.log('Assets criados!')
    } catch (error) {
        console.log(error)
    }
}