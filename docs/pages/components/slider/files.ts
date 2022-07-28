const files = [
  {
    name: 'slider.less',
    import: true,
    content: `.custom-slider {
  margin-top: 18px;

  .rs-slider-handle {
    top: -6px;
    background-color: #3498ff;
    text-align: center;
    padding: 3px;
    margin-left: -16px;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 0 0 8px rgb(52 152 255 / 25%);
    }

    &::before {
      display: none;
    }
  }

  &.rs-slider-dragging .rs-slider-handle,
  &.rs-slider-dragging .rs-slider-handle:hover {
    box-shadow: none;
    transform: scale(1.2);
  }
}
`
  }
];

export default files;
