import { Routes, Route } from 'react-router-dom';
import { GetUsers } from '../../pages/users/GetUsers';
import { CreateUser } from '../../pages/users/CreateUser';
import { UpdateUser } from '../../pages/users/UpdateUser';

export const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GetUsers />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:userId" element={<UpdateUser />} />

      </Routes>
    </div>
  );
};
