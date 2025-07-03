import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizedRequest } from '../../auth/dtos/auth-request.dto';
import { CreateHoldingDto } from '../dtos/create-holding.dto';
import { Holding } from '../schemas/holdings.schema';
import { HoldingsService } from '../service/holdings.service';

@Controller('api/account/holdings')
@UseGuards(AuthGuard('jwt'))
export class HoldingsController {
  @Inject(HoldingsService)
  private readonly service: HoldingsService;

  @Get()
  findAll(@Request() req: AuthorizedRequest): Promise<Holding[]> {
    return this.service.findAll(req.user.email);
  }

  @Get('/:symbol')
  findOne(
    @Request() req: AuthorizedRequest,
    @Param('symbol') symbol: string,
  ): Promise<Holding | undefined> {
    return this.service.findOne(req.user.email, symbol);
  }

  @Post()
  create(
    @Request() req: AuthorizedRequest,
    @Body() body: CreateHoldingDto,
  ): Promise<Holding> {
    return this.service.create(req.user.email, body);
  }
}
