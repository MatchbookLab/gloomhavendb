import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtPayload } from '../../../../server/types/jwt-payload';
import { RoleId } from '../../../../shared/constants/role-id';
import { Login } from '../../../../shared/types/login';
import { UserLite } from '../../../../shared/types/user-lite';
import { ApiService } from '../api/api.service';
import { StorageKey, StorageService } from '../storage/storage.service';

const jwtHelper: JwtHelperService = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentlyLoggedInUser: UserLite;
  private _token: string;

  constructor(private api: ApiService, private storageService: StorageService) {
    this._token = this.storageService.load<string>(StorageKey.BearToken);
    this._currentlyLoggedInUser = this.storageService.load<UserLite>(StorageKey.UserLite);
  }

  async login(credentials: Login) {
    const { token } = await this.api.login(credentials);

    this._token = token;
    const tokenJson: JwtPayload = jwtHelper.decodeToken(token);
    this._currentlyLoggedInUser = tokenJson.user;

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
