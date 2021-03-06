import { Component } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import { UsersProvider } from '../../providers/users/users';
import {FilterEventsPage} from '../../pages/filter-events/filter-events';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'filter-header',
  templateUrl: 'filter-header.html'
})
export class FilterHeaderComponent {

  searchTerm: string = '';
  events: any;
  searchControl: FormControl;
  searching: any = false;
  endpoint:string = 'events';


  constructor(private httpProvider: UsersProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log('Hello FilterHeaderComponent Component');
    this.searchControl = new FormControl();

  }

   ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsRequestPage');
    this.setFilteredItems();
     this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
          this.searching = false;
          this.setFilteredItems();
 
        });

  }


  onSearchInput(){
        this.searching = true;
    }

     setFilteredItems() {
 
        this.events = this.filterItems(this.searchTerm);
 
    }


    filterItems(searchTerm){
 
        return this.events.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }

    goToEventFilter(){
      this.navCtrl.push(FilterEventsPage);
    }

}
