import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CritiqueRequest } from '../models/critiqueRequest';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-create-critique-request',
  templateUrl: './create-critique-request.component.html',
  styleUrls: ['./create-critique-request.component.css']
})
export class CreateCritiqueRequestComponent implements OnInit {
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  public createForm: FormGroup;
  public tagList = ['Watercolour', 'Digital', 'Pencil', 'Pen', 'Acrylic', 'Gouache', 'Oil'];
  public filteredTags: Observable<string[]>;
  public selectedTags = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private formBuilder: FormBuilder) {
    this.createForm = formBuilder.group({
      title: null,
      imageUrl: null,
      referenceUrl: null,
      description: null,
      tags: null,
      nsfw: null,
      isPublic: null
    });

    this.filteredTags = this.createForm.get('tags').valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.tagList.slice()));
  }

  ngOnInit() {
  }

  public createRequest() {
    console.log(this.createForm.value);
    console.log(this.selectedTags);
  }

  public isPublicChanged() {
    // TO DO - hide title/mediums if not public
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.selectedTags.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.createForm.patchValue({ tags: null});
    }
  }

  remove(tag: string): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.createForm.patchValue({ tags: null});
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tagList.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
