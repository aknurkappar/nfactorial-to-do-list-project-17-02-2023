import './App.css';
import Header from "./components/Header"
import Main from './components/Main';
import Footer from "./components/Footer"
import { v4 as uuid } from "uuid";

const itemsData = [
  {
      id: uuid(),
      title: "task 1",
      isDone: false,
      isTrashModalShown: false,
      inTrash: false
  },
  {
      id: uuid(),
      title: "task 2",
      isDone: false,
      isTrashModalShown: false,
      inTrash: false
  },
  {
      id: uuid(),
      title: "task 3",
      isDone: false,
      isTrashModalShown: false,
      inTrash: false
  },
]

function App() {
  return (
    <div className='App'>
      <div>
        <Header />
        <Main itemsData = {itemsData} />
      </div>
      <Footer />
    </div>

  );
}

export default App;
