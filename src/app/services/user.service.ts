import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { getUsers } from '../data/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[]
  constructor() {
    this.users = getUsers()
  }
  getUsers(): User[] {
    return this.users;
  }
}
