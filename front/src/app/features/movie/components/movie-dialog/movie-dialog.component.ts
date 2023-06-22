import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '@core/models';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDialogComponent implements OnInit {
  movie?: Movie;

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: { movie: Movie }) {}

  ngOnInit(): void {
    this.movie = this.data.movie;
  }
}
