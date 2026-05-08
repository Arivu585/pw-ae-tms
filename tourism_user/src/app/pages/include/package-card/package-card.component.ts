import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.css'
})
export class PackageCardComponent {
  @Input() name:any = "";
  @Input() image:any = "";
  @Input() type:any = "";
  @Input() location:any = "";
  @Input() price:any = "";
  @Input() pkid:any = "";
}
