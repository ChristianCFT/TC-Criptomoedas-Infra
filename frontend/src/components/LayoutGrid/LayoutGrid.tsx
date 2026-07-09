import "./layoutGrid.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function LayoutGrid({ children }) {

    return (
        <div className="layout">

            <Navbar />

            <div className="content">
                {children}
            </div>

            <Footer />

        </div>
    );
}

export default LayoutGrid;