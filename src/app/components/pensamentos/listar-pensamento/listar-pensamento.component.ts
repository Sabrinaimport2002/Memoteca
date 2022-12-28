import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { PensamentosService } from './../../../services/pensamentos.service';
import { Pensamento } from './../../../model/pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = ''
  favoritos: boolean = false
  listaFavoritos: Pensamento[] = []
  titulo: string = "Meu Mural"

  constructor(private pensamentosService: PensamentosService, private router: Router) { }

  ngOnInit(): void {
    this.pensamentosService.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe({
      next: (listaPensamentos) => {
        this.listaPensamentos = listaPensamentos
      }
    })
  }

  recarregarComponente(){
    this.favoritos = false
    this.paginaAtual = 1
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  carregarMaisPensamentos() {
    this.pensamentosService.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe({
        next: (listaPensamentos) => {
          this.listaPensamentos.push(...listaPensamentos);
          if(!listaPensamentos.length) {
            this.haMaisPensamentos = false
          }
        }
      })
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.pensamentosService.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe({
      next: (listaPensamentos) => {
        this.listaPensamentos = listaPensamentos
      }
    })
  }

  listarFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.favoritos = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.pensamentosService.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe({
      next: (listaPensamentosFavoritos) => {
        this.listaPensamentos = listaPensamentosFavoritos
        this.listaFavoritos = listaPensamentosFavoritos
      }
    })
  }
}
