import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// layout components
import { SitewideLayout } from './components';

// pages
import { HomePage } from './pages';


export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SitewideLayout />}>
          <Route index element={<HomePage />} />

        </Route>
      </Routes>
    </Router>
  );
}
