const Manager = require('../lib/Manager');

test('creates an Manager object', () => {
  const manager = new Manager();

  expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('gets role of employee', () => {
  const manager = new Manager();

  expect(manager.getRole()).toEqual("Manager");
}); 