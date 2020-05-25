import { Injectable } from '@angular/core';
import { CritiqueRequest } from './models/critiqueRequest';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Critique } from './models/critique';

@Injectable({
  providedIn: 'root'
})
export class CritiqueService {

  tmpRequests = [];

  constructor(private http: HttpClient, private errorService: ErrorService) {
    // tslint:disable-next-line:quotemark
    this.tmpRequests.push({"id": "asfdasdgasa", "title": "Jax the rescue dog", "imageUrl": "https://i.imgur.com/Ua8rj8F.png", "referenceUrl": "https://imgur.com/ynoJ99c.png", "description": "This is a handsome dog named Jax.", "tags": ["Pen"], "nsfw": null, "isPublic": true, "requestedByUser": "artomizer"});
    // tslint:disable-next-line:quotemark
    this.tmpRequests.push({"id": "ghfdghhgfd", "title": "Fabulist", "imageUrl": "https://imgur.com/xM2isIv.png", "referenceUrl": null, "description": "Words.", "tags": ["Pen", "Watercolour"], "nsfw": null, "isPublic": true, "requestedByUser": "artomizer"});
    // tslint:disable-next-line:quotemark
    this.tmpRequests.push({"id": "zxcvaafdsas", "title": "Bluejay", "imageUrl": "https://i.imgur.com/USY34Dy.jpg", "referenceUrl": null, "description": "testing one marked as nsfw", "tags": ["Digital"], "nsfw": true, "isPublic": true, "requestedByUser": "artomizer"});

   }

  public createCritiqueRequest(critiqueRequest: CritiqueRequest) {
    // return this.http.post<any>(environment.webAPI + 'ArtCrit/CritiqueRequests', critiqueRequest)
    // .pipe(catchError(this.errorService.handleError('Error updating reference.', 'updateReference', false)));
  }

  public getRequest(id: string): CritiqueRequest {
    for (const request of this.tmpRequests) {
      if (request.id === id) {
        const foundRequest = Object.assign({}, request);

        foundRequest.critiques = this.getCritiques('dsfa');
        return foundRequest;
      }
    }
    return null;
  }

  public getPublicRequests(): Array<CritiqueRequest> {
    return this.tmpRequests;
  }

  public getCritiques(critiqueRequestId: string): Array<Critique> {
    return [
      {
        username: 'someone',
        createDate: new Date(),
        age: '2 hours ago',
        comment: 'This is an example of a text only critique. Just some general observations and feedback.'
      },
      {
        username: 'someone else',
        createDate: new Date(),
        age: '3 hours ago',
        comment: 'This one has some indicators (click the comment to enable them). Mousing over them will make them change color or something. It can still have some random text like this, but then it can reference stuff like this:' +
          '\n:$ind$: - these are trees.\n:$ind$: - and this is grass I guess.\nAnd you can mix them in with the rest of the comment however you want',
        indicators: [
          { value: 1, x: 561, y: 273 },
          { value: 2, x: 181, y: 474 }
        ]
      },
      {
        username: 'person',
        createDate: new Date(),
        age: '4 hours ago',
        comment: 'You could also submit a paint over. It would be a manual process to save the image, load it in to your editor of choice, and do whatever. As long as the finished result is the same size as the original you can post it and overlay it. Click to show it.',
        paintoverUrl: 'https://imgur.com/qFO2xZB.png'
      },
      {
        username: 'someone else',
        createDate: new Date(),
        age: '5 hours ago',
        comment: 'Redline drawing done right from your browser. Maybe could include some simple tools like circles/lines/boxes. Overlays on top of the image.',
        paintoverUrl: 'https://imgur.com/jcZ6Sdq.png' // would actually be a collection of points or something
      },
      {
        username: 'another person',
        createDate: new Date(),
        age: '6 hours ago',
        comment: 'This one has a selection box. Similar to the numbered indicators above, but lets you indicate the extent of it more directly. Would work in a similar way.\n:$box$:Something about this person:$endbox$:\n:$box$:Something about this sign:$endbox$:',
        boxes: [
          { id: 1, x: 140, y: 415, width: 50, height: 30 },
          { id: 2, x: 525, y: 408, width: 80, height: 140  }
        ]
      }
    ];
  }
}
