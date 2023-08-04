import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Form_Display from './Form'

const App = () => {
 return(
  <div>
     <BrowserRouter>
      <Routes>
           <Route>
           <Route path="/" element={<Home/>} />
          <Route path="/form" element={<Form_Display/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
 ) 
}
export default App;
