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
const fs = require('fs');
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





promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);

    fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });

