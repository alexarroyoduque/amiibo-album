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
        color: var(--amiibo-header-color, white);
        padding: 0.7rem;
        text-align: center;
      }

      h1, h2 {
        margin: 0;
      }

      h1 {
        font-family: var(--amiibo-header-title-font-family);
        font-size: 1.8rem;
      }

      h2 {
        font-family: var(--amiibo-header-subtitle-font-family);
        font-size: 1rem;
      }

      .title {
        position: relative;
      }
      .header-decoration {
        position: absolute;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        background-color: var(--theme-color-primary);
        clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
        -webkit-clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
        display: inline-block;
        height: 8px;
        width: 6px;
      }

      .header-decoration.left.top {
        left: var(--amiibo-header-decoration-left-top-bottom, -140px);
        transform: rotate(120deg);
      }

      .header-decoration.left.medium {
        left: var(--amiibo-header-decoration-left-medium, -147px);
        transform: rotate(90deg);
      }

      .header-decoration.left.bottom {
        left: var(--amiibo-header-decoration-left-top-bottom, -140px);
        transform: rotate(60deg);
      }

      .header-decoration.right.top {
        left: var(--amiibo-header-decoration-right-top-bottom, 140px);
        transform: rotate(-120deg);
      }

      .header-decoration.right.medium {
        left: var(--amiibo-header-decoration-right-medium, 147px);
        transform: rotate(-90deg);
      }

      .header-decoration.right.bottom {
        left: var(--amiibo-header-decoration-right-top-bottom, 140px);
        transform: rotate(-60deg);
      }

      .header-decoration.top {
        top: 5px;
      }

      .header-decoration.medium {
        top: 15px;
      }

      .header-decoration.bottom {
        top: 25px;
      }

    `;
  } 

  render() {
    return html`
      <div class="title">
        <span class="header-decoration left top"></span>
        <span class="header-decoration left medium"></span>
        <span class="header-decoration left bottom"></span>
        <span class="header-decoration right top"></span>
        <span class="header-decoration right medium"></span>
        <span class="header-decoration right bottom"></span>
      </div>
      <h1>${this.title}</h1>

      <h2>${this.subtitle}</h2>
    `;
  }
}

customElements.define('amiibo-header', AmiiboHeader);
