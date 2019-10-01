import { Component, OnInit, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Critique } from '../models/critique';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-create-critique',
  templateUrl: './create-critique.component.html',
  styleUrls: ['./create-critique.component.css']
})
export class CreateCritiqueComponent implements OnInit {

  private quill: any;

  public critique: Critique;
  public critiqueText = '';
  public quillConfig = {
    toolbar: [['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'clean'], [{ 'list': 'ordered'}, { 'list': 'bullet' }]]
  };


  // https://github.com/KillerCodeMonkey/ngx-quill
  // https://quilljs.com/guides/how-to-customize-quill/

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CreateCritiqueComponent>) {
    console.log(data);
    this.critique = data.critique;
  }

  ngOnInit() {
  }

  public save() {
    this.dialogRef.close();
    console.log(this.critiqueText);
  }

  public contentChanged(e) {
    this.critiqueText = e.html;
  }

  public quillCreated(instance) {
    this.quill = instance;
  }

  public clickedOnImage(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    this.quill.insertText(0, 'Test', { bold: true });
  }

}
