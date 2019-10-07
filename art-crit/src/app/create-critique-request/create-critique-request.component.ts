import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-create-critique-request',
  templateUrl: './create-critique-request.component.html',
  styleUrls: ['./create-critique-request.component.css']
})
export class CreateCritiqueRequestComponent implements OnInit {

  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm = formBuilder.group({
      title: null,
      imageUrl: null,
      referenceUrl: null,
      description: null,
      mediums: null,
      nsfw: null,
      isPublic: null
    });
  }

  ngOnInit() {
  }

  public createRequest() {

  }
}
