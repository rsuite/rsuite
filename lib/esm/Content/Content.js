'use client';
import { createComponent } from "../internals/utils/index.js";
/**
 * The Content component is used to wrap content in a themed container with a max-width.
 * @see https://rsuitejs.com/components/container/
 *
 * For Internet Explorer 11 and lower, it's suggested that an ARIA role of "main"
 * be added to the <main> element to ensure it is accessible
 */
var Content = createComponent({
  name: 'Content',
  componentAs: 'main'
});
export default Content;