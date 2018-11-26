import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {style, query, stagger, state, animate, transition, trigger, group, keyframes} from '@angular/animations';
import { InventoryService } from './services/inventory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('askMessageAnimation', [

      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 }))

    ])
  ]
})

export class AppComponent {
  title = 'ecommerce-sample';
  showFAB: boolean=false;
  showCategories: boolean=false;
  showInfo: boolean=false;
  isShowingAsk: boolean = false;
  icon: string = "fas fa-bars";
  showTypingBubbles: boolean;
  clicked: boolean = false;
  currentTime: number;
  userQuery: any;
  askMessage: any;
  indexOfMessageClicked: any; // will be either undefined or a num
  messages: any;

  constructor(public inventoryService: InventoryService) {}
    ngOnInit() {
      this.setClock();
      this.messagesInit().then(searchTerm => {
        this.pagePopulationDelay(searchTerm);
      });
    }

    setClock() {
      this.currentTime = Date.now(); // prevents second delay in clock display
      setInterval(() => {
        this.currentTime= Date.now();
      }, 1000);
    }

    messagesInit() {
      return new Promise(resolve => {
        var autoQuery = this.inventoryService.getRandomAskForPageLoad();
        var askMessage = this.inventoryService.createAskMessage(this.userQuery);
        this.askMessage = askMessage;
        resolve(autoQuery)
      })

      //this.messages = await this.inventoryService.getMessages(test)
    }

    async pagePopulationDelay(query) {
      this.isShowingAsk = false;
      var askMessage = this.inventoryService.createAskMessage(query);
      this.askMessage = askMessage;
      setTimeout(() => {
        this.isShowingAsk = true;
      }, 600)
      setTimeout(() => {
        this.userQuery = undefined;
      }, 100)
      setTimeout(() => {
        this.showTypingBubbles = true;
      }, 1100)
      this.messages = await this.inventoryService.getMessages(query)
      this.showTypingBubbles = false;
    }

    async pagePopulationDelayForTrending() {
      this.isShowingAsk = false;
      var askMessage = this.inventoryService.createTrendingAskMessage();
      this.askMessage = askMessage;
      setTimeout(() => {
        this.isShowingAsk = true;
      }, 600)
      setTimeout(() => {
        this.userQuery = undefined;
        this.messages = undefined;
      }, 100)
      setTimeout(() => {
        this.showTypingBubbles = true;
      }, 1100)
      this.messages = await this.inventoryService.getFeatured()
      this.showTypingBubbles = false;
    }

    toggleFAB() {
      this.showInfo = this.showInfo ? false : false; //hides info popup if it is showing
      this.showCategories= this.showCategories ? false : false; // hides categories popup if it is showing
      this.showFAB = this.showFAB ? false : true;
      this.icon = (this.icon == "fas fa-bars") ? "fas fa-times-circle" : "fas fa-bars";
    }
    askFeatured() {}

    toggleCategories() {
      this.showInfo = this.showInfo ? false : false; //hides info popup if it is showing
      this.showCategories= this.showCategories ? false : true;
    }

    toggleInfo() {
      this.showInfo = this.showInfo ? false : true;
      this.showCategories= this.showCategories ? false : false; // hides categories popup if it is showing
    }

    preformButtonTask() {
      if (this.userQuery == undefined) {
        this.toggleFAB();
      } else {
        this.clicked = true;
      }
    }
    // Check if 'return' button is pressed and send the message.
    onType(keyCode) {
      if (keyCode == 13) {
        if (this.userQuery !== undefined) {
          if (this.userQuery.length >= 3) {
            this.showTypingBubbles = false;
            this.messages = undefined;
            this.pagePopulationDelay(this.userQuery);
            this.icon = "fas fa-bars";
            this.userQuery = undefined;
          }
        } else {
          this.icon = "fas fa-bars"
        }
      }
    }

    scrollBottom() {
      this.icon = "fas fa-arrow-circle-up disabled";
      this.showInfo = false;
      this.showCategories = false;
      this.showFAB = false;
      this.clicked = false;
      console.log('scrolling')
    }

    clearQuery() {
      this.icon = "fas fa-bars"
      if (this.userQuery == undefined) {
        this.icon = "fas fa-bars"
      } else if (this.clicked) {
        if (this.userQuery.length >= 3) {
          this.showTypingBubbles = false;
          this.messages = undefined;
          this.pagePopulationDelay(this.userQuery);
          this.icon = "fas fa-bars";
        }
      } else {
        this.userQuery = undefined;
      }
    }

    searchTopProducts(prewritten_query) {
      this.showTypingBubbles = false;
      this.messages = undefined;
      this.pagePopulationDelay(prewritten_query);
    }

    getTrendingProducts() {
      this.showTypingBubbles = false;
      this.pagePopulationDelayForTrending();
    }

    showProductInfo(msg_index) {
      this.indexOfMessageClicked = msg_index;
    }

}
