// // need this code to execute fs.writeFile()
// const fs = require('fs');
// // get page-template module info
// // now the object in module.exports assignment will be reassigned to the generatePage variable in app.js
// const generatePage = require('./src/page-template.js')

// const profileDataArgs = process.argv.slice(2, process.argv.length);

// const [name, github] = profileDataArgs;
// // console.log(profileDataArgs);

// // const printProfileData = (profileDataArr) => {
// //     // This ...
// //     for (let i = 0; i < profileDataArr.length; i++) {
// //         console.log(profileDataArr[i]);
// //     }

// //     console.log('=============');

// //     // Is the same as this 
// //     profileDataArr.forEach(profileItem => console.log(profileItem) );
// // };

// // printProfileData(profileDataArgs);

// // or could use featured called assignment destructuring - assigns elements of an array to vairable names in a single expression as below 


// // arrow function we can ommit the return keyword and {} when only 1 statment like below 


// // extract arguments in user-command line 
// // const name = profileDataArgs[0];
// // const github = profileDataArgs[1];
// // console.log(generatePage(name, github));


// fs.writeFile('index.html', generatePage(name, github), err => {
//     // throw err stops the execution of code and shows info on error in terminal
//     if(err) throw err;

//     console.log('Porfolio complete! Check out index.html to see the output!');
// })

const fs = require('fs');

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

const generatePage = (name, github) => {
  return `
  <!DOCTYPE html> 
  <html lang="en"> 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
  </head>

  <body>
    <h1>${name}</h1>
    <h2><a href="https://github.com/${github}">Github</a></h2>
  </body>
  </html>
  `;
};

fs.writeFile('./index.html', generatePage(name, github), err => {
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
});