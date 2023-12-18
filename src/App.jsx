import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { AnimatePresence } from "framer-motion";
import MainContainer from "./components/MainContainer";
import CreateContainer from "./components/CreateContainer";
import { ToastContainer } from "react-toastify";
import RestaurantList from "./components/RestaurantList";
import Footer from "./components/Footer";

function App() {
  return (
    <AnimatePresence mode="wait">
      <div className=" h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 p-8 py-4 w-full md:px-16">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/menu" element={<RestaurantList />} />
          </Routes>
          <ToastContainer />
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  );
}

export default App;
