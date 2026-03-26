import React, { Suspense, lazy } from "react";
import "./App.css";

// TODO: importer le composant Header depuis le MFE distant
const Header = lazy(() => import("mfeHeader/Navbar"));

function HeaderFallback() {
  return <div className="header-loading">Chargement du Header...</div>;
}

function App() {
  return (
    <div className="shell">
      {/* TODO: afficher le Header ici avec un Suspense */}
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>

      <main className="shell-content">
        <div className="placeholder">
          <h2>Shell Operationnel</h2>
          <p>
            Le Header devrait apparaitre au-dessus quand le MFE sera branche.
          </p>
        </div>
      </main>

      <footer className="shell-footer">
        <p>Shell sur le port 3000 | Header MFE sur le port 3001</p>
      </footer>
    </div>
  );
}

export default App;
