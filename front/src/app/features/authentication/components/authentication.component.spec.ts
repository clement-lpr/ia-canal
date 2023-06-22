import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MaterialModule } from '@shared/shared.module';
import { MockProvider } from 'ng-mocks';

import { AuthenticationFacade } from '../authentication.facade';
import { AuthenticationForm } from '../forms';
import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let spectator: Spectator<AuthenticationComponent>;

  let movieFacadeStub: Partial<AuthenticationFacade> = {
    authenticationForm: new FormGroup<AuthenticationForm>({
      password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    }),
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  };

  const createComponent = createComponentFactory({
    component: AuthenticationComponent,
    imports: [FormsModule, ReactiveFormsModule, MaterialModule],
    providers: [MockProvider(AuthenticationFacade, movieFacadeStub, 'useValue')],
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
