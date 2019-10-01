// import Parchment from 'parchment';

// export class IndicatorBlot extends Parchment.Inline {
//   static create(url) {
//     const node = super.create();
//     node.setAttribute('href', url);
//     node.setAttribute('target', '_blank');
//     node.setAttribute('title', node.textContent);
//     return node;
//   }

//   static formats(domNode) {
//     return domNode.getAttribute('href') || true;
//   }

//   format(name, value) {
//     if (name === 'link' && value) {
//       this.domNode.setAttribute('href', value);
//     } else {
//       super.format(name, value);
//     }
//   }

//   formats() {
//     const formats = super.formats();
//     formats['link'] = IndicatorBlot.formats(this.domNode);
//     return formats;
//   }
// }
// IndicatorBlot.blotName = 'indicator';
// IndicatorBlot.tagName = 'A';

// Parchment.register(IndicatorBlot);
