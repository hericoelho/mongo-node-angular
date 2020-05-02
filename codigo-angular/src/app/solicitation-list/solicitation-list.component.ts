import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { SolicitationService } from '../_services/solicitation.service';

@Component({
  selector: 'app-solicitation-list',
  templateUrl: './solicitation-list.component.html',
  styleUrls: ['./solicitation-list.component.scss']
})
export class SolicitationListComponent implements OnInit {
  solicitations = [];

  constructor(private solicitationService: SolicitationService, private router: Router) { }

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

  showSolicitation(id: number) {
    this.router.navigate(['/solicitation', id]);
  }


}
