import './index.css';
import Header from "./components/layout/Header";
import Main1 from "./components/layout/Main1";
import Main2 from "./components/layout/Main2";
import Main3 from "./components/layout/Main3";
import Main4 from "./components/layout/Main4";
import Main5 from "./components/layout/Main5";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Main1 />
        <Main2 />
        <Main3 />
        <Main4 />
        <Main5 />
      </main>
      <Footer />
    </>
  );
}

export default App;