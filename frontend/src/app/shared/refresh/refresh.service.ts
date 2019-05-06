import { Injectable, Output, EventEmitter } from '@angular/core';

/**
 * Refresh Service. Gets events triggered to refresh pages so we get new jokes
 */
@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  chucklist = false;
  quote = false;

  @Output() refreshChuckList: EventEmitter<boolean> = new EventEmitter();
  @Output() refreshQuote: EventEmitter<boolean> = new EventEmitter();

  setRefreshChuckList() {
    this.chucklist = !this.chucklist;
    this.refreshChuckList.emit(this.chucklist);
  }
  setRefreshQuote() {
    this.quote = !this.quote;
    this.refreshQuote.emit(this.quote);
  }
}
