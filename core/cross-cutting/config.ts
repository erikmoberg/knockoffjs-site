export class Config {
    
    #apiBaseUrl = "api";
    #defaultPresentationName = "woz";

    get apiBaseUrl() {
        return this.#apiBaseUrl;
    }
    get defaultPresentationName() {
        return this.#defaultPresentationName;
    }
}
