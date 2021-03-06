import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { EventsResultPage } from '../events-result/events-result';
import { OrganizationsProvider } from '../../providers/organizations/organizations';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';


@IonicPage()
@Component({
  selector: 'page-filter-events',
  templateUrl: 'filter-events.html', 
})
export class FilterEventsPage {
 
  public event = {
    month: '',
    timeStarts: '07:43',
    timeEnds: ''
}
zipcode:any;
structure:number = 4000;
endpoint:any = 'events/';
enable:boolean = false;
text:any;
home:boolean = false;
orgs:boolean = false;
events:boolean = false;
disable:boolean = true;
filter:any = 'all';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public viewCtrl: ViewController,
    private httpProvider:OrganizationsProvider,
    private storage: Storage,
    private keyboard: Keyboard) {
      this.keyboard.hideKeyboardAccessoryBar(false);

      console.log(this.navParams.get('location'));
      if(this.navParams.get('location') === 'home'){
        this.home = true;
        this.filter = 'followed';
      }else if (this.navParams.get('location') === 'orgs'){
        this.orgs = true;
      }else{
        this.events = true;
      }

      this.storage.get('homeDistance').then(result =>{
        if(result != null){
          this.structure = result;
        }else{
          this.structure = 4000;

        }
      });
      
      console.log(new Date());
      var today = new Date();
      var dd:any = today.getDate();
      var mm:any = today.getMonth()+1;
      var yyyy = today.getFullYear();
      var next_year = today.getFullYear()+1;

      if (dd<10){
        dd = '0'+dd;
      }

      if(mm<10){
        mm = '0'+mm;
      }

      

      this.storage.get('homeZipcode').then(data => {
        if(data != null){
          this.zipcode = data;
          if(this.zipcode.length >= 5){
            this.disable = false;
          }
        }
      });

      this.storage.get('startDate').then(data =>{
          if(data != null){
            this.event.month = data;
          } else{
            this.event.month = yyyy + '-' + mm + '-' + dd;
          }
      });

      this.storage.get('endDate').then(data =>{
        if(data != null){
          this.event.timeEnds = data;
        }else{
          this.event.timeEnds = next_year + '-' + mm + '-' + dd;

        }
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterEventsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  pop(){
    this.viewCtrl.dismiss('back');
  }

 

goToEvents(){  
  console.log(this.zipcode, this.structure, this.event.month, this.event.timeEnds);
  if(this.zipcode === null){
    this.storage.set('homeZipcode', '98053');
  }else{
    this.storage.set('homeZipcode', this.zipcode);
  }
  this.storage.set('homeDistance', this.structure);
  this.storage.set('startDate', this.event.month);
  this.storage.set('endDate', this.event.timeEnds);
  this.storage.set('filterBy', this.filter); 

  this.dismiss();
  // this.httpProvider.getJsonData(this.endpoint + this.zipcode + '/' + this.event.month + '/' +  this.event.timeEnds + '/' + this.structure)
  // .subscribe(
  //   result => {
  //       console.log("Events Filtered", JSON.stringify(result));
  //       // this.navCtrl.push(EventsResultPage, {
  //       //   'events' : result,
  //       //   'startDate': this.event.month,
  //       //   'endDate': this.event.timeEnds
  //       // });
        

        
  //   },
  //   err =>{
  //     console.error("Error : "+err);
  //   } ,
  //   () => {
  //     console.log('getData completed');
  //   }
  // );
 }


 

 getDistance(){
   console.log("Estructura", this.structure);
   if(this.structure > 99){
     this.text = "ANY DISTANCE";
     this.structure = 4000;
   }else if(this.structure < 1){
    this.text = "< 1 MILE";
   }
   else{
     this.text = this.structure + ' MILES';
   }
 }

 enableRange(){
   console.log(this.zipcode.length);
   if(this.zipcode.length >= 5){
    this.disable = false;
   }
 }

 getFilter(value){
   console.log(value);
   this.filter = value;
 }

 detail(item){
  console.log(item);
  var string = item.description;
  var numbers = string.match(/\d+/g).map(Number);
  console.log(numbers);
  if(numbers.toString().length <= 4){
    console.log("Only numbers", '0' + numbers);
    this.zipcode = '0' + numbers;

  }else{
    console.log("Only numbers", numbers);
    this.zipcode = numbers;

  }

}
}
