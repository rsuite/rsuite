import { setStatic, setDisplayName } from 'recompose';

import { defaultProps } from '../utils';
import Drawer from './Drawer';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import ModalTitle from '../Modal/ModalTitle';
import ModalFooter from '../Modal/ModalFooter';

const EnhancedBody = defaultProps({ classPrefix: 'drawer-body' })(ModalBody);

setStatic('Body', setDisplayName('Body')(EnhancedBody))(Drawer);
setStatic('Header', defaultProps({ classPrefix: 'drawer-header' })(ModalHeader))(Drawer);
setStatic('Title', defaultProps({ classPrefix: 'drawer-title' })(ModalTitle))(Drawer);
setStatic('Footer', defaultProps({ classPrefix: 'drawer-footer' })(ModalFooter))(Drawer);

export default Drawer;
