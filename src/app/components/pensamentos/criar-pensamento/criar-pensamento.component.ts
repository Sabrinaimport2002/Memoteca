import { PensamentosService } from './../../../services/pensamentos.service';
import { Pensamento } from './../../../model/pensamento';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  constructor(
    private pensamentoService: PensamentosService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  criarPensamento() {
    this.pensamentoService.criar(this.pensamento).subscribe({
      next: ()=>{
        this.router.navigate(['/listarPensamento'])
      }
    });
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }
}
