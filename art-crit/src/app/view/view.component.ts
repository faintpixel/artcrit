import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ApplicationRef, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CritiqueRequest } from '../models/critiqueRequest';
import { CritiqueService } from '../critique.service';
import { Critique } from '../models/critique';
import { fromEvent } from 'rxjs';
import { switchMap, pairwise, takeUntil } from 'rxjs/operators';
import { OverlayAddMode } from '../models/overlayAddMode';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, AfterViewInit {
  @ViewChild('originalImage', { read: ViewContainerRef }) public originalImage;
  @ViewChild('canvas') public canvas: ElementRef;
  params: any;
  request: CritiqueRequest;
  selectedCritique = null;
  overlayOpacity = 1.0;
  originalImageOpacity = 1.0;
  paintoverContainerWidth = 0;
  overlayDomInfo: any = {};
  private fullWidth = 0;
  private fullHeight = 0;
  private overlaysSized = false;
  private cx: CanvasRenderingContext2D;
  overlayColor = '#ff0000';
  drawing = false;
  overlayAddMode = OverlayAddMode.None;

  constructor(private router: Router, private route: ActivatedRoute, private critiqueService: CritiqueService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.loadRequest(params['id']);
    });
  }

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    this.cx.lineWidth = 25;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.overlayColor; // '#FF0000';
    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        if (this.overlayAddMode === OverlayAddMode.Drawing) {
          const rect = canvasEl.getBoundingClientRect();

          const prevPos = {
            x: res[0].clientX - rect.left,
            y: res[0].clientY - rect.top
          };

          const currentPos = {
            x: res[1].clientX - rect.left,
            y: res[1].clientY - rect.top
          };

          this.drawOnCanvas(prevPos, currentPos);
        }
      });
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {
    this.cx.beginPath();
    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  public clickedImage(e) {
    this.sizeOverlays();
    const x = this.convertDisplaySizeToFullSize(e.offsetX, this.overlayDomInfo.width, this.fullWidth);
    const y = this.convertDisplaySizeToFullSize(e.offsetY, this.overlayDomInfo.height, this.fullHeight);

    if (this.selectedCritique == null) {
      this.selectedCritique = {};
    }
    if (this.selectedCritique.indicators == null) {
      this.selectedCritique.indicators = [];
    }
    const indicator = { value: this.selectedCritique.indicators.length + 1, x: x - 16, y: y - 15 };
    console.log(indicator);

    if (this.overlayAddMode === OverlayAddMode.Indicator) {
      this.selectedCritique.indicators.push(indicator);
    }
    console.log(e);
  }

  onResize(e) {
    // ApplicationRef.tick()
    // this.cdr.detectChanges();
    this.sizeOverlays(true);
    console.log('resized');
  }

  private convertDisplaySizeToFullSize(display: number, maxDisplay: number, full: number) {
    const value = (display / maxDisplay) * full;
    return value;
  }

  private convertFullXToDisplayX(x: number) {

    const value = (x / this.fullWidth) * this.overlayDomInfo.width;
    console.log(x + ' -> ' + value);
    return value;
  }

  private convertFullYToDisplayY(y: number) {
    const value = (y / this.fullHeight) * this.overlayDomInfo.height;
    return value;
  }

  sizeOverlays(force?: boolean) {
    if (!this.overlaysSized || force) {
      this.overlayDomInfo.width = this.originalImage.element.nativeElement.clientWidth;
      this.overlayDomInfo.height = this.originalImage.element.nativeElement.clientHeight;
      this.overlayDomInfo.left = this.originalImage.element.nativeElement.x;
      this.overlayDomInfo.top = this.originalImage.element.nativeElement.y;
      this.paintoverContainerWidth = this.originalImage.element.nativeElement.clientWidth;

      this.fullHeight = this.originalImage.element.nativeElement.naturalHeight;
      this.fullWidth = this.originalImage.element.nativeElement.naturalWidth;

      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      canvasEl.width = this.overlayDomInfo.width;
      canvasEl.height = this.overlayDomInfo.height;

      this.overlaysSized = true;
      console.log(this.originalImage.element);
      console.log(this.overlayDomInfo);
      console.log(this.originalImage.element.nativeElement.clientHeight);
    }
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

  public toggleOverlayAddMode() {
    if (this.overlayAddMode === OverlayAddMode.Indicator) {
      this.overlayAddMode = OverlayAddMode.Drawing;
    } else if (this.overlayAddMode === OverlayAddMode.Drawing) {
      this.overlayAddMode = OverlayAddMode.None;
    } else if (this.overlayAddMode === OverlayAddMode.None) {
      this.overlayAddMode = OverlayAddMode.Indicator;
    }
  }

}
