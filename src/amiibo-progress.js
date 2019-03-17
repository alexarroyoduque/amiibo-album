import { LitElement, html, css} from 'lit-element';

export class AmiiboTools extends LitElement {
  static get properties() {
    return {
      max: {type: Number},
      current: {type: Number}
    };
  }

  constructor() {
    super();
    this.max = 0;
    this.current = 0;
  }

  static get styles() {
    return css`

      :host {
        display: block;
        color: white;
        padding: 0.7rem;
        text-align: center;
        font-family: 'Roboto Condensed', sans-serif;
      }

      .bar {
        display: block;
        background: #424242;
        border-radius: 6px;
        height: 1rem;
        font-size: .8rem;
      }

    `;
  } 

  render() {
    return html`
      <span class="bar" style="background-image: linear-gradient(90deg, #07cd49 ${this.current ? (this.current*100) / this.max : 0}%, #424242 ${this.current ? (this.current*100) / this.max : 0}%);">
        <span>${this.max}/${this.current}</span>
      </span>
    `;
  }
}

customElements.define('amiibo-progress', AmiiboTools);
