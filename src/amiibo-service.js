
import { LitElement, html } from 'lit-element';

export class AmiiboService extends LitElement {
  static get properties() {
    return { 
      host:     {type: String},
      endpoint: {type: String},
      url:      {type: String},
      response: {type: Array}
    };
  }

  constructor() {
    super();
    this.response = [];
    this.host = 'https://www.amiiboapi.com/api/'
    this.endpoint = 'character'
  }

  // https://developers.google.com/web/fundamentals/primers/promises?hl=es#promesas_en_xmlhttprequest
  get(url) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
  
      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      };
  
      req.onerror = function() {
        reject(Error("Network Error"));
      };
  
      req.send();
    });
  }

  doRequest() {
    var url = `${this.host}${this.endpoint}`;

    this.get(url).then(response => {
      this.response = JSON.parse(response);
      console.log('service');
      console.log(this.response);
      this.dispatchEvent(new CustomEvent(`service-response-${this.endpoint}`, {
        detail: this.response,
        bubbles: true, 
        composed: true
      }));
    }, function(error) {
      console.error("Failed!", error);
    })
  }

  firstUpdated() {
    this.doRequest();
  }

  render() {}
}

customElements.define('amiibo-service', AmiiboService);
