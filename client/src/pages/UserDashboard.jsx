import { Header } from '../components/common/Header';
import { Link } from 'react-router-dom';

export const UserDashboard = () => {

  return (
    <>
      <Header />
      <div className="p-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Dispositivos</h5>
                  <p className="card-text">Aquí puedes gestionar los dispositivos.</p>
                  <Link className="btn btn-primary" to="/devices">Ver</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Mantenimiento</h5>
                  <p className="card-text">Aquí puedes gestionar el mantenimiento</p>
                  <Link className="btn btn-primary" to="/maintenances">Ver</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
