const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if thres an error, reject the Promise and send the error to the promise's '.catch()' method
            if (err) {
                reject (err);
                //return out of the funciton here to make sure the Promise doesn't accidently execute the resolve() function as well 
                return;
            }
            //if everything went well, resolve the promise and send the successful date to the '.then()' method
            resolve({
                ok: true,
                message: 'File created!'
            });
        })
    });
}

const copyFile = () => {
    return new Promise((resolve, reject) => { 
      fs.copyFile('./src/style.css', './dist/style.css', err => {
        if (err) {
          reject (err);
          return;
        }
        resolve({
            ok: true, 
            message: 'style sheet copied!'
      });
    })
})
}

// //export data 
// module.exports = {
//     writeFile: writeFile, 
//     copyFile: copyFile
// };

//simplified ^^
module.exports = { writeFile, copyFile };

