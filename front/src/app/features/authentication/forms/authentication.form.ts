import { FormControl } from '@angular/forms';

export interface AuthenticationForm {
  password: FormControl<string | null>;
  username: FormControl<string | null>;
}
