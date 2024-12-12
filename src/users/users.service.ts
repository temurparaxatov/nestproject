import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usersModels: Model<User>) {}
  async getAllData(): Promise<User[]> {
    const users = await this.usersModels.find();
    return users;
  }
  async getOneData(id: string): Promise<User> {
    const user = await this.usersModels.findById(id);
    return user;
  }
  async createUser(data: createUserDto): Promise<User> {
    const newUser = await this.usersModels.create(data);
    await newUser.save();
    return newUser;
  }
  async updateUser(id: string, data: Partial<createUserDto>): Promise<User> {
    const updatedUser = await this.usersModels.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedUser;
  }
  async deleteUser(id: string): Promise<{ message: string }> {
    try {
      const result = await this.usersModels.findByIdAndDelete(id).exec();

      if (!result) {
        throw new Error(`User with ID ${id} not found`);
      }

      return { message: `User with ID ${id} deleted successfully` };
    } catch (error) {
      throw new Error(`Error deleting user with ID ${id}: ${error.message}`);
    }
  }
}
