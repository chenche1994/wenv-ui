import anyChild from './anyChild.js';

function getNodeIcon(node, icons = {}) {
  if (anyChild(node)) {
    if (icons.fold && icons.unfold) {
      return `<svg class="wenv-tree-02-node-icon wenv-tree-02-node-icon-fold">
                <use xlink:href="#${icons.fold}"></use>
            </svg>
            <svg class="wenv-tree-02-node-icon wenv-tree-02-node-icon-unfold">
                <use xlink:href="#${icons.unfold}"></use>
            </svg>`;
    }
    return '';
  }

  if (icons.endpoint) {
    return `<svg class="wenv-tree-02-node-icon">
                <use xlink:href="#${icons.endpoint}"></use>
            </svg>`;
  }

  return '';
}

export default getNodeIcon;
