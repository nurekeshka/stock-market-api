import {
  CanActivate,
  ExceptionFilter,
  INestApplication,
  Injectable,
  NestInterceptor,
  PipeTransform,
} from '@nestjs/common';
import { ErrorsHandler } from './errors/errors.handler';
import { validationPipe } from './pipes/validation.pipe';

interface ProjectSetup {
  filters: ExceptionFilter[];
  guards: CanActivate[];
  interceptors: NestInterceptor[];
  pipes: PipeTransform[];
}

@Injectable()
export class CommonService {
  public static readonly project: ProjectSetup = {
    filters: [new ErrorsHandler()],
    guards: [],
    interceptors: [],
    pipes: [validationPipe],
  };

  public static setup(app: INestApplication): void {
    app.useGlobalFilters(...CommonService.project.filters);
    app.useGlobalGuards(...CommonService.project.guards);
    app.useGlobalInterceptors(...CommonService.project.interceptors);
    app.useGlobalPipes(...CommonService.project.pipes);
  }
}
