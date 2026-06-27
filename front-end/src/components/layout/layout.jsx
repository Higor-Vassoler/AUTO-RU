import Header from "../header/header.jsx";
import Sidebar from "../sidebar/sidebar.jsx";
import Footer from "../footer/footer.jsx";
import "./layout.css";

export default function Layout({ children, showSidebar = true, showHeader = true}) {
  return (
    <div className="layout">
      {showHeader && <Header />}

      <main className="main-content">
        {showSidebar && <Sidebar />}
        

        <section className="page-content">{children}</section>
      </main>

      <Footer />
    </div>
  );
}
