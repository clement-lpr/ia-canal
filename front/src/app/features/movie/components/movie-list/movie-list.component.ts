import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from '@core/models';
import { MovieFacade } from '@features/movie/movie.facade';

import { UntilDestroy } from '@ngneat/until-destroy';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  dataSource = new MatTableDataSource<Movie>([]);
  displayedColumns = ['title', 'imdbRating', 'rotenRating', 'votes', 'edit'];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort, {}) sort?: MatSort;

  constructor(
    private readonly movieFacade: MovieFacade,
    private readonly cd: ChangeDetectorRef,
    private readonly dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    this.movieFacade.movies$.subscribe((movies) => {
      this.dataSource.data = movies;
      if (this.paginator && this.sort) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cd.detectChanges();
      }
    });
  }

  openDialog(movie: Movie) {
    this.movieFacade.updateMovieConsultationHistory(movie);
    this.dialog.open(MovieDialogComponent, {
      width: '800px',
      height: '500px',
      data: {
        movie,
      },
    });
  }
}
