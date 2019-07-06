import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './app.config.model';

export let APP_CONFIG: AppConfig;

@Injectable()
export class AppConfigService {
    static settings: AppConfig;

    constructor(private http: HttpClient) {}

    loadConfig() {
        const configFile = `assets/config/appConfig.json`;

        return new Promise<void>((resolve) => {
            this.http.get(configFile).toPromise()
            .then((response : AppConfig) => {
                APP_CONFIG = <AppConfig>response;
                resolve();
            });
        });
    }
}
