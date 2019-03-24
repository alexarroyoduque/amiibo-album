import { LitElement, html, css } from 'lit-element';

export class AmiiboItem extends LitElement {
  static get properties() {
    return { 
      amiibo: {
        converter: {
          fromAttribute(value) {
            return JSON.parse(value)
          }
        }
      }
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return css`
      .item {
        background-size: 72px 90px;
        background-repeat: no-repeat;
        background-position-x: 0.5rem;
        background-position-y: -0.2rem;
        color: var(--amiibo-item-color, white);
        height: 3.5rem;

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
      }

      h1 {
        margin: 0 0 0 5.5rem;
        font-size: .9rem;
        font-family: var(--amiibo-item-font-family);
      }

      h1 a {
        color: var(--amiibo-item-color);
        border-bottom: 1px var(--amiibo-item-color) dotted;
        text-decoration: none;
      }

      .action {
        min-width: 3rem;
      }
      
      input[type="checkbox"] {
        zoom: 2.5;
      }
    `;
  }

  checkedChanged(event) {
    this.dispatchEvent(new CustomEvent(`amiibo-checked-change`, {
      detail: {tail: this.amiibo.tail, checked: event.target.checked},
      bubbles: true, 
      composed: true
    }));
  }

  render() {
    // <div class="item" style="background-image: url('/Users/alejandroarroyo/Downloads/Usher.png')">
    return html`
      <div class="item" style="background-image: url(${this.amiibo.image})">
        <div class="title">
          <h1><a title="${this.amiibo.name}" href="http://amiibo.life/nfc/${this.amiibo.head}-${this.amiibo.tail}" target="_blank">${this.amiibo.name}</a></h1>
        </div>
        <div class="action">
          <input type="checkbox" ?checked=${this.amiibo.checked} @change="${this.checkedChanged}">
        </div>
      </div>
    `;
  }
}

customElements.define('amiibo-item', AmiiboItem);
