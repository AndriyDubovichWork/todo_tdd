import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type RoutesTestingHOCType = {
  children: JSX.Element;
};
const RoutesTestingHOC = ({ children }: RoutesTestingHOCType) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={children} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesTestingHOC;
