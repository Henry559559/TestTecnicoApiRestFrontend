import { Link } from "react-router-dom";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({children}: DefaultLayoutProps){
    return(
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li  className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Signup">Signup</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header> 
            <main>
                {children}
            </main>
        </>
    )
}