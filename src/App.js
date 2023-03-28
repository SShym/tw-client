import './App.css';
import { useSelector } from 'react-redux';
import { Route, Routes  } from 'react-router-dom';

import Main from './Components/Main/Main';
import Product from './Components/Product/Product';
import Navbar from './Components/Navbar/Navbar';
import Favorite from './Components/Favorite/Favorite';
import Error from './Components/Error/Error';

function App() { 
  const error = useSelector(state => state.appReducer.error); 

  return (
    <div className="app">
      <div className="app-wrap">
          <Navbar />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/:id' element={<Product />} />
            <Route path='*' element={<Error />} />
          </Routes>
          {error && <Error />}
      </div>
    </div>
  );
}

export default App;
