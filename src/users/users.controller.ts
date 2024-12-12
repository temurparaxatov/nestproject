import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get('/')
  getAll() {
    return this.userService.getAllData();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.getOneData(id);
  }
  @Post('/')
  createUser(@Body() data: createUserDto) {
    return this.userService.createUser(data);
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: Partial<createUserDto>) {
    return this.userService.updateUser(id, data);
  }
  @Delete('id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
