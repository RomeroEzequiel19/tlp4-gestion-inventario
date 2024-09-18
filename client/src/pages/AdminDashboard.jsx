import React from 'react';
import { Header } from '../components/common/Header';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {

  return (
    <>
      <Header />
      <div className="p-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Usuarios</h5>
                  <p className="card-text">Aquí puedes gestionar los usuarios.</p>
                  <Link className="btn btn-primary" to="/users">Ver</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Dispositivos</h5>
                  <p className="card-text">Aquí puedes gestionar los dispositivos.</p>
                  <button className="btn btn-primary">Ver</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
