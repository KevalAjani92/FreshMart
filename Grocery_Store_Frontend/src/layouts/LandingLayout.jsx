import { Outlet } from "react-router-dom";
import LandingHeader from '../components/layout/Landing/LandingHeader';
import LandingFooter from '../components/layout/Landing/LandingFooter';
import ScrollToTop from '../components/common/ScrollToTop';


const LandingLayout = () => (
    <>
        <div className="min-h-screen bg-white relative">
            <ScrollToTop />
            <LandingHeader />
            <Outlet />
            <LandingFooter />
        </div>
    </>
);

export default LandingLayout;