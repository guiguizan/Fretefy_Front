import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegiaoService, Regiao } from '../../services/regiao.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-regiao-form',
  templateUrl: './regiao-form.component.html',
  styleUrls: ['./regiao-form.component.scss']
})
export class RegiaoFormComponent implements OnInit {
  form: FormGroup;
  editId: number;
  titulo = 'Cadastro de Região';

  constructor(
    private fb: FormBuilder,
    private regiaoService: RegiaoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cidades: this.fb.array([], Validators.required)
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editId = +params['id'];
        this.titulo = 'Edição de Região';
        this.regiaoService.obterPorId(this.editId).subscribe(regiao => {
          this.form.patchValue({ nome: regiao.nome });
          regiao.cidades.forEach(c => this.addCidade(c.nomeCidade, c.uf));
        });
      } else {
        this.addCidade();
      }
    });
  }

  get cidadesArray(): FormArray {
    return this.form.get('cidades') as FormArray;
  }

  addCidade(nome?: string, uf?: string): void {
    const control = this.fb.control(nome && uf ? `${nome},${uf}` : '', Validators.required);
    this.cidadesArray.push(control);
  }

  removeCidade(index: number): void {
    this.cidadesArray.removeAt(index);
  }

  salvar(): void {
    if (this.form.invalid) return;

    const { nome, cidades } = this.form.value;
    const uniqueCities = new Set(cidades);
    if (uniqueCities.size !== cidades.length) {
      alert('Não pode ter cidades duplicadas!');
      return;
    }

    const regiao: Partial<Regiao> = {
      nome,
      ativo: true,
      cidades: cidades.map((valor: string) => {
        const [nomeCidade, uf] = valor.split(',');
        return { nomeCidade, uf };
      })
    };

    const obs = this.editId
      ? this.regiaoService.atualizar(this.editId, regiao)
      : this.regiaoService.criar(regiao);

    obs.subscribe(() => {
      this.router.navigate(['/regiao']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/regiao']);
  }
}
