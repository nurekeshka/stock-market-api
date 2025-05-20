import { Request } from 'express';
import { ValidationDto } from './validation.dto';

export interface AuthorizedRequest extends Request {
  user: ValidationDto;
}
