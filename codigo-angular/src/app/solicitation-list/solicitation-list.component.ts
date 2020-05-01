import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { SolicitationService } from '../_services/solicitation.service';

@Component({
  selector: 'app-solicitation-list',
  templateUrl: './solicitation-list.component.html',
  styleUrls: ['./solicitation-list.component.scss']
})
export class SolicitationListComponent implements OnInit {
  solicitations = [];
  solicitation : any;

  constructor(private solicitationService: SolicitationService) { }

  ngOnInit(): void {
    this.loadAllSolicitations();
  }

  getSolicitation(id: number) {
    this.solicitationService.get(id)
      .pipe(first())
      .subscribe(solicitation => this.solicitation = solicitation);
  }

  saveSolicitation(id: number) {
    this.solicitationService.get(id)
      .pipe(first())
      .subscribe(solicitation => this.solicitation = solicitation);
  }

  deleteSolicitation(id: number) {
    this.solicitationService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllSolicitations());
  }

  loadAllSolicitations() {
    this.solicitationService.getAll()
      .pipe(first())
      .subscribe(solicitations => this.solicitations = solicitations);
  }


}
