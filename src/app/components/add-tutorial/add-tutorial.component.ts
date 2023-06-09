import { Component } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  tutorial: Tutorial = new Tutorial();
  submitted = false;
  CEPvalid: boolean = false;

  CepCaracters: boolean = false;

  constructor(
    private tutorialService: TutorialService,
    private toastr: ToastrService
  ) {}

  saveTutorial(): void {
    console.log("imprime porra")
    this.tutorialService.create(this.tutorial).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = new Tutorial();
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

  populaDadosForm(dados: any) {
    if (dados.erro) {
      this.CEPvalid = false;
      this.toastr.error('Ops. CEP infomado incorreto');

      return;
    }
    this.CEPvalid = true;

    this.tutorial.cep = dados.cep;
    this.tutorial.rua = dados.logradouro;
    this.tutorial.estado = dados.uf;
    this.tutorial.cidade = dados.localidade;
  }
}
