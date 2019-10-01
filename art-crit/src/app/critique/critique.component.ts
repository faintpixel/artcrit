import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CritiqueRequest } from '../models/critiqueRequest';
import { CritiqueService } from '../critique.service';
import { Critique } from '../models/critique';
import { CreateCritiqueComponent } from '../create-critique/create-critique.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-critique',
  templateUrl: './critique.component.html',
  styleUrls: ['./critique.component.css']
})
export class CritiqueComponent implements OnInit {

  @ViewChild('originalImage', { read: ViewContainerRef }) public originalImage;
  @ViewChild('editor') public editor: CreateCritiqueComponent;

  public indicatorPosition = 'absolute';
  public selectedCritique = null;
  public originalImageOpacity = 1.0;
  public overlayOpacity = 1.0;
  public paintoverContainerWidth = 0;

  public critiqueRequest: CritiqueRequest;
  public critiques: Array<Critique>;

  constructor(private critiqueService: CritiqueService, public dialog: MatDialog) {
    this.critiqueRequest = critiqueService.getRequest('test'); // TO DO - get id from URL
    this.critiques = critiqueService.getCritiques(this.critiqueRequest.id);
  }

  ngOnInit() {
  }

  public clickedImage(e) {
    const x = e.offsetX - 10;
    const y = e.offsetY - 12;
    console.log('x: ' + x + ', y: ' + y);

    if (this.selectedCritique.indicators == null) {
      this.selectedCritique.indicators = [];
    }
    const indicator = { value: this.selectedCritique.indicators.length + 1, x: x, y: y };
    this.selectedCritique.indicators.push(indicator);

    console.log(this.editor);
    this.editor.addIndicator(indicator);
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

  public overlayOpacityChanged(e) {
    this.overlayOpacity = e.value / 100;
  }

  public paintoverSliderChanged(e) {
    this.paintoverContainerWidth = (e.value / 100) * this.originalImage.element.nativeElement.clientWidth;
  }

}
