import {BrowserRouter, Routes, Route , Navigate, Outlet,} from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Signin from './pages/Signin';
import {Toaster} from 'react-hot-toast'
import LinkedInHome from './Main/LinkedInHome';
function App() {

  function PrivateRoute({ element }) {
    const userEmail = localStorage.getItem("userEmail");
    const userDisplayName = localStorage.getItem("userDisplayName");
    const userPhotoURL = localStorage.getItem("userPhotoURL");
  
    const mEmail = localStorage.getItem("muserEmail");
    const mName = localStorage.getItem("mname");
  
    if ( userEmail || userDisplayName || userPhotoURL || mEmail || mName) {
      return <Outlet />;
    } else {
      return <Navigate to="/*" replace />;
    }
  }

  return (
    <>
    <BrowserRouter>
      <Toaster position='top-center' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/home'
          element={<PrivateRoute />}
        >
          <Route index element={<LinkedInHome />} />
        </Route>
        <Route path='/signin' element={<Signin />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
