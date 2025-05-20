import { INestApplication } from '@nestjs/common';
import { mock } from 'jest-mock-extended';
import { CommonService } from './common.service';

describe('Common Service', () => {
  it('should setup the application', () => {
    const app = mock<INestApplication>();
    CommonService.setup(app);
  });
});
