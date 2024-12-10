import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Cidade {
  nome: string;
  uf: string;
}

@Injectable({ providedIn: 'root' })
export class CidadeService {
  listarCidades(): Observable<Cidade[]> {
    return of([
      { nome: 'São Paulo', uf: 'SP' },
      { nome: 'Rio de Janeiro', uf: 'RJ' },
      { nome: 'Salvador', uf: 'BA' }
    ]);
  }
}