import { LitElement, html, css } from 'lit-element';

export class AmiiboHeader extends LitElement {
  static get properties() {
    return {
      title: {type: String},
      subtitle: {type: String}
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return css`
      :host {
        display: block;
        color: white;
        padding: 0.7rem;
        text-align: center;
      }

      h1, h2 {
        margin: 0;
      }

      h1 {
        font-family: 'Ubuntu', sans-serif;
        font-size: 1.8rem;
      }

      h2 {
        font-family: 'Roboto Condensed', sans-serif;
        font-size: 1rem;
      }

    `;
  } 

  render() {
    return html`
      <h1>${this.title}</h1>
      <h2>${this.subtitle}</h2>
    `;
  }
}

customElements.define('amiibo-header', AmiiboHeader);
