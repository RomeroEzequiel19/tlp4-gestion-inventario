import { Routes, Route } from 'react-router-dom';
import { GetDevices } from '../../pages/devices/GetDevices'
import { CreateDevice } from '../../pages/devices/CreateDevice'
import { UpdateDevice } from '../../pages/devices/UpdateDevice'

export const DevicesRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GetDevices />} />
        <Route path="/create" element={<CreateDevice />} />
        <Route path="/edit/:deviceId" element={<UpdateDevice />} />
      </Routes>
    </div>
  )
}
