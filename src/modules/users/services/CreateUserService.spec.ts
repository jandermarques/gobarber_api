import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Fulano da Silva',
      email: 'fulano@gmail.com',
      password: '123456789',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email from another', async () => {
    await createUser.execute({
      name: 'Fulano da Silva',
      email: 'fulano@gmail.com',
      password: '123456789',
    });

    await expect(
      createUser.execute({
        name: 'Fulano da Silva',
        email: 'fulano@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
