import { closeServer } from '@libs/database';

afterAll(() => {
  void closeServer();
});
