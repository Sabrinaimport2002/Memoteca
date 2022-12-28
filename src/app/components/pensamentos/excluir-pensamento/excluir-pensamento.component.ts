import { ActivatedRoute, Router } from '@angular/router';
import { PensamentosService } from './../../../services/pensamentos.service';
import { Pensamento } from 'src/app/model/pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css'],
})
export class ExcluirPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  };

  constructor(
    private pensamentosService: PensamentosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //obter id para excluir o pensamento
    const id = this.route.snapshot.paramMap.get('id');
    this.pensamentosService.buscarPorId(parseInt(id!)).subscribe({
      next: (pensamento) => {
        this.pensamento = pensamento;
      },
    });
  }

  excluirPensamento() {
    if (this.pensamento.id) {
      this.pensamentosService.excluir(this.pensamento.id).subscribe({
        next: () => {
          this.router.navigate(['/listarPensamento']);
        },
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }
}
