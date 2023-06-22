import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  constructor(private readonly router: Router) {}

  @HostBinding('class') public classAttribute =
    'px-0 pt-10 pb-12.5 sm:px-25 flex items-center flex-col justify-center';

  onClick() {
    this.router.navigate(['./']);
  }
}
