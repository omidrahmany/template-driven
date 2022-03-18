import {Component, OnInit} from '@angular/core';
import {filter, interval, map, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ts-ignore
  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    /*this.firstObsSubscription = interval(1000)
      .subscribe(count=>{
      console.log(count)
    })*/

    const customIntervalObservable =
      // @ts-ignore
      Observable.create(observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count === 5) {
            observer.complete();
          }
          if (count > 6) {
            observer.error(
              new Error("the count is greater 3!"));
          }
          count++;
        }, 1000)
      });
    ;

    let pipe = customIntervalObservable.pipe(
      filter((data: number) => {
        return data > 2;
      })
      , map((data: number) => {
        return 'Round: ' + (data++);
      }));

    this.firstObsSubscription = pipe.subscribe(
      // @ts-ignore
      data => {
        console.log(data);
      }
      // @ts-ignore
      , error => {
        console.log(error);
        alert(error.message);
      }
      , () => {
        console.log("Completed!");
      }
    );

  }

}
