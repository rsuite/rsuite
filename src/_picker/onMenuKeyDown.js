function onMenuKeyDown(event, events) {
  switch (event.keyCode) {
    // down
    case 40:
      events.down(event);
      event.preventDefault();
      break;
    // up
    case 38:
      events.up(event);
      event.preventDefault();
      break;
    // enter
    case 13:
      events.enter(event);
      event.preventDefault();
      break;
    // esc | tab
    case 27:
    case 9:
      events.esc(event);
      event.preventDefault();
      break;
    default:
  }
}

export default onMenuKeyDown;
