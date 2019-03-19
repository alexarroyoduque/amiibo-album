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
      header {
        margin-bottom: 0.8rem;
        padding-bottom: 0.5rem;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.5);
        background: #9e9528;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #9e9528, #d3be00 70%,#fffad0);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #9e9528, #d3be00 70%,#fffad0);
        font-family: 'Roboto Condensed', sans-serif;
      }

      .info {
        color: white;
        width: 100%;
        display: block;
        font-size: 0.9rem;
        opacity: .6;
        text-align: center;
      }
      
      .info a {
        color: white;
      }

      .info span {
        font-style: italic
      }

      .info div {
        padding-top: .3rem;
      }

      .content {
        margin: 0 auto;
        max-width: 400px;
      }

      .clear {
        height: 2rem;
        margin: 0 auto;
        display: block;
      }

      ul, li {
        padding: 0;
        margin: 0;
      }
      li {
        list-style: none;
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
          <article>
          <div class="info">
            <div>
              <a href="https://github.com/N3evin/AmiiboAPI" target="_black">Api by N3evin</a>
              <span>Updated: March 2019</span>
            </div>
            <div>
              <a href="https://github.com/alexarroyoduque/amiibo-album" target="_black">Project developed with lit-htm by @AlexArroyoDuque</a>
            </div>
          </div>
            <amiibo-header title="amiibum" subtitle="Album to mark your collected amiibos"></amiibo-header>
          </article>
          <article>
            <amiibo-selector label="Series (${this.amiiboseries.length})" placeholder="All" placeholdervalue="all" options=${JSON.stringify(this.amiiboseries.map(serie => serie.name))}></amiibo-selector>
            <amiibo-progress max=${this.amiibosFiltered.length} current=${this.amiibosFiltered.filter(amiibo => amiibo.checked).length}></amiibo-progress>
            <button class="clear" @click="${this.clearLocalStorage}">Clear saved data</button>
          </article>
        </header>

        <ul>
          ${this.amiibosFiltered.map(character => html`<li><amiibo-item amiibo=${JSON.stringify(character)}></amiibo-item></li>`)}
        </ul>
      </div>
    `;
  }

}

// Register the element with the browser
customElements.define('amiibo-main', AmiiboMain);
