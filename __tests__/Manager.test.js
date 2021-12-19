const Manager = require('../lib/Manager');

test('creates an Manager object', () => {
  const manager = new Manager('Name', 1, 'email@email.com', 917);

  expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('gets role of employee', () => {
  const manager = new Manager('Name', 1, 'email@email.com', 917);

  expect(manager.getRole()).toEqual("Manager");
}); 