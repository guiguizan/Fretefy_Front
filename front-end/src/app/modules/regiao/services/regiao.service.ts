import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

export interface Regiao {
  id: number;
  nome: string;
  cidades: Array<{ nomeCidade: string; uf: string }>;
  ativo: boolean;
}

@Injectable({ providedIn: 'root' })
export class RegiaoService {
  private regioes: Regiao[] = [
    {
      id: 1,
      nome: 'Região Sul',
      cidades: [{ nomeCidade: 'Curitiba', uf: 'PR' }],
      ativo: true
    },
    {
      id: 2,
      nome: 'Grande São Paulo',
      cidades: [{ nomeCidade: 'São Paulo', uf: 'SP' }],
      ativo: false
    }
  ];

  private regioesSubject = new BehaviorSubject<Regiao[]>([...this.regioes]);

  constructor() {}

  listar(): Observable<Regiao[]> {
    return this.regioesSubject.asObservable();
  }

  obterPorId(id: number): Observable<Regiao> {
    const regiao = this.regioes.find(r => r.id === id);
    if (!regiao) {
      throw new Error('Região não encontrada');
    }
    return of({ ...regiao });
  }

  criar(regiao: Partial<Regiao>): Observable<Regiao> {
    const id = this.getNovoId();
    const novaRegiao: Regiao = {
      id,
      nome: regiao.nome,
      cidades: regiao.cidades || [],
      ativo: regiao.ativo !== undefined ? regiao.ativo : true
    };
    this.regioes.push(novaRegiao);
    this.atualizarLista();
    return of({ ...novaRegiao });
  }

  atualizar(id: number, dados: Partial<Regiao>): Observable<Regiao> {
    const index = this.regioes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Região não encontrada para atualizar');
    }

    const regiao = this.regioes[index];
    const regiaoAtualizada = {
      ...regiao,
      ...dados
    };
    this.regioes[index] = regiaoAtualizada;
    this.atualizarLista();
    return of({ ...regiaoAtualizada });
  }

  ativarDesativar(id: number, ativo: boolean): Observable<void> {
    const index = this.regioes.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Região não encontrada para ativar/desativar');
    }
    this.regioes[index] = { ...this.regioes[index], ativo };
    this.atualizarLista();
    return of(undefined);
  }

  exportar(): Observable<Blob> {
    const header = 'id,nome,ativo,cidades\n';
    const lines = this.regioes.map(r => {
      const cidadesStr = r.cidades.map(c => `${c.nomeCidade}-${c.uf}`).join('|');
      return `${r.id},${r.nome},${r.ativo},${cidadesStr}`;
    }).join('\n');

    const csvContent = header + lines;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return of(blob);
  }

  private atualizarLista(): void {
    this.regioesSubject.next([...this.regioes]);
  }

  private getNovoId(): number {
    const ids = this.regioes.map(r => r.id);
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return maxId + 1;
  }
}
