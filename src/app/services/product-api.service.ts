import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductAPIService {
  bestBuyAPIKey: string=""; // hidden in commit, obviously
  webhoseio = require('webhoseio');

  client = this.webhoseio.config({token: ''});
//  bestBuyRequestUrl: string="https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=sku,name,salePrice&apiKey=pPrybKAtWLDFyFpzdbYFcQrM"
  constructor(public http: HttpClient) { }

  /* getRecommendedProductsFromBestBuy(query) {
    try {
      return this.http.get(`https://api.bestbuy.com/v1/products(search=${query})?format=json&show=image,name,salePrice&apiKey=${this.bestBuyAPIKey}`);
    } catch(err) {
      console.log(err)
    }
  } */

  getProducts(query) {
    return new Promise(resolve => {
      const query_params = {
  	     "q": `name:${query} aggregated_rating:>3.7`,
         "size": 10
      }
      this.client.query('productFilter', query_params)
      .then(output => {
          resolve(output['products'])
      });
    });

  }
}
