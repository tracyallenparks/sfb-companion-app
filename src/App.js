import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Missing from './pages/Missing';
import Home from './pages/Home';
import NewSession from './pages/NewSession';
import EditSession from './pages/EditSession';
import Session from './pages/Session';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="new-session" element={<NewSession />} />
          <Route path="edit-session" element={<EditSession />} />
          <Route path="session" element={<Session />} />
          <Route path="*" element={<Missing />} />
      </Route>
  </Routes>
  );
}

export default App;