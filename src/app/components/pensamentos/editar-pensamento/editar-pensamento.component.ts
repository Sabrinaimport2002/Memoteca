import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private pensamentosService: PensamentosService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { }

    formulario!: FormGroup

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.pensamentosService.buscarPorId(parseInt(id!)).subscribe({
      next: (pensamento) => {
        this.formulario = this.formBuilder.group({
          id: [pensamento.id],
          conteudo: [pensamento.conteudo, Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/)
          ])],
          autoria: [pensamento.autoria, Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
          modelo: [pensamento.modelo],
          favorito: [pensamento.favorito]
        })
      }
    })
  }

  editarPensamento(){
    this.pensamentosService.editar(this.formulario.value).subscribe({
      next: ()=>{
        this.router.navigate(['/listarPensamento'])
      }
    })
  }

  cancelar(){
    this.router.navigate(['/listarPensamentos'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    }else {
      return 'botao__desabilitado'
    }
  }

}
