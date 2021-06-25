import React from 'react';
import { DatePicker } from 'rsuite';
const App = () => {
  return (
    <div>
      <DatePicker value={new Date()}></DatePicker>
    </div>
  );
};
export default App;
