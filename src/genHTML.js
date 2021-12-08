const genManager = function(manager) {
  return `
  <div class="card" style="max-width: 30rem;">
    <div class="card-header">
      <h2 style="text-align: center;">${manager.name}</h2>
    </div>
    <div class="card-body">
      <div class="card-title">
        <i style="padding-top: 20px; padding-right: 10px;" class="fas fa-mug-hot"></i><h4>Manager</h4>
      </div>
      <div >
        <p class="card-text">ID: ${manager.id}</p>
        <p class="card-text">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
        <p class="card-text">Office Number: ${manager.officeNumber}</p>
      </div>       
    </div>
  </div>
  `
};

const genEngineer = function(engineer) {
  return `
  <div class="card" style="max-width: 25rem;">
    <div class="card-header">
      <h2 style="text-align: center;">${engineer.name}</h2>
    </div>
    <div class="card-body">
      <div class="card-title">
        <i style="padding-top: 20px; padding-right: 10px;" class="fas fa-glasses"></i><h4>Engineer</h4>
      </div>
      <div >
        <p class="card-text">ID: ${engineer.id}</p>
        <p class="card-text">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
        <p class="card-text">GitHub: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
      </div>       
    </div>
  </div>
  `
};

const genIntern = function(intern) {
  return `
  <div class="card" style="max-width: 20rem;">
    <div class="card-header">
      <h2 style="text-align: center;">${intern.name}</h2>
    </div>
    <div class="card-body">
      <div class="card-title">
        <i style="padding-top: 20px; padding-right: 10px;" class="fas fa-graduation-cap"></i><h4>Intern</h4>
      </div>
      <div >
        <p class="card-text">ID: ${intern.id}</p>
        <p class="card-text">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
        <p class="card-text">School: ${intern.school}</p>
      </div>       
    </div>
  </div>
  `
};

genHTML = (data) => {
  dataArray = [];

  for (let i = 0; i < data.length; i++) {
    const employee = data[i];
    const role = employee.getRole(); 

    if (role === "Manager") {
        const managerCard = genManager(employee);

        dataArray.push(managerCard);
    }

    if (role === "Engineer") {
        const engineerCard = genEngineer(employee);

        dataArray.push(engineerCard);
    }

    if (role === "Intern") {
        const internCard = genIntern(employee);

        dataArray.push(internCard);
    }
  }

  const employeeCard = dataArray.join("");

  const genTeam = genHTMLpage(employeeCard);
  return genTeam;
};

const genHTMLpage = function(employeeCard) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./style.css">
    <script src="https://kit.fontawesome.com/59cf3fa460.js" crossorigin="anonymous"></script>
    <title>Team Profile</title>
  </head>
  <body>
    <header class="banner">
      <h1 style="text-align: center;">My Team</h1>
    </header>
    <div class="container">
      <!-- Add Employee Cards Here!  -->
      ${employeeCard}
    </div>
  </body>
  </html>
  `
};

module.exports = genHTML;
