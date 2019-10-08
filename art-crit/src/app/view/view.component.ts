import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CritiqueRequest } from '../models/critiqueRequest';
import { CritiqueService } from '../critique.service';
import { Critique } from '../models/critique';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, AfterViewInit {
  @ViewChild('originalImage', { read: ViewContainerRef }) public originalImage;
  params: any;
  request: CritiqueRequest;
  selectedCritique = null;
  overlayOpacity = 1.0;
  originalImageOpacity = 1.0;
  paintoverContainerWidth = 0;
  overlayDomInfo: any = {};

  constructor(private router: Router, private route: ActivatedRoute, private critiqueService: CritiqueService) { }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.loadRequest(params['id']);
    });
  }

  ngAfterViewInit() {
  }

  sizeOverlays() {
    this.overlayDomInfo.width = this.originalImage.element.nativeElement.clientWidth;
    this.overlayDomInfo.height = this.originalImage.element.nativeElement.clientHeight;
    this.overlayDomInfo.left = this.originalImage.element.nativeElement.x;
    this.overlayDomInfo.top = this.originalImage.element.nativeElement.y;
    this.paintoverContainerWidth = this.originalImage.element.nativeElement.clientWidth;
    console.log(this.originalImage.element);
    console.log(this.overlayDomInfo);
    console.log(this.originalImage.element.nativeElement.clientHeight);
  }

  private loadRequest(id: string) {
    this.request = this.critiqueService.getRequest(id);
  }

  formatCritiqueMessage(critique): string {
    let result = critique.comment.replace(/\n/g, '<br/>');

    let i = 0;
    while (result.indexOf(':$ind$:') !== -1) {
      i++;
      result = result.replace(/:\$ind\$:/, '<div class="miniIndicator">' + i + '</div>'); // TO DO - on click/hover activate the big versions
    }

    result = result.replace(/:\$box\$:(.*?):\$endbox\$:/g, '<div>$1</div>');

    return result;
  }

  public clickedCritique(critique: Critique) {
    this.sizeOverlays();

    if (this.selectedCritique != null) {
      this.selectedCritique.selected = false;
    }
    critique.selected = true;
    this.selectedCritique = critique;
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
