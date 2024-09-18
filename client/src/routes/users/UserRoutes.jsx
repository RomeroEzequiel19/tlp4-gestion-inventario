import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GetUsers } from '../../pages/users/GetUsers';

export const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GetUsers />} />
      </Routes>
    </div>
  );
};
