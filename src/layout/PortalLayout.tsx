import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constans";


interface PortalLayoutProps {
    children?: React.ReactNode;
  }
export default function PortalLayout({ children }: PortalLayoutProps) {
    const auth = useAuth();
  
    async function handleSignOut(e: MouseEvent) {
      e.preventDefault();
  
      try {
        const response = await fetch(`${API_URL}/signout`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${auth.getRefreshToken()}`,
          },
        });
        if (response.ok) {
        //   auth.signout();
        }
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <>
        <header>
          <nav  className="navbar navbar-expand-lg navbar-dark bg-dark">
           <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link  className="nav-link" to="/eventos">Eventos</Link>
                        </li>
                        <li className="nav-item">
                            <Link  className="nav-link"  to="/eventosForm">Crear Eventos</Link>
                        </li>
                        <li  className="nav-item">
                            <a  className="nav-link"  href="#" onClick={handleSignOut}>
                            Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
          </nav>
        </header>
  
        <main>{children}</main>
      </>
    );
  }