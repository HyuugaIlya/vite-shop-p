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
import Header from './components/Header/Header';
import NotFound from './Pages/NotFound';
import SideBar from './components/SideBar/SideBar';
import Popular from './Pages/Popular';

// import Pizza from './Pages/Pizza';
// import Drinks from './Pages/Drinks';
// import Cart from './Pages/Cart';

import styles from './moduleSCSS/App.module.scss';

const Cart = lazy(() => import( /* webpackChunkName: "Cart" */ './Pages/Cart'));
const Drinks = lazy(() => import( /* webpackChunkName: "Drinks" */ './Pages/Drinks'));
const Pizza = lazy(() => import( /* webpackChunkName: "Pizza" */ './Pages/Pizza'));

function App(): ReactElement {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.content}>
          <Routes>
            <Route path='/' element={<Navigate to='/popular' />} />
            <Route path='/popular' element={<Popular />} />
            <Route path='/pizzas' element={
              <Suspense fallback={<Preloader />}>
                <Pizza />
              </Suspense>}
            />
            <Route path='/cart' element={
              <Suspense fallback={<Preloader />}>
                <Cart />
              </Suspense>}
            />
            <Route path='/drinks' element={
              <Suspense fallback={<Preloader />}>
                <Drinks />
              </Suspense>}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;