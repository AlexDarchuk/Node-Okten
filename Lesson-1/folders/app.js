const fs = require('fs');
const path = require('path');
const { promisify } = require('util');


let folder = path.join(__dirname);
let folderOld = path.join(__dirname, 'folderOld');

function takeFolder (folderOld,folder) {
    fs.readdir(folderOld, (err, files) => {
        if(err) {
            console.log(err);
            return
        }
        files.forEach(value => {
            let oldDir = path.join(folderOld, value);
            fs.stat(oldDir, (err1, data) => {
                if (err1) {
                    console.log(err1)
                    return
                }

                if(data.isDirectory()) {
                    takeFolder(oldDir, folder)
                } else {
                    fs.rename(oldDir, path.join(folder, value), err3 => {
                        if(err3) {
                            console.log(err3)
                            return
                        }
                    })
                }
            })
        })
    })

}

takeFolder(folderOld, folder);