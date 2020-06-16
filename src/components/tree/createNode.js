import anyChild from './anyChild.js';
import { TITLE_CLASS, CHILDREN_CLASS } from './constants.js';
import getNodeIcon from './getNodeIcon.js';

function createNode(node, icons, multiple, isQuerying) {
  if (!node.visible) return '';
  let useHtml = '';
  let svgStyle = '';
  if (anyChild(node)) {
    useHtml = `<use xlink:href="#${icons.toggle}"></use>`;
  } else {
    svgStyle = 'style="pointer-events: none;"';
  }
  const toggleHtml = `<svg class="wenv-tree-02-node-toggle" ${svgStyle}>${useHtml}</svg>`;

  const checkboxHtml = multiple ? '<label></label>' : '';

  const iconHtml = getNodeIcon(node, icons);

  const nameHtml = `<span>${node.name}</span>`;

  const children = [`<div class="${CHILDREN_CLASS}">`];

  const expand = isQuerying ? node.expandWhenQuery : node.expand;
  if (expand && anyChild(node)) {
    children.push(
      ...node.children.map((c) => createNode(c, icons, multiple, isQuerying)),
    );
  }
  children.push('</div>');

  const nodeHtml = `<div>
    <div
    class="${TITLE_CLASS}"
    style="padding-left: ${node.level * 20}px"
    disabled="${node.disabled}" 
    data-id="${node.id}" 
    data-expand="${expand}"
    data-selected="${node.selected || 'false'}"
    data-indeterminate="${node.indeterminate || 'false'}">
    ${toggleHtml}${checkboxHtml}${iconHtml}${nameHtml}
    </div>
    ${children.join('')}
    </div>`;

  return nodeHtml;
}

export default createNode;
