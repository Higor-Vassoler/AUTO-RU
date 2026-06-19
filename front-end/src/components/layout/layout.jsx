import Header from "./components/header/header.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
import Footer from "./components/footer/footer.jsx";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />

      <main className="main-content">
        <Sidebar />

        <section className="page-content">{children}</section>
      </main>

      <Footer />
    </div>
  );
}
