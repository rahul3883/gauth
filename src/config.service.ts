import { Injectable } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import { resolve, join } from 'path';

type FileConfig = {
  clientId: string;
  clientSecret: string;
  scopes: string[];
  port: number;
};

@Injectable()
export class ConfigService {
  public clientId: string;
  public clientSecret: string;
  public scopes: string[];
  public port: number;
  public redirectUri: string;
  private readonly loadPromise: Promise<void>;
  private readonly filePath: string;

  constructor() {
    const filePath =
      this.getFilePathFromArgs() || join(process.cwd(), 'config.json');
    this.filePath = resolve(filePath);
    this.loadPromise = this.reload();
  }

  getFilePathFromArgs() {
    const index = process.argv.findIndex((arg) => arg === '--config');
    return index !== -1 && process.argv[index + 1];
  }

  async complete() {
    return this.loadPromise;
  }

  async reload() {
    return this.load();
  }

  async load() {
    await this.loadConfigFromFile();
    this.setRedirectUri();
  }

  async loadConfigFromFile() {
    let config: FileConfig;
    try {
      config = JSON.parse(
        (await fsPromises.readFile(this.filePath)).toString(),
      );
    } catch (e) {
      console.log(e.message);
      process.exit(1);
    }
    this.setConfig(config);
  }

  setConfig(config: FileConfig) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.scopes = config.scopes;
    this.port = config.port;
  }

  setRedirectUri() {
    this.redirectUri = `http://localhost:${this.port}/gac`;
  }
}
