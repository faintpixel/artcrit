import { Component, OnInit, Inject, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Critique } from '../models/critique';
import { QuillModule } from 'ngx-quill';
import { Indicator } from '../models/indicator';
import * as Quill from 'quill';

@Component({
  selector: 'app-create-critique',
  templateUrl: './create-critique.component.html',
  styleUrls: ['./create-critique.component.css']
})
export class CreateCritiqueComponent implements OnInit {

  @Output() indicatorsModified = new EventEmitter<Number[]>();

  private quill: any;

  public critiqueText = '';
  public quillConfig = {
    toolbar: [['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'clean'], [{ 'list': 'ordered'}, { 'list': 'bullet' }]]
  };


  // https://github.com/KillerCodeMonkey/ngx-quill
  // https://quilljs.com/guides/how-to-customize-quill/

  constructor() {
    
  }

  ngOnInit() {
  }

  public save() {
    console.log(this.critiqueText);
  }

  public contentChanged(e) {
    
    this.critiqueText = e.html;
    // this seems stupidly inefficient to do it this way
    this.reNumberIndicators();
  }

  public quillCreated(instance) {
    this.quill = instance;
    const Block = Quill.import('blots/block');
    const Inline = Quill.import('blots/inline');
    const BlockEmbed = Quill.import('blots/block/embed');

    class IndicatorBlot extends Inline {
      static create(value) {
        const node = super.create();
        node.setAttribute('data.x', value.x);
        node.setAttribute('data.y', value.y);
        node.setAttribute('contenteditable', false);
        node.innerHTML = value.value;
        return node;
      }

      static value(node) {
        return {
          datax: node.getAttribute('data.x'),
          datay: node.getAttribute('data.y')
        };
      }
    }
    (IndicatorBlot as any).blotName = 'indicator';
    (IndicatorBlot as any).tagName = 'div';
    (IndicatorBlot as any).className = 'miniIndicator';


    Quill.register(IndicatorBlot);
  }

  public addIndicator(indicator: Indicator) {
    const range = this.quill.getSelection(true);
    // quill.insertText(range.index, '\n', Quill.sources.USER);
    this.quill.insertEmbed(range.index + 1, 'indicator', {
      value: indicator.value,
      x: indicator.x,
      y: indicator.y
    }, Quill.sources.USER);
    this.quill.setSelection(range.index + 2, Quill.sources.SILENT);

    //this.quill.insertText(0, '1', { indicator: true, x: 4, y: 1 });
  }

  public reNumberIndicators() {
    const nodes: any = document.querySelector('#editor').getElementsByClassName('miniIndicator');
    if (nodes.length === 0) {
      return;
    }
    const existingOldIds = [];
    let i = 1;
    for (const node of nodes) {
      const indicator = Quill.find(node);
      console.log(indicator);
      existingOldIds.push(Number(indicator.domNode.innerHTML));
      indicator.domNode.innerHTML = i;
      i++;
    }

    this.indicatorsModified.emit(existingOldIds);
  }

  public test() {
    this.reNumberIndicators();
  }

}
