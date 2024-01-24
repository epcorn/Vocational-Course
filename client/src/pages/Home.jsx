import { Hero } from "../components/Hero";
import { Speakers } from "../components/Speakers";
import { Sponsors } from "../components/Sponsors";
import TrainingVideos from "../components/TrainingVideos";

const Home = () => {
  return (
    <main>
      <Hero />
      <Speakers />
      <TrainingVideos />
      <Sponsors />
    </main>
  );
};
export default Home;
