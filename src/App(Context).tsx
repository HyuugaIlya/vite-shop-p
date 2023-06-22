import { useState, createContext } from 'react';
import Content from './components/Content/PizzaContent';
import Header from './components/Header/Header';
import './scss/app.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
// import SideBar from './components/SideBar/SideBar';
import Cart from './Pages/Cart';
import NotFound from './Pages/NotFound';
import CartEmpty from './components/CartPage/CartEmpty/CartEmpty';

export type TSearchContext = {
  searchValue: string
  setSearchValue: (searchValue: string) => void
}
export const SearchContext = createContext<TSearchContext>({ searchValue: '', setSearchValue: () => { } });

function App() {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <>
      {/* <div className="sidebar">
        <SideBar />
      </div> */}
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path='/' element={<Navigate to='/pizzas' />} />
              <Route path='/pizzas' element={<Content />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/cart-empty' element={<CartEmpty />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </>
  );
}

export default App;