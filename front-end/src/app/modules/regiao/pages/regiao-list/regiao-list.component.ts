import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Regiao, RegiaoService } from '../../services/regiao.service';

@Component({
  selector: 'app-regiao-list',
  templateUrl: './regiao-list.component.html',
  styleUrls: ['./regiao-list.component.scss']
})
export class RegiaoListComponent implements OnInit {
  regioes$: Observable<Regiao[]>;
  openedRegiao: number | null = null;

  constructor(private regiaoService: RegiaoService, private router: Router) {}

  ngOnInit(): void {
    this.regioes$ = this.regiaoService.listar();
  }

  ativarDesativar(regiao: Regiao): void {
    this.regiaoService.ativarDesativar(regiao.id, !regiao.ativo).subscribe(() => {
      this.regioes$ = this.regiaoService.listar();
    });
  }

  editarRegiao(id: number): void {
    this.router.navigate(['/regiao/editar', id]);
  }

  exportar(): void {
    this.regiaoService.exportar().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'regioes.csv';
      a.click();
    });
  }

  toggleMenu(regiaoId: number): void {
    this.openedRegiao = this.openedRegiao === regiaoId ? null : regiaoId;
  }
}
