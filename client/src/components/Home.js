/**
 * Created by kxrr on 17/2/2.
 */


import React from 'react';
import VisibleTaskList from '../containers/VisibleTaskList'
import UpperToolbar from '../containers/UpperToolbar'
import PopTaskAddForm from '../containers/PopTaskAddForm'
import FlashedMessage from '../containers/FlashedMessage'


const Home = ({ param }) => (
  <div>
      <FlashedMessage/>
      <UpperToolbar/>
      <VisibleTaskList/>
      <PopTaskAddForm/>
  </div>
);

export default Home
