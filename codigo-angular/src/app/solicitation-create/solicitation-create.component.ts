import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SolicitationService } from '../_services/solicitation.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-solicitation-create',
  templateUrl: './solicitation-create.component.html',
  styleUrls: ['./solicitation-create.component.scss']
})
export class SolicitationCreateComponent implements OnInit {
  solicitation: any;
  solicitationCreateForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private solicitationService: SolicitationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.solicitationCreateForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      cod: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.solicitationCreateForm.controls; }

  onSubmit() {
    this.submitted = true;
    let save = {
      solicitation: {
        patient: {
          name: '',
          sex: 0,
          age: 0,
        },
        procedure: {
          cod: ''
        },
      }
    }

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.solicitationCreateForm.invalid) {
      return;
    }

    save.solicitation.patient.name = this.solicitationCreateForm.value.name;
    save.solicitation.patient.sex = this.solicitationCreateForm.value.sex;
    save.solicitation.patient.age = this.solicitationCreateForm.value.age;

    save.solicitation.procedure.cod = this.solicitationCreateForm.value.cod;


    this.loading = true;
    this.solicitationService.post(save)
      .pipe(first())
      .subscribe(
        data => {
          this.solicitation = data;
          this.alertService.success('Solicitação de autorização enviada com sucesso', true);
          this.loading = false;
          this.router.navigate(['/solicitation']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
