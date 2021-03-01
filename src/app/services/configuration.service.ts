import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  // urls
  private protocol: string;
  private port: string;
  private host = 'localhost';
  public serverUrl: string;
  public webApiUrl: string;

  // url flags
  private areFromVS: boolean = true; // бэк приложение запускается из вижлы или из консоли dotnet run
  private isSslOn: boolean = true;

  constructor() {
    if (environment.production) {
      console.log('change me!');
      this.host = 'localhost';
    } else {
      this.host = 'localhost';
    }

    if (this.areFromVS) {
      this.port = '44338';
    } else {
      this.port = '5000';
    }

    if (this.isSslOn) {
      this.protocol = 'https';
    } else {
      this.protocol = 'http';
    }

    this.serverUrl = `${this.protocol}://${this.host}:${this.port}`;
    this.webApiUrl = `${this.serverUrl}/api`;
  }
}
