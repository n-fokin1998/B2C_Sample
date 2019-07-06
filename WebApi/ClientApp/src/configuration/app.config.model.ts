export class AppConfig {
    public auth: AuthConfig; 
    public api: string;
    public storageKeys: StorageKeysConfig
}

export class AuthConfig {
    public loginAuthority: string;
    public resetPasswordAuthority: string;
    public clientId: string;
    public redirectUri: string;
    public scopes: string[];
}

export class StorageKeysConfig {
    public token: string;
    public resetPasswordFlag: string;
}