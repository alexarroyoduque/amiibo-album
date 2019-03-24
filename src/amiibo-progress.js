import { LitElement, html, css} from 'lit-element';

export class AmiiboTools extends LitElement {
  static get properties() {
    return {
      max: {type: Number},
      current: {type: Number},
      separator: {type: String}
    };
  }

  constructor() {
    super();
    this.max = 0;
    this.current = 0;
    this.separator = ' of ';
  }

  static get styles() {
    return css`

      :host {
        display: block;
        color: var(--amiibo-progress-color, white);

        text-align: center;
        font-family: var(--amiibo-progress-font-family);
      }

      .bar {
        display: block;
        background-color: var(--amiibo-progress-background-color, black);
        height: 1rem;
        font-size: .8rem;
        font-weight: bold;
        --amiibo-progress-clip: 10px;
        -webkit-clip-path: polygon(calc(100% - var(--amiibo-progress-clip)) 0, 100% 50%, calc(100% - var(--amiibo-progress-clip)) 100%, var(--amiibo-progress-clip) 100%, 0 50%, var(--amiibo-progress-clip) 0);
        clip-path: polygon(calc(100% - var(--amiibo-progress-clip)) 0, 100% 50%, calc(100% - var(--amiibo-progress-clip)) 100%, var(--amiibo-progress-clip) 100%, 0 50%, var(--amiibo-progress-clip) 0);
      }

    `;
  } 

  render() {
    return html`
      <span class="bar" style="background-image: linear-gradient(90deg, #07cd49 ${this.current ? (this.current*100) / this.max : 0}%, #424242 ${this.current ? (this.current*100) / this.max : 0}%);">
        <span>${this.current}${this.separator}${this.max}</span>
      </span>
    `;
  }
}

customElements.define('amiibo-progress', AmiiboTools);
