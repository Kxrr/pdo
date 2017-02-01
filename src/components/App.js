/**
 * Created by kxrr on 17/2/2.
 */


import React from 'react';
import { VisibleTaskList } from '../containers/VisibleTaskList'
import { loadTestData } from '../tests/test'

loadTestData();


const App = () => (
  <div>
      <VisibleTaskList/>
  </div>
);

export default App
