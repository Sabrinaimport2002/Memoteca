import { Router, ActivatedRoute } from '@angular/router';
import { PensamentosService } from './../../../services/pensamentos.service';
import { Pensamento } from 'src/app/model/pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(
    private pensamentosService: PensamentosService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.pensamentosService.buscarPorId(parseInt(id!)).subscribe({
      next: (pensamento) => {
        this.pensamento = pensamento
      }
    })
  }

  editarPensamento(){
    this.pensamentosService.editar(this.pensamento).subscribe({
      next: ()=>{
        this.router.navigate(['/listarPensamento'])
      }
    })
  }

  cancelar(){
    this.router.navigate(['/listarPensamentos'])
  }
}
