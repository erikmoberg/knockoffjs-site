import { PresentationModel } from '../models/presentation-model.js';
import { SlideModel } from '../models/slide-model.js';
import { SlideRepository } from '../../infrastructure/repositories/slide-repository.js';
import { SlideUrlHelper } from '../utils/slide-url-helper.js';
import { Config } from '../cross-cutting/config.js';

export class SlideService {

    /**
     * @type {SlideRepository}
     */
    #slideRepository = null;

    /**
     * @type {Config}
     */
    #config = null;

    /**
     * 
     * @param {SlideRepository} slideRepository 
     * @param {Config} config
     */
    constructor(slideRepository, config) {
        this.#slideRepository = slideRepository;
        this.#config = config;
    }

    /**
     * 
     * @returns {PresentationModel}
     */
    async getSlides() : Promise<PresentationModel> {
        const presentationName = SlideUrlHelper.getPresentationName() ?? this.#config.defaultPresentationName;
        const presentation = await this.#slideRepository.getSlides(presentationName);
        const slides = presentation.slides.map(s => new SlideModel(s.header, s.content.join(''), this.buildLabel(s.header), s.hideHeader, s.style));
        return new PresentationModel(presentation.title, slides);
    }

    /**
     * 
     * @param {string} header The text to build a label from.  
     * @returns {string}
     */
    buildLabel (header) {
        return header.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^A-Za-z0-9\-]/g, '')
    }
}
