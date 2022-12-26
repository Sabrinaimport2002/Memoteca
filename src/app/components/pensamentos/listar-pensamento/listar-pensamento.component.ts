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

  constructor(
    private pensamentosService: PensamentosService
  ) {}

  ngOnInit(): void {
    this.pensamentosService.listar().subscribe({
      next: (listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      },
      error: (error) => console.log(error),
    });
  }
}
