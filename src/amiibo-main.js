import { LitElement, html, css } from 'lit-element';
/* Comment this lines if you want to call the service api */
import {getAmiiboseries} from './mock-amiiboseries';
import {getAllAmiibos} from './mock-amiibos';
/**/
import('./amiibo-header.js')
import('./amiibo-selector.js')
import('./amiibo-progress.js')
import('./amiibo-item.js')
import('./amiibo-service.js')

export class AmiiboMain extends LitElement {
  static get properties() {
    return {
      allAmiibos: {type: Array},
      amiiboseries: {type: Array},
      amiibosFiltered: {type: Array}
    };
  }

  constructor() {
    super();
    this.allAmiibos = [];
    this.amiibosFiltered = [];
    this.amiiboseries = [];
    /* Comment this lines if you want to call the service api */
    this.amiiboseries = getAmiiboseries();
    this.allAmiibos = getAllAmiibos();
    this.loadInitialList();
    /**/

    /* Uncomment this lines if you want to call the service api */
    //this.addEventListener('service-response-amiibo', this.handleAmiiboEvent);
    //this.addEventListener('service-response-amiiboseries', this.handleAmiiboSeriesEvent);
    this.addEventListener('selected-option-change', this.handleSelectedOptionChange);
    this.addEventListener('amiibo-checked-change', this.handleAmiiboCheckedChange);
  }

  mergeStoredWithNewAmiibos() {
    let storedAmiibos = JSON.parse(localStorage.getItem('amiibos'));
    console.log(storedAmiibos.length);
    console.log(this.allAmiibos.length);
    if (storedAmiibos.length === this.allAmiibos.length) {
      this.allAmiibos.map(amiibo => amiibo.checked = false);
      this.amiibosFiltered = storedAmiibos;
      this.allAmiibos = this.amiibosFiltered;
    } else {
      this.allAmiibos.map(amiibo => amiibo.checked = false);
      let checkedAmiibos = storedAmiibos.filter(amiibo => amiibo.checked);
      checkedAmiibos.forEach(checkedAmiibos => {
        this.allAmiibos.find(amiibo => amiibo.tail === checkedAmiibos.tail).checked = true
      });
  
      localStorage.setItem('amiibos', JSON.stringify(this.allAmiibos));
      this.amiibosFiltered = this.allAmiibos;
    }
  }

  loadInitialList() {
    if (localStorage.getItem('amiibos')) {
      this.mergeStoredWithNewAmiibos();
    } else {
      this.allAmiibos.map(amiibo => amiibo.checked = false);
      this.amiibosFiltered = this.allAmiibos;
      localStorage.setItem('amiibos', JSON.stringify(this.allAmiibos));
    }
  }

  handleAmiiboEvent(event) {
    this.allAmiibos = event.detail.amiibo;
    this.loadInitialList();
  }

  handleAmiiboSeriesEvent(event) {
    this.amiiboseries = event.detail.amiibo;
  }

  handleSelectedOptionChange(event) {
    this.amiibosFiltered = [];
    setTimeout(() => {
      if (event.detail === 'all') {
        this.amiibosFiltered = this.allAmiibos;
      } else {
        this.amiibosFiltered = this.allAmiibos.filter((amiibo)=> amiibo.amiiboSeries === event.detail);
      }
    }, 0);
  }

  handleAmiiboCheckedChange(event) {
    this.allAmiibos
      .find(amiibo => amiibo.tail === event.detail.tail)
      .checked = event.detail.checked;
    this.amiibosFiltered
      .find(amiibo => amiibo.tail === event.detail.tail)
      .checked = event.detail.checked;
    

    this.amiibosFiltered = this.amiibosFiltered.map(amiibo => amiibo);
    localStorage.setItem('amiibos', JSON.stringify(this.allAmiibos));
  }

  clearLocalStorage() {
    this.amiibosFiltered.map(amiibo => amiibo.checked = false);
    this.allAmiibos.map(amiibo => amiibo.checked = false);
    var temp = this.amiibosFiltered;
    this.amiibosFiltered = [];
    setTimeout(() => {
        this.amiibosFiltered = temp;
    }, 0);

    localStorage.clear();
  }

