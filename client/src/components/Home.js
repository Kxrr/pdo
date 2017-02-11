/**
 * Created by kxrr on 17/2/2.
 */


import React from 'react';
import VisibleTaskList from '../containers/VisibleTaskList'
import UpperToolbar from '../containers/UpperToolbar'


const Home = ({ param }) => (
  <div>
      <UpperToolbar/>
      <VisibleTaskList/>
  </div>
);

export default Home
