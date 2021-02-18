const fs = require('fs');
const path  = require('path');

let studentBoy = path.join(__dirname, '18-00');
let studentGirl = path.join(__dirname, '20-00');


function studentsTime (boyTime, girlTime) {
    fs.readdir(boyTime, (err, files) => {
        if (err) {
            console.log(err);
            return
        }
        files.forEach(valueTime => {
            fs.readFile(path.join(boyTime, valueTime), ((err1, data) => {

                const user = JSON.parse(data);
                if(user.gender === 'female') {
                    fs.rename(path.join(boyTime, valueTime), path.join(studentGirl, valueTime), err2 => {
                        if(err2)
                        console.log(err2);
                        return
                    })
                }
            }))
        })
    })

    fs.readdir(girlTime, (err, files) => {
        if (err) {
            console.log(err);
            return
        }
        files.forEach(valueTime => {
            fs.readFile(path.join(girlTime, valueTime), ((err1, data) => {

                const user = JSON.parse(data);
                if(user.gender === 'male') {
                    fs.rename(path.join(girlTime, valueTime), path.join(studentBoy, valueTime), err3 => {
                        if(err3)
                            console.log(err3)
                        return
                    })
                }
            }))
        })
    })
}


studentsTime(studentBoy, studentGirl);

