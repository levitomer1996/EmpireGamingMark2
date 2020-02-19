import { Component, ViewChild } from "@angular/core";
import {
  NgbCarouselConfig,
  NgbSlideEventSource,
  NgbCarousel,
  NgbSlideEvent
} from "@ng-bootstrap/ng-bootstrap";
import { Sale } from "../../../models/sale";
import { SalesService } from "../../../services/sales.service";

@Component({
  selector: "app-carousales",
  templateUrl: "./carousales.component.html",
  providers: [NgbCarouselConfig] // add NgbCarouselConfig to the component providers
})
export class CarousalesComponent {
  sales: Sale[];
  images = [];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  @ViewChild("carousel", { static: true }) carousel: NgbCarousel;
  constructor(config: NgbCarouselConfig, public ss: SalesService) {
    // customize default values of carousels used by this component tree
    config.interval = 1000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  ngOnInit() {
    this.ss.getSales().subscribe(sales => {
      this.sales = sales;

      this.sales.forEach(s => {
        this.images.push({ img: s.img, name: s.name });
      });
    });
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }
}
