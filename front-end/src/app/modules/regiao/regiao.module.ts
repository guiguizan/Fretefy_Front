import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegiaoComponent } from './regiao.component';
import { RegiaoRoutingModule } from './regiao.routing';
import { RegiaoListComponent } from './pages/regiao-list/regiao-list.component';
import { RegiaoFormComponent } from './pages/regiao-form/regiao-form.component';
import { CidadeSelectComponent } from './components/cidade-select/cidade-select.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RegiaoRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegiaoComponent, RegiaoListComponent, RegiaoFormComponent, CidadeSelectComponent],
  exports: [RegiaoComponent]
})
export class RegiaoModule { }
