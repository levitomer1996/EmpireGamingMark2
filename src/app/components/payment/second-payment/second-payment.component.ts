import { Component, OnInit } from "@angular/core";
import { TempoState } from "../../../app.state";

import { Store, select } from "@ngrx/store";
import { TempoOrder } from "src/app/models/tempo.model";
import { data } from "../../headerComps/modal/modal.component";

@Component({
  selector: "app-second-payment",
  templateUrl: "./second-payment.component.html",
  styleUrls: ["./second-payment.component.css"]
})
export class SecondPaymentComponent implements OnInit {
  tempo;

  constructor(private tempoStore: Store<TempoState>) {
    tempoStore
      .select("Tempo")
      .subscribe((data: TempoOrder) => (this.tempo = data));
  }

  ngOnInit(): void {
    console.log(this.tempo);
  }
}
