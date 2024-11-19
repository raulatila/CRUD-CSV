const { sequelize } = require('../src/models'); 
const User = require('../src/models/User');  

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User API', () => {
  test('should create a new user', async () => {
    const user = await User.create({ name: 'John Doe', email: 'john@example.com', age: 30 });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
  });

  test('should get all users', async () => {
    const users = await User.findAll();
    expect(users.length).toBeGreaterThan(0);
  });
});
