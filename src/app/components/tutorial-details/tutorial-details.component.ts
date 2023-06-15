import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  @Input() tutorial?: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = {
    nome: '',
    description: '',
    cep: '',
    rua:'',
    estado:'',
    cidade:'',
    published: false
  };
  message = '';

  CEPvalid: boolean = false;
  CepCaracters: boolean = false;

  constructor(private tutorialService: TutorialService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }

  updatePublished(status: boolean): void {
    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, { published: status })
      .then(() => {
        this.currentTutorial.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateTutorial(): void {
    const data = {
      nome: this.currentTutorial.nome,
      description: this.currentTutorial.description,
      cep: this.currentTutorial.cep,
      rua: this.currentTutorial.rua,
      estado: this.currentTutorial.estado,
      cidade: this.currentTutorial.cidade
    };

    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, data)
        .then(() => this.message = 'Atualizado com sucesso!')
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(): void {
    console.log("Pega??")
    if (this.currentTutorial.id) {
      this.tutorialService.delete(this.currentTutorial.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'Deletado com sucesso!';
        })
        .catch(err => console.log(err));
    }
  }

  consultaCep(CEP: string | undefined) {
    const cepValue = CEP ?? '';
    if (typeof cepValue === 'string') {
      if (cepValue.length > 7) {
        this.tutorialService
          .buscarCep(cepValue)
          .subscribe((dados) => this.populaDadosForm(dados));
      } else {
      }
    }
  }

  populaDadosForm(dados: any) {
    if (dados.erro) {
      this.CEPvalid = false;
      this.toastr.error('Ops. CEP infomado incorreto');

      return;
    }
    this.CEPvalid = true;

    this.currentTutorial.cep = dados.cep;
    this.currentTutorial.rua = dados.logradouro;
    this.currentTutorial.estado = dados.uf;
    this.currentTutorial.cidade = dados.localidade;
  }

  updateCepCaracters(CEP: String | undefined) {
    const cepValue = CEP ?? '';
    if (typeof cepValue === 'string') {
      if (cepValue && cepValue.length > 7) {
        this.CepCaracters = false;
        return;
      }

      this.CepCaracters = true;
    }
  }
}