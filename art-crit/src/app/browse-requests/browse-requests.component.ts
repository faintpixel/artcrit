import { Component, OnInit } from '@angular/core';
import { CritiqueRequest } from '../models/critiqueRequest';
import { CritiqueService } from '../critique.service';

@Component({
  selector: 'app-browse-requests',
  templateUrl: './browse-requests.component.html',
  styleUrls: ['./browse-requests.component.scss']
})
export class BrowseRequestsComponent implements OnInit {
  public requests: Array<CritiqueRequest>;

  constructor(private critiqueService: CritiqueService) {
    this.requests = critiqueService.getPublicRequests();
    console.log(this.requests[0]);
  }

  ngOnInit() {
  }

}
