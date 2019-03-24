import { LitElement, html, css } from 'lit-element';

export class AmiiboItem extends LitElement {
  static get properties() {
    return { 
      item: {
        converter: {
          fromAttribute(value) {
            return JSON.parse(value)
          }
        }
      },
      url: {type: String}
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

      /* The container */
      .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-bottom: 30px;
        tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }

      .container:active, .container:focus {
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        tap-highlight-color: rgba(0,0,0,0);
      }

      /* Hide the browser's default checkbox */
      .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      /* Create a custom checkbox */
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 30px;
        width: 30px;
        background-color: var(--amiibo-item-checkbox-unchecked-background);
        border-radius: 4px;
      }

      /* On mouse-over, add a grey background color */
      .container:hover input ~ .checkmark {
        background-color: var(--amiibo-item-checkbox-unchecked-background-hover);
      }

      /* When the checkbox is checked, add a custom color background */
      .container input:checked ~ .checkmark {
        background-color: var(--amiibo-item-checkbox-checked-background);
      }

      /* Create the checkmark/indicator (hidden when not checked) */
      .checkmark:after {
        content: "";
        position: absolute;
        display: block;
        border-color: var(--amiibo-item-checkbox-unchecked-color);
      }

      /* Show the checkmark when checked */
      .container input:checked ~ .checkmark:after {
        display: block;
        border-color: var(--amiibo-item-checkbox-checked-color);
      }

      /* Style the checkmark/indicator */
      .container .checkmark:after {
        left: 9px;
        top: 4px;
        width: 8px;
        height: 14px;
        border-style: solid;
        border-width: 0 4px 4px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }

    `;
  }

  checkedChanged(event) {
    this.dispatchEvent(new CustomEvent(`amiibo-checked-change`, {
      detail: {tail: this.item.tail, checked: event.target.checked},
      bubbles: true, 
      composed: true
    }));
  }

  render() {
    // <div class="item" style="background-image: url('/Users/alejandroarroyo/Downloads/Usher.png')">
    return html`
      <div class="item" style="background-image: url(${this.item.image})">
        <div class="title">
          <h1><a title="${this.item.name}" href=${this.item.url} target="_blank">${this.item.name}</a></h1>
        </div>
        <div class="action">
          <label class="container">
            <input type="checkbox" ?checked=${this.item.checked} @change="${this.checkedChanged}">
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    `;
  }
}

customElements.define('amiibo-item', AmiiboItem);
