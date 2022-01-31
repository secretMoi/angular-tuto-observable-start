import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {error} from "protractor";
import {filter, map} from "rxjs/operators";

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

    const customIntervalObservable: Observable<any> = Observable.create(observer => {
      let count = 0;

      setInterval(() => {
        observer.next(count);

        if(count === 5) {
          observer.complete();
        }

        if(count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }

        count++;
      }, 1000)
    });

    // pipe/map intercepte les données passées à chaque event
    this.firstObservableSubscription = customIntervalObservable.pipe(
      filter((data: number) => {
        return data > 0;
      }), map(
      (data: number) => {
        return 'Round: ' + (data + 1);
      }
    )).subscribe(
      data => {
        console.log(data);
      }, error => { // si erreur, observable cancel, donc completed jamais appelé
        console.log(error);
        alert(error.message);
      }, () => {
        console.log('Completed');
      }
    );
  }

  ngOnDestroy(): void {
    // permet d'arrêter le timer (si on load 10x ce composant, il va créer 10 observables qui vont s'exécuter en même temps -> memory leak)
    this.firstObservableSubscription.unsubscribe();
  }

}
