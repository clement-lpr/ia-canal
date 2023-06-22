import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromStore from '@features/authentication/store';
import { Store } from '@ngrx/store';

import { AuthenticationForm } from './forms';

@Injectable()
export class AuthenticationFacade {
  public authenticationForm: FormGroup<AuthenticationForm> = new FormGroup<AuthenticationForm>({
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  public get username(): FormControl<string | null> {
    return this.authenticationForm.controls.username;
  }

  public get password(): FormControl<string | null> {
    return this.authenticationForm.controls.password;
  }

  constructor(private readonly store: Store) {}

  public onLogin(): void {
    this.store.dispatch(
      fromStore.Login({
        user: { password: this.password.value || '', username: this.username.value || '' },
      }),
    );
  }
}
