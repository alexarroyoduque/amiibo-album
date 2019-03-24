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
        font-family: var(--amiibo-selector-font-family);
        font-size: .7rem;
      }
      
      select {
        height: 1.8rem;
      }

      .container {
        padding: 0 15px 0 5px;
        margin: 0;
        overflow: hidden;
        background-color: transparent;
        background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAPCAYAAADzun+cAAAAdUlEQVRIS73V0Q3AIAhFUdiso7hZ46QYTWraiAhUeQucv3eRiBIA3BC7jNULxjMipgYH4g2tXocD8I4O8EH8g7LwAXxAp/BGnEVFeAM+RZfwD1xEVbADX6Jq2ICrUBOswNWoGRZwE+qCGdyMuuEXfj3fa41bAUwESa2ukmCSAAAAAElFTkSuQmCC') no-repeat;
        background-position-x: 97%;
        background-position-y: 50%;
        background-size: .5rem;
        border-bottom: solid 1px var(--amiibo-selector-color);
      }
    
      .container select {
        appearance: none;
        color: var(--amiibo-selector-color);
        border: none;
        box-shadow: none;
        background-color: transparent;
        background-image: none;
        font-family: var(--amiibo-selector-font-family);
        font-size: .7rem;
        -webkit-appearance: none;
        -moz-appearance: none;
      }
      
      .container select:focus {
          outline: none;
      }

    `;
  } 

  render() {
    return html`
    <div class="container">
      <label>${this.label}
        <select @change="${this.selectedOptionChange}">
          <option value="${this.placeholderValue}">${this.placeholder}</option>
          ${this.options.map(option => html`<option value="${option}">${option}</option>`)}
        </select>
      </label>
    </div>

    `;
  }
}

customElements.define('amiibo-selector', AmiiboSelector);
