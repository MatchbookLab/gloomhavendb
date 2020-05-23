import { Test, TestingModule } from '@nestjs/testing';
import axios, { AxiosInstance } from 'axios';
import { Connection } from 'typeorm';
import { RoleId } from '../../shared/constants/role-id';
import { RoleEntity } from '../api/role/role.entity';
import { UserEntity } from '../api/user/user.entity';
import { UserRepository } from '../api/user/user.repository';
import { AppModule } from '../app.module';

const TEST_PASSWORD: string = 'integration-test-password';

let isStarted = false;
let sharedFixture: TestingModule;

export class IntegrationHelper {
  axios: AxiosInstance;
  connection: Connection;

  private fixture: TestingModule;
  private token: string;
  private interceptorId: number = null;

  async init() {
    if (isStarted) {
      // check every 50 ms for it to be ready
      if (sharedFixture) {
        this.finishInit();
        return;
      }

      await new Promise((resolve) => {
        const checkFixture = () => {
          setTimeout(() => {
            if (sharedFixture) {
              this.finishInit();
              resolve();
              return;
            }

            checkFixture();
          }, 50);
        };

        checkFixture();
      });

      return;
    }

    isStarted = true;

    sharedFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.finishInit();
    await this.setupRoles();
    await this.setupUsers();
  }

  async login(roleId: RoleId): Promise<void> {
    const user = await this.connection.getRepository(UserEntity).findOne({ roleId });

    const {
      data: { token },
    } = await this.axios.post<{ token: string }>(`auth/login`, {
      email: user.email,
      password: TEST_PASSWORD,
    });

    this.token = token;
    this.interceptorId = this.axios.interceptors.request.use((conf) => {
      conf.headers['Authorization'] = `Bearer ${this.token}`;

      return conf;
    });
  }

  logout() {
    this.token = null;
    this.axios.interceptors.request.eject(this.interceptorId);
    this.interceptorId = null;
  }

  private async setupUsers() {
    await this.connection.query('TRUNCATE users CASCADE');
    await Promise.all([
      this.connection.getCustomRepository(UserRepository).saveNew(<UserEntity>{
        username: 'admin',
        roleId: RoleId.Admin,
        email: 'admin@matchbooklab.com',
        password: TEST_PASSWORD,
      }),
      this.connection.getCustomRepository(UserRepository).saveNew(<UserEntity>{
        username: 'user.entity.ts',
        roleId: RoleId.User,
        email: 'user@matchbooklab.com',
        password: TEST_PASSWORD,
      }),
    ]);
  }

  private async setupRoles() {
    if ((await this.connection.getRepository(RoleEntity).find()).length === 6) {
      return;
    }

    await this.connection.getRepository(RoleEntity).insert([
      {
        id: RoleId.Admin,
        name: 'Admin',
      },
      {
        id: RoleId.User,
        name: 'User',
      },
    ]);
  }

  private finishInit() {
    this.fixture = sharedFixture;
    this.connection = this.fixture.get<Connection>(Connection);
    this.axios = axios.create({
      baseURL: `http://localhost:3000/api/`,
    });

    // prevents axios from throwing on non 2xx responses
    this.axios.defaults.validateStatus = (status: number) => true;
  }
}
