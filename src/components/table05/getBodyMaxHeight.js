function getBodyMaxHeight(target, headHeight) {
  const style = window.getComputedStyle(target);
  const maxHeight = style.getPropertyValue('max-height');
  if (maxHeight) {
    const result = parseInt(maxHeight, 10) - headHeight;
    return result > 0 ? result : 0;
  }
  return undefined;
}

export default getBodyMaxHeight;
