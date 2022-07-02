import { FrameworkBase } from '../../framework/framework-base.js';

export class GettingStartedPage extends FrameworkBase<any> {

  constructor() {
    super();
  }

  template(): string {

    const code = this.encodeHTMLEntities(` export class AboutPage extends FrameworkBase<any> {

      constructor() {
        super();
      }
    
      template(): string {
        return \`
            <h2>About</h2>
            <p>Lorem</p>
            \`;
      }
    
      styles() {
        return \`\`;
      }
    
      initState() {
        return {}
      }
    }`);

    return `
        <h2>Getting started</h2>
        <p>A minimal page example without data binding:</p>
        <code>
        <pre>${code}</pre></code>
        `;
  }

  encodeHTMLEntities = (text) => {
    var textArea = document.createElement('textarea');
    textArea.innerText = text;
    return textArea.innerHTML;
  }

  styles() {
    return `code pre {
      background-color: var(--dark-lighter);
      padding: 1rem;
      border-radius: 0.5rem;
      color: var(--light);
    }`;
  }

  initState() {
    return {}
  }
}
