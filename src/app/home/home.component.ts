import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";

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
    this.firstObservableSubscription = interval(1000).subscribe(
      count => console.log(count)
    );
  }

  ngOnDestroy(): void {
    // permet d'arrêter le timer (si on load 10x ce composant, il va créer 10 observables qui vont s'exécuter en même temps -> memory leak)
    this.firstObservableSubscription.unsubscribe();
  }

}
