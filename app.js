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

// const fs = require('fs');

// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs;


// fs.writeFile('./index.html', generatePage(name, github), err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });


// //lesson 3
const inquirer = require('inquirer');
// const generateSite = require('./utils/generate-site.js')
//^ simplified : 
const { writeFile, copyFile } = require('./utils/generate-site.js');
// const fs = require('fs');
const generatePage = require('./src/page-template');



const promptUser = () => {
 return inquirer.prompt([
    {
      type: 'input',
      name: 'name', 
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username. (Required)', 
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your github username!');
          return false;
        }
      }
    },
    // {
    //   type: 'input',
    //   name: 'about',
    //   message: 'Provide some information about yourself:'
    // },
    {
      type: 'confirm', 
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About Me" section?',
      default: true
    }, 
    {
      type: 'input', 
      name: 'about', 
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ])
}

// promptUser().then(answers => console.log(answers));


const promptProject = portfolioData => {
  // if theres no projects array property, create one
  console.log(`
  =====================
  Add a New Project 
  =====================
`);
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)', 
      validate: projectNameInput => {
        if (projectNameInput) {
          return true;
        } else {
          console.log('Please enter your project name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: projectDescription => {
        if (projectDescription) {
          return true;
        } else {
          console.log('Please enter a description about your project!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: githubLink => {
        if (githubLink) {
          return true;
        } else {
          console.log('Please provide a description of your project!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  })
}




//acceptable but next cleaner
// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     const pageHTML = generatePage(portfolioData);

//     fs.writeFile('./dist/index.html', pageHTML, err => {
//       if (err) {
//         // throw new Error(err);
//         console.log(err);
//         return;
//       }
//       console.log('Page created! Check out index.html in this directory to see it!');

//       fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//         console.log('style sheet copied successfully!');
//       });
//     });
//   });

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

  // ^^We start by asking the user for their information with Inquirer prompts; this returns all of the data as an object in a Promise.

  // The promptProject() function captures the returning data from promptUser() and we recursively call promptProject() for as many projects as the user wants to add. Each project will be pushed into a projects array in the collection of portfolio information, and when we're done, the final set of data is returned to the next .then().
  
  // The finished portfolio data object is returned as portfolioData and sent into the generatePage() function, which will return the finished HTML template code into pageHTML.
  
  // We pass pageHTML into the newly created writeFile() function, which returns a Promise. This is why we use return here, so the Promise is returned into the next .then() method.
  
  // Upon a successful file creation, we take the writeFileResponse object provided by the writeFile() function's resolve() execution to log it, and then we return copyFile().
  
  // The Promise returned by copyFile() then lets us know if the CSS file was copied correctly, and if so, we're all done!