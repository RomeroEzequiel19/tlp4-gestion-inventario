import { Routes, Route } from 'react-router-dom';
import { GetMaintenances } from '../../pages/maintenance/GetMaintenances';
import { UpdateMaintenance } from '../../pages/maintenance/UpdateMaintenance';
import { CreateMaintenance } from '../../pages/maintenance/CreateMaintenance';

export const MaintenanceRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GetMaintenances />} />
        <Route path="/create" element={<CreateMaintenance />} />
        <Route path="/edit/:maintenanceId" element={<UpdateMaintenance />} />
      </Routes>
    </div>
  )
}
