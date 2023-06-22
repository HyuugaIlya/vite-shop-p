import {
  lazy,
  ReactElement,
  Suspense
} from 'react';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Preloader from './components/Common/Preloader/Preloader';
import Home from './Pages/Pizza';
import Header from './components/Header/Header';
import NotFound from './Pages/NotFound';
// import SideBar from './components/SideBar/SideBar';
// import Cart from './Pages/Cart';

// import './scss/app.scss';
import styles from './moduleSCSS/App.module.scss';

const Cart = lazy(() => import( /* webpackChunkName: "Cart" */ './Pages/Cart'));

function App(): ReactElement {
  return (
    <>
      {/* <div className="sidebar">
        <SideBar />
      </div> */}
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <Routes>
            <Route path='/' element={<Navigate to='/pizzas' />} />
            <Route path='/pizzas' element={<Home />} />
            <Route path='/cart' element={
              <Suspense fallback={<Preloader />}>
                <Cart />
              </Suspense>}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;