'use client';
import { deprecateComponent, createComponent } from "../internals/utils/index.js";
var NavbarHeader = createComponent({
  name: 'NavbarHeader'
});
export default deprecateComponent(NavbarHeader, '<Navbar.Header> has been deprecated, use <Navbar.Brand> instead.');