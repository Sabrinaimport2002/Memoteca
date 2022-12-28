import { PensamentosService } from './../../../services/pensamentos.service';
import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/model/pensamento';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento: Pensamento = {
  id: 0,
  conteudo: "",
  autoria: "",
  modelo: "",
  favorito: false
  }

  @Input() listaFavoritos: Pensamento[] = []

  constructor(private pensamentosService: PensamentosService) { }

  ngOnInit(): void {
  }

  larguraPensamento(): string{
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(){
    if(this.pensamento.favorito == false){
      return 'inativo'
    } else{
      return 'ativo'
    }
  }

  atualizarFavoritos(){
    this.pensamentosService.mudarFavorito(this.pensamento).subscribe({
      next: ()=> {
        this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1)
      }
    })
  }

}
