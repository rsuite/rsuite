'use client';
import { deprecateComponent, createComponent } from "../internals/utils/index.js";
var NavbarBody = createComponent({
  name: 'NavbarBody'
});
export default deprecateComponent(NavbarBody, '<Navbar.Body> has been deprecated, you should <Nav> as direct child of <Navbar>');