import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // event périodique selon le timer
    // this.firstObservableSubscription = interval(1000).subscribe(
    //   count => console.log(count)
    // );

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;

      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000)
    });

    this.firstObservableSubscription = customIntervalObservable.subscribe(
      data => console.log(data)
    );
  }

  ngOnDestroy(): void {
    // permet d'arrêter le timer (si on load 10x ce composant, il va créer 10 observables qui vont s'exécuter en même temps -> memory leak)
    this.firstObservableSubscription.unsubscribe();
  }

}
