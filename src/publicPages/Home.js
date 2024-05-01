import Header from "../components/header/Header";
import Brand from "../components/brand/Brand";
import Service from "../components/service/Service";
import RepairProcess from "../components/repairProcess/RepairProcess";
import HomeCard from "../components/homeCard/HomeCard";
import About from "../components/about/About";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle('KGTech Repairs');
  return (
    <div>
      <Header />
      <Brand />
      <Service />
      <RepairProcess />
      <About />
      <HomeCard />
    </div>
  )
}

export default Home
