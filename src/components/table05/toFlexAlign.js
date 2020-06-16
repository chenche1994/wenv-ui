function toFlexAlign(align) {
  switch (align) {
    case 'left':
      return 'flex-start';
    case 'right':
      return 'flex-end';
    default:
      return align;
  }
}

export default toFlexAlign;
