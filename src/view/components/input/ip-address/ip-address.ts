/// <reference path="../../../../../typings/es6/lib.es6.d.ts" />
/// <reference path="../../../../../typings/angular2/angular2.d.ts" />

import {Component, View, Attribute} from 'angular2/angular2';


@Component({
  selector: 'cw-ip-address-input',
  host: {
    '[class.cw-input-has-value]': 'inputHasValue',
    '[class.cw-input-has-focus]': 'inputHasFocus',
  }
})
@View({
  template: `
      <input type="text" [value]="value"
                     (input)="updateValue($event)"
                     (focus)="setHasFocus(true)"
                     (blur)="setHasFocus(false)"
                     placeholder="{{placeholderText()}}"/>
  `
})
export class CwIpAddressInput {
  inputHasValue:boolean;
  inputHasFocus:boolean;
  value:string;

  constructor(@Attribute('id') id:string, @Attribute('value') value:string) {
    this.value = value == null ? '' : value;
    this.inputHasValue = false;
    this.inputHasFocus = false;
  }

  placeholderText() {
    return "198.51.100.1"
  }

  isEmptyValue(value) {
    return value == ''
  }

  updateValue(event) {
    console.log('input value changed: [from / to]', this.value, event.target.value)
    this.value = event.target.value;
    this.inputHasValue = !this.isEmptyValue(this.value);
  }

  setHasFocus(hasFocus:boolean) {
    console.log(`Input has ${hasFocus ? 'gained' : 'lost'} focus.`)
    this.inputHasFocus = hasFocus
  }
}



