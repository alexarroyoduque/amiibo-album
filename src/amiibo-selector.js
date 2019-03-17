import { LitElement, html, css } from 'lit-element';

export class AmiiboSelector extends LitElement {
  static get properties() {
    return {
      label: {type: String},
      placeholder: {type: String},
      placeholderValue: {type: String},
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
    console.log('selectedOptionChange');
    console.log(ev.target.value);
    this.dispatchEvent(new CustomEvent(`selected-option-change`, {
      detail: ev.target.value,
      bubbles: true, 
      composed: true
    }));
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
      
      select {
        height: 1.8rem;
        width: 60%;
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
