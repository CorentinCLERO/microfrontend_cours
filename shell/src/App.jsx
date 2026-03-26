import React, { Suspense, lazy, useEffect, useState } from "react";
import eventBus from "shared/eventBus";
import "./App.css";

const Header = lazy(() => import("mfeHeader/Navbar"));
const Lobby = lazy(() => import("mfeLobby/Lobby"));
// TODO: importer le Catalog
const Catalog = lazy(() => import("mfeCatalog/Catalog"));

function LoadingFallback({ name }) {
  return <div className="loading-fallback">Chargement {name}...</div>;
}

function App() {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const unsub = eventBus.on("catalog:product", (content) => {
      setObjects((prev) => [...prev, content]);
    });
    return () => unsub();
  }, []);

  return (
    <div className="shell">
      <Suspense fallback={<LoadingFallback name="Header" />}>
        <Header />
      </Suspense>

      <main className="shell-content">
        <div className="content-grid">
          <section className="section">
            <Suspense fallback={<LoadingFallback name="Lobby" />}>
              <Lobby />
            </Suspense>
          </section>

          <section className="section">
            {/* TODO: afficher le Catalog ici avec un Suspense */}
            <Suspense fallback={<LoadingFallback name="Lobby" />}>
              <Catalog />
            </Suspense>
          </section>
          <section className="section">
            {objects.map((object) => {
              console.log("object", object);
              return (
                <div key={object.productId}>
                  Object name : {object.productName}
                </div>
              );
            })}
          </section>
        </div>
      </main>

      <footer className="shell-footer">
        <p>Shell (3000) | Header (3001) | Lobby (3002) | Catalog (3003)</p>
      </footer>
    </div>
  );
}

export default App;
