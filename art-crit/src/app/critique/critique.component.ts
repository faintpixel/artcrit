import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-critique',
  templateUrl: './critique.component.html',
  styleUrls: ['./critique.component.css']
})
export class CritiqueComponent implements OnInit {

  public imageUrl = 'https://i.imgur.com/xM2isIv.png';
  public indicatorPosition = 'absolute';
  public selectedCritique = null;

  public critiques = [
    {
      author: 'someone',
      age: '2 hours ago',
      comment: 'This is an example of a text only critique. Just some general observations and feedback.'
    },
    {
      author: 'someone else',
      age: '3 hours ago',
      comment: 'This one has some indicators (click the comment to enable them). Mousing over them will make them change color or something. It can still have some random text like this, but then it can reference stuff like this:' +
        '\n:$ind$: - these are trees.\n:$ind$: - and this is grass I guess.\nAnd you can mix them in with the rest of the comment however you want',
      indicators: [
        { value: 1, x: 561, y: 273 },
        { value: 2, x: 181, y: 474 }
      ]
    },
    {
      author: 'person',
      age: '4 hours ago',
      comment: 'You could also submit a paint over. It would be a manual process to save the image, load it in to your editor of choice, and do whatever. As long as the finished result is the same size as the original you can post it and overlay it. Click to show it.',
      paintover: 'https://imgur.com/qFO2xZB.png'
    },
    {
      author: 'someone else',
      age: '5 hours ago',
      comment: 'Redline drawing done right from your browser. Maybe could include some simple tools like circles/lines/boxes. Overlays on top of the image.',
      paintover: 'https://imgur.com/jcZ6Sdq.png' // would actually be a collection of points or something
    },
    {
      author: 'another person',
      age: '6 hours ago',
      comment: 'This one has a selection box. Similar to the numbered indicators above, but lets you indicate the extent of it more directly. Would work in a similar way.\n:$box$:Something about this person:$endbox$:\n:$box$:Something about this sign:$endbox$:',
      boxes: [
        { value: 1, x: 140, y: 415, width: 50, height: 30 },
        { value: 2, x: 525, y: 408, width: 80, height: 140  }
      ]
    }
  ];

  public indicators = [];

  constructor() { }

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

}
