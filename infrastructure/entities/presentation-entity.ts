import { SlideEntity } from "./slide-entity.js";

export class PresentationEntity {
    constructor (public title: string, public slides: SlideEntity[]) {
    }
}
