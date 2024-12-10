import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

interface Cidade {
  nome: string;
  uf: string;
}

@Component({
  selector: 'app-cidade-select',
  templateUrl: './cidade-select.component.html',
  styleUrls: ['./cidade-select.component.scss']
})
export class CidadeSelectComponent implements OnInit {
  @Input() control: FormControl;

  cidades$: Observable<Cidade[]> = of([
    { nome: 'São Paulo', uf: 'SP' },
    { nome: 'Rio de Janeiro', uf: 'RJ' },
    { nome: 'Salvador', uf: 'BA' }
  ]);

  dropdownOpen = false;
  selectedCity: string | null = null; 

  ngOnInit() {
    const valor = this.control.value;
    if (valor) {
      const [nomeCidade] = valor.split(',');
      this.selectedCity = nomeCidade;
    }

    this.control.valueChanges.subscribe(v => {
      if (v) {
        const [nomeCidade] = v.split(',');
        this.selectedCity = nomeCidade;
      } else {
        this.selectedCity = null;
      }
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCity(cidade: Cidade): void {
    this.control.setValue(`${cidade.nome},${cidade.uf}`);
    this.selectedCity = cidade.nome;
    this.dropdownOpen = false;
  }

  resetCidade() {
    this.control.setValue('');
  }
}
