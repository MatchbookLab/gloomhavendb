import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import * as _ from 'lodash';
import Mocked = jest.Mocked;

// https://github.com/angular/angular/issues/12409

class ModuleConfig {
  private config: TestModuleMetadata = {
    imports: [],
    declarations: [],
    providers: [],
    schemas: [],
  };

  constructor(initialConfig: TestModuleMetadata) {
    _.merge(this.config, initialConfig);
  }

  getConfig(): TestModuleMetadata {
    const conf: TestModuleMetadata = {};

    conf.imports = _.uniq(this.config.imports);
    conf.declarations = _.uniq(this.config.declarations);
    conf.providers = _.uniq(this.config.providers);
    conf.schemas = _.uniq(this.config.schemas);

    return conf;
  }

  addImports(...imports: any[]): this {
    this.config.imports.push(..._.flatten(imports));
    return this;
  }

  addDeclarations(...declarations: any[]): this {
    this.config.declarations.push(..._.flatten(declarations));
    return this;
  }

  addProviders(...providers: any[]): this {
    this.config.providers.push(..._.flatten(providers));
    return this;
  }
}

export class TestBedHelper {
  static async configureTestingModule(moduleDef: TestModuleMetadata) {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule(moduleDef);
    await TestBed.compileComponents();

    preventAngularFromResetting();
  }

  static autoConfigureTestingModule(moduleDef: TestModuleMetadata) {
    beforeAll(() => TestBedHelper.configureTestingModule(moduleDef));
    afterAll(() => TestBedHelper.allowAngularToReset());
  }

  static resetFixture() {
    const testBedApi = getTestBed();

    (<any>testBedApi)._activeFixtures.forEach((fixture: any) => fixture.destroy());
    (<any>testBedApi)._instantiated = false;
  }

  static allowAngularToReset() {
    allowAngularToReset();
  }

  static createComponentConfig() {
    return new ModuleConfig({
      imports: [NoopAnimationsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    });
  }

  static createServiceConfig() {
    return new ModuleConfig({
      imports: [HttpClientTestingModule],
    });
  }
}

const origResetTestingModule = TestBed.resetTestingModule;

function preventAngularFromResetting() {
  TestBed.resetTestingModule = () => TestBed;
}

function allowAngularToReset() {
  TestBed.resetTestingModule = origResetTestingModule;
}

export type PartialMocked<T> = Mocked<T>;
