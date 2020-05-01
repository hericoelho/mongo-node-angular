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

  constructor(private solicitationService: SolicitationService) { }

  ngOnInit(): void {
    this.loadAllSolicitations();
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
