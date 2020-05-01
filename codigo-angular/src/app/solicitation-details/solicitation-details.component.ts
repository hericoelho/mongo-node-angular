import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SolicitationService } from '../_services/solicitation.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-solicitation-details',
  templateUrl: './solicitation-details.component.html',
  styleUrls: ['./solicitation-details.component.scss']
})
export class SolicitationDetailsComponent implements OnInit {
  solicitation: any;
  solicitaionForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private solicitationService: SolicitationService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getSolicitation(params.get('solicitaionId'));
    });
    this.solicitaionForm = this.formBuilder.group({
      agent: ['', Validators.required],
      allowed: ['false', Validators.required],
      description: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.solicitaionForm.controls; }

  getSolicitation(id: string) {
    this.solicitationService.get(id)
      .pipe(first())
      .subscribe(solicitation => this.solicitation = solicitation);
  }
  onSubmit() {
    this.submitted = true;
    let save = {
      solicitation: {
        technical_advice: {}
      }
    }

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.solicitaionForm.invalid) {
      return;
    }

    let arrayAdvice = this.solicitation.technical_advice;

    arrayAdvice.push({
      agent: this.solicitaionForm.value.agent,
      opinion: {
        allowed: this.solicitaionForm.value.allowed == 'true' ? true : false,
        description: this.solicitaionForm.value.description,
      }
    })

    save.solicitation.technical_advice = arrayAdvice;

    this.loading = true;
    this.solicitationService.put(this.solicitation._id, save)
      .pipe(first())
      .subscribe(
        data => {
          this.solicitation = data;
          this.alertService.success('Novo parecer salvo com sucesso', true);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
