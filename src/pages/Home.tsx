import ListaTareas from "../components/ListaTareas"
import "./Home.css";

const Home = () => {
  return (
    <div className="home_container">
      <div className="header">
          <h1>Gestor de Tareas</h1>
      </div>
      <ListaTareas/>
    </div>
  )
}

export default Home
