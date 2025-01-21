import {Outlet} from 'react-router-dom';
import Navbar from './../../Components/Navbar/Navbar';
import Footer from './../../Components/Footer/Footer';

const Root = () => {
   return (
      <>
         <Navbar/>
         <div className="min-h-screen px-6"><Outlet/></div>
         <Footer/>
      </>
   );
};

export default Root;