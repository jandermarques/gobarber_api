// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Fulano da Silva',
      email: 'fulano@gmail.com',
      password: '123456789',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Sicrano da Silva',
      email: 'sicrano@gmail.com',
      password: '123456789',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Zé das Medalhas',
      email: 'ze@gmail.com',
      password: '123456789',
    });

    const provider = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(provider).toEqual([user1, user2]);
  });
});
