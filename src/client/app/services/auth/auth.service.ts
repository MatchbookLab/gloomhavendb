import { Injectable } from '@angular/core';
import { RoleId } from '../../../../shared/constants/role-id';
import { Login } from '../../../../shared/types/login';
import { UserLite } from '../../../../shared/types/user-lite';
import { ApiService } from '../api/api.service';
import { StorageKey, StorageService } from '../storage/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentlyLoggedInUser: UserLite;
  private _token: string;

  constructor(private api: ApiService, private storageService: StorageService) {
    this._token = this.storageService.load<string>(StorageKey.BearToken);
    this._currentlyLoggedInUser = this.storageService.load<UserLite>(StorageKey.UserLite);
  }

  async login(credentials: Login) {
    const { token, userLite } = await this.api.login(credentials);

    this._token = token;
    this._currentlyLoggedInUser = userLite;

    this.storageService.store<string>(StorageKey.BearToken, this._token);
    this.storageService.store<UserLite>(StorageKey.UserLite, this._currentlyLoggedInUser);
  }

  isAdmin(): boolean {
    return this._currentlyLoggedInUser && this._currentlyLoggedInUser.roleId === RoleId.Admin;
  }

  logout() {
    this._token = null;
    this._currentlyLoggedInUser = null;
    this.storageService.remove(StorageKey.BearToken);
    this.storageService.remove(StorageKey.UserLite);
  }

  getToken(): string {
    return this._token;
  }
}
