import { Injectable } from '@angular/core';
import { ProductAPIService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private webhoseAPI: ProductAPIService) { }

  getRandomAskForPageLoad() {
    const potentialChoices = ["couch", "drone", "toy", "stroller", "dining set","blender","rug"];
    return potentialChoices[Math.floor(Math.random()*potentialChoices.length)];
  }

  getMessages(ask) {
    return new Promise(resolve => {
      var msgsArray = [];
      var productResponse;
      try {
        var timeInit = performance.now();
        this.webhoseAPI.getProducts(ask).then(res => {
          productResponse = res || [];
          productResponse.forEach((product, index) => {
            const formattedMessageObject = this.formatProductMessage(product, index);
            msgsArray.push(formattedMessageObject)
            if ((index+1) == productResponse.length) {
              // finished
              var timeFinished = performance.now();
              var executionTime = timeFinished - timeInit;
              if (executionTime > 1100) {
                resolve(msgsArray);
              } else {
                // API call returned before typing bubbles appeared.
                // Delay resolve until executionTime exceeds 1100 ms
                var sleepInterval = setInterval(() => {
                  executionTime = performance.now() - timeInit;
                  if (executionTime > 1100) {
                    clearInterval(sleepInterval);
                    resolve(msgsArray);
                  }
                }, 200)

              }

            }
          })
        });

      }
      catch(err) {
        console.log(err);
      }
    })






  /*  // ** NOTE:// would definitely change in production!
    const data = {couches: [{},{},{},{}]}; // would be queried from database instead.

    var arrayOfNodes = Object.keys(data);
    if (arrayOfNodes.indexOf(ask) > -1) {
      // ask has matched recommendations we have in our dataset, proceed with getMessages promise

      var recommendations = data[ask];
      var askMessage = this.createAskMessage(ask);
      const completedMessagesArray = recommendations.unshift(askMessage);
      return completedMessagesArray;
    } else {
      // ask does not match recommendations in our database, inform user and nudge them to search again.
      const completedMessagesArray = this.createNoRecommendationsFound(ask);
      return completedMessagesArray;
    } */
  }


  createAskMessage(ask_string) {
    return {id: "ask", class: "message to", opener: `Do you have any ${ask_string} recommendations?`};
  }

  createTrendingAskMessage() {
    return {id: "ask", class: "message to", opener: `Show me what's hot today!`};
  }
  formatProductMessage(raw_product, i) {
    const productName = raw_product.name.split(',')[0]; //
    const productPrice = raw_product.price;
    const productImage = raw_product.images[0];
    var opener;
    switch (true) {
      case(i == 0):
        opener = `How about this `;
        return {
          id: "resp",
          class: "message from",
          opener: opener,
          productName: productName,
          productImage: productImage,
          productPrice: productPrice,
          fullDetails: raw_product
        }
      case(i == 1):
        opener = `.. or this `;
        return {
          id: "resp",
          class: "message from",
          opener: opener,
          productName: productName,
          productImage: productImage,
          productPrice: productPrice,
          fullDetails: raw_product
        }
      case(i == 2):
        opener = `There's also this `;
        return {
          id: "resp",
          class: "message from",
          opener: opener,
          productName: productName,
          productImage: productImage,
          productPrice: productPrice,
          fullDetails: raw_product
        }
      case(i == 3):
        opener = `.. and this `;
        return {
          id: "resp",
          class: "message from",
          opener: opener,
          productName: productName,
          productImage: productImage,
          productPrice: productPrice,
          fullDetails: raw_product
        }
      case(i == 4):
        opener = "Want more? I also like these:"
        return {
          id: "int",
          class: "message from",
          opener: opener,
          productName: productName,
          productImage: productImage,
          productPrice: productPrice,
          fullDetails: raw_product
        }
      default:
        opener = `This `;
        return {
          id: "resp",
          class: "message from",
          opener: opener,
          productName: productName,
          productImage: productImage,
          productPrice: productPrice,
          fullDetails: raw_product
        }
    }
  }

  createNoRecommendationsFound(ask_string) {
    return [{id: "ask", class: "message to", opener: `Do you have any ${ask_string} recommendations?`}, {id: "rec", class: "message from", messageBody: `yikes.. couldn't find any ${ask_string}s that I liked right now. try asking later or about something else instead`}];
  }

  getFeatured() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([{id: "resp", class: "message from", opener: 'sorry, but this functionality is not yet available 😞'}])
      }, 1300)
    })
  }
}
