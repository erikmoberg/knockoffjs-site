import { Config } from "../../core/cross-cutting/config";
import { PresentationEntity } from "../entities/presentation-entity";
import { HttpAdapter } from "./http-adapter";

export class SlideRepository {
    constructor(private httpAdapter: HttpAdapter, private config: Config) {
    }

    async getSlides(presentation: string) : Promise<PresentationEntity> {
        return this.httpAdapter.getJson(`${this.config.apiBaseUrl}/${presentation}.json`);
    }
}
