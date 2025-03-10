import { Component } from '@angular/core';

/**
 * Houses and displays data visualizations about Maxx Energy.
 */
@Component({
  selector: 'app-data',
  imports: [],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {
  protected displayFrame1 = true;
  protected displayFrame2 = false;
  protected displayFrame3 = false;

  protected toggleFrame1() {
    this.displayFrame1 = true;
    this.displayFrame2 = false;
    this.displayFrame3 = false;
  }

  protected toggleFrame2() {
    this.displayFrame1 = false;
    this.displayFrame2 = true;
    this.displayFrame3 = false;
  }

  protected toggleFrame3() {
    this.displayFrame1 = false;
    this.displayFrame2 = false;
    this.displayFrame3 = true;
  }
}