  static get styles() {
    return css`
      :host {
        --theme-title-font-family: Baumans;
        --theme-primary-font-family: Muli;
        --theme-secondary-font-family: Montserrat;
        --theme-color-light: #fff;
        --theme-color-light-gray: #F5F5F5;
        --theme-color-dark: #585858;

        --theme-color-primary: var(--theme-color-light);
        --theme-color-secondary: var(--theme-color-dark);
      }

      header {
        margin-bottom: 0.8rem;
        padding-bottom: 0.5rem;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.5);
        background: #f85032;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #e73827, #f85032);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #e73827, #f85032); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        
        font-family: var(--theme-primary-font-family);
      }

      amiibo-header {
        --amiibo-header-title-font-family: var(--theme-title-font-family);
        --amiibo-header-subtitle-font-family: var(--theme-primary-font-family);
        --amiibo-header-color: var(--theme-color-primary);
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
        left: -140px;
        transform: rotate(120deg);
      }

      .header-decoration.left.medium {
        left: -147px;
        transform: rotate(90deg);
      }

      .header-decoration.left.bottom {
        left: -140px;
        transform: rotate(60deg);
      }

      .header-decoration.right.top {
        left: 140px;
        transform: rotate(-120deg);
      }

      .header-decoration.right.medium {
        left: 147px;
        transform: rotate(-90deg);
      }

      .header-decoration.right.bottom {
        left: 140px;
        transform: rotate(-60deg);
      }

      .header-decoration.top {
        top: 16px;
      }

      .header-decoration.medium {
        top: 26px;
      }

      .header-decoration.bottom {
        top: 36px;
      }

      amiibo-selector {
        --amiibo-selector-font-family: var(--theme-primary-font-family);
        --amiibo-selector-color: var(--theme-color-primary);
      }

      amiibo-progress {
        --amiibo-progress-font-family: var(--theme-primary-font-family);
        --amiibo-progress-color: var(--theme-color-light);
        --amiibo-progress-background-color: var(--theme-color-dark);
      }

      amiibo-item {
        --amiibo-item-font-family: var(--theme-secondary-font-family);
        --amiibo-item-color: var(--theme-color-dark);
      }

      .info {
        color: white;
        width: 100%;
        display: block;
        font-size: 0.7rem;
        opacity: .6;
        text-align: center;
      }
      
      .info a {
        color: white;
      }

      .info {
        padding-top: .3rem;
      }
      .info p {
        margin: 0;
      }
      .info .extra {
        font-style: italic;
      }

      .content {
        margin: 0 auto;
        max-width: 400px;
      }

      .clear {
        height: 2rem;
        margin-left: 0.7rem;
        display: block;
      }

      ul, li {
        padding: 0;
        margin: 0;
      }
      li {
        list-style: none;
        box-shadow: inset 0px -1px 0px 0px #E0E0E0;
        background-color: #F5F5F5;
      }
      :host([hidden]) { display: none; }
    `;
  } 

  render() {
    return html`
      <div class="content">
        <!-- Uncomment this lines if you want to call the service api -->
        <!-- <amiibo-service endpoint='amiibo'></amiibo-service>
        <amiibo-service endpoint='amiiboseries'></amiibo-service> -->
        <header>
          <div>
            <div class="info">
              <p>
                <a href="https://github.com/alexarroyoduque/amiibo-album" title="source code" target="_blank">Project developed with lit-htm by AlexArroyoDuque</a>
              </p>
              <p class="extra">Api by N3evin. Updated: March 2019</p>
   
            </div>
            <div class="title">
              <amiibo-header title="amiibum" subtitle="Album to check your collected amiibos"></amiibo-header>
              <span class="header-decoration left top"></span>
              <span class="header-decoration left medium"></span>
              <span class="header-decoration left bottom"></span>
              <span class="header-decoration right top"></span>
              <span class="header-decoration right medium"></span>
              <span class="header-decoration right bottom"></span>
            </div>
            </div>
          <div>
            <amiibo-selector label="Series (${this.amiiboseries.length})" placeholder="All" placeholdervalue="all" options=${JSON.stringify(this.amiiboseries.map(serie => serie.name))}></amiibo-selector>
            <amiibo-progress max=${this.amiibosFiltered.length} current=${this.amiibosFiltered.filter(amiibo => amiibo.checked).length}></amiibo-progress>
            <button class="clear" ?disabled="${!this.amiibosFiltered.filter(amiibo => amiibo.checked).length}" @click="${this.clearLocalStorage}">Clear saved data</button>
          </div>
        </header>
        <article>
          <ul>
            ${this.amiibosFiltered.map(character => html`<li><amiibo-item amiibo=${JSON.stringify(character)}></amiibo-item></li>`)}
          </ul>
        </article>

      </div>
    `;
  }

}

// Register the element with the browser
customElements.define('amiibo-main', AmiiboMain);
