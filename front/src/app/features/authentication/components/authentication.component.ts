import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationFacade } from '../authentication.facade';
import { AuthenticationForm } from '../forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  public get authenticationForm(): FormGroup<AuthenticationForm> {
    return this.authenticationFacade.authenticationForm;
  }

  public get username(): FormControl<string | null> {
    return this.authenticationFacade.username;
  }

  public get password(): FormControl<string | null> {
    return this.authenticationFacade.password;
  }

  constructor(private readonly authenticationFacade: AuthenticationFacade) {}

  public onSubmit(): void {
    this.authenticationForm.markAllAsTouched();
    if (this.authenticationForm.invalid) {
      return;
    }
    this.authenticationFacade.onLogin();
  }
}
