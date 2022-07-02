import { SlideModel } from "./slide-model.js";

export class PresentationModel {
    constructor (public title: string, public slides: SlideModel[]) {
    }
}
