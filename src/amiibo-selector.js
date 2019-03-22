import { LitElement, html, css } from 'lit-element';

export class AmiiboSelector extends LitElement {
  static get properties() {
    return {
      label: {type: String},
      placeholder: {type: String},
      placeholderValue: {type: String},
      suffix: {type: String},
      options: {
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

  selectedOptionChange(ev) {
    this.dispatchEvent(new CustomEvent(`selected-option-change${this.suffix}`, {
      detail: ev.target.value,
      bubbles: true, 
      composed: true
    }));
  }

  static get styles() {
    return css`

      :host {
        display: block;
        color: var(--amiibo-selector-color, white);
        text-align: center;
        font-family: var(--amiibo-selector-font-family);
      }
      
      select {
        height: 1.8rem;
      }

    `;
  } 

  render() {
    return html`
      <label>${this.label}
        <select @change="${this.selectedOptionChange}">
          <option value="${this.placeholderValue}">${this.placeholder}</option>
          ${this.options.map(option => html`<option value="${option}">${option}</option>`)}
        </select>
      </label>
    `;
  }
}

customElements.define('amiibo-selector', AmiiboSelector);
