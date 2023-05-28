import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './common/components/Layout';
import { ROUTES } from './config/routes';
import { About } from './pages/About';
import { AddPlayer } from './pages/AddPlayer';
import { Home } from './pages/Home';
import { Players } from './pages/Players';

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.generateTeam} element={<Home />} />
            <Route path={ROUTES.players} element={<Players />} />
            <Route path={ROUTES.playersNew} element={<AddPlayer />} />
            <Route path={ROUTES.about} element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
