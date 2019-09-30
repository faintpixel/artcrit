import { Component, OnInit } from '@angular/core';
import { CritiqueRequest } from '../models/critiqueRequest';
import { CritiqueService } from '../critique.service';
import { Critique } from '../models/critique';

@Component({
  selector: 'app-critique',
  templateUrl: './critique.component.html',
  styleUrls: ['./critique.component.css']
})
export class CritiqueComponent implements OnInit {

  public indicatorPosition = 'absolute';
  public selectedCritique = null;
  public originalImageOpacity = 1.0;

  public critiqueRequest: CritiqueRequest;
  public critiques: Array<Critique>;

  constructor(private critiqueService: CritiqueService) {
    this.critiqueRequest = critiqueService.getRequest('test'); // TO DO - get id from URL
    this.critiques = critiqueService.getCritiques(this.critiqueRequest.id);
  }

  ngOnInit() {
  }

  public clickedImage(e) {
    console.log(e);
  }

  public clickedCritique(critique) {
    if (this.selectedCritique != null) {
      this.selectedCritique.selected = false;
    }
    critique.selected = true;
    this.selectedCritique = critique;
  }

  public getIndicatorStyle(indicator) {
    return 'left: ' + indicator.x + 'px; top: ' + indicator.y + 'px;';
  }

  public formatCritiqueMessage(critique): string {
    let result = critique.comment.replace(/\n/g, '<br/>');

    let i = 0;
    while (result.indexOf(':$ind$:') !== -1) {
      i++;
      result = result.replace(/:\$ind\$:/, '<div class="miniIndicator">' + i + '</div>'); // TO DO - on click/hover activate the big versions
    }

    result = result.replace(/:\$box\$:(.*?):\$endbox\$:/g, '<div>$1</div>');

    return result;
  }

  public originalImageOpacityChanged(e) {
    this.originalImageOpacity = e.value / 100;
  }

}
