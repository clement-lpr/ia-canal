import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkTableModule,

    // Material
    DragDropModule,
    MatButtonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTooltipModule,
  ],
})
export class MaterialModule {}

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      extend: true,
    }),
  ],
  exports: [FormsModule, MaterialModule, ReactiveFormsModule, TranslateModule],
})
export class SharedModule {}
