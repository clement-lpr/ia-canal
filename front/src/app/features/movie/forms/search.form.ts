import { FormControl } from '@angular/forms';

export interface SearchForm {
  movieConsultationHistory: FormControl<string | null>;
  searchHistory: FormControl<string | null>;
  searchValue: FormControl<string | null>;
}
