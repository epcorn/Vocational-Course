import { Button } from "./Button";
import { Container } from "./Container";
import backgroundImage from "../images/background.jpg";
import Carousel from "./Carousel";
import logo1 from "../images/logo1.png";
import logo2 from "../images/logo2.png";
import guy from "../images/guy.png";
import advantage from "../images/advantage.png";

export function Hero() {
  return (
    <div className="relative pb-20 pt-10 sm:py-5">
      <div className="absolute inset-x-0 -bottom-14 -top-48 overflow-hidden bg-indigo-50">
        <img
          className="absolute left-0 top-0 translate-x-[-55%] translate-y-[-10%] -scale-x-100 sm:left-1/2 sm:translate-x-[-98%] sm:translate-y-[-6%] lg:translate-x-[-106%] xl:translate-x-[-122%]"
          src={backgroundImage}
          alt="background"
          width={918}
          height={1495}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative">
        <div>
          <Carousel />
          <h2 className="mt-5 text-center text-3xl font-semibold text-blue-600 ">
            About Serampore College
          </h2>
          <div className="grid grid-cols-4">
            <div className="col-span-1 hidden justify-center md:flex">
              <img src={logo1} alt="logo" />
            </div>
            <p className="col-span-4 my-4 md:col-span-3">
              The Serampore Mission of the Baptist Missionary Society was
              established on 10th January 1800, when William Carey had already
              spent about seven years in North Bengal since his arrival in
              Calcutta from Britain on 11th November 1793. He joined the team of
              other missionaries including Joshua Marshman and William Ward. In
              July 1818. Carey, Marshman and Ward published the prospectus of
              Serampore College “for the instruction of Asiatic Christians and
              other Youths in Eastern Literature and European Science.” While
              the founders laid great emphasis on the training of Christian
              leaders for the church in Asia, they had desired to have the
              College opening its doors to all students irrespective of their
              caste, colour and creed. It was made imperative to admit students
              with the understanding that the instruction would be secular in
              character. Consequently, the College has gained a worldwide
              reputation as a unique educational institution imparting
              instruction in as diverse disciplines as Christian Theology and
              liberal Arts, Science and Commerce. Along with the College the
              people of Serampore town have recognized the significant
              contribution made by Dr. William Carey to the society as a
              missionary, scholar and Social transformer by installing a plaque
              and by portraying prominently the famous statement of his in the
              Serampore Railway Station.
            </p>
            <h2 className="col-span-4 mt-8 text-center text-3xl font-semibold text-blue-600">
              About S Mark
            </h2>
            <div className="col-span-1 hidden justify-center md:flex">
              <img src={logo2} alt="logo" />
            </div>
            <p className="col-span-4 my-4 md:col-span-3">
              S Mark, is a leading organization dedicated towards developing new
              technology, training, research and skill development. The Skill
              Enhancement Course on the Principle and Practice of Integrated
              Pest Management, is a focused learning, teaching programme
              designed to deliver improved, sustainable and quality based early
              learning for professional pest management industry. The
              collaborative approach is to bring together
              technology,individuals, and teams who work within their circle of
              knowledge and excellence to collaborate with each other to deliver
              quality learning program. Such skill enhancement programs
              developed would matter and make the nation stronger, make INDIANS
              proud. Teaching programs at S Mark are focused on individual and
              community revolving around health care, hygiene, skill
              development, empowering individuals, teaching /learning, relief
              works, innovations, technology distribution, education, water
              conservation, air purification, improved sanitation, animal
              welfare, and public health. Our focus is to bring together
              talented, experienced individuals from different walks of life to
              contribute and be a part of a greater good and impart lessons
              learnt over decades to empower and generate employment.
            </p>
            <div></div>
            <h2 className="col-span-4 mt-8 text-start text-3xl font-semibold text-blue-600 md:col-span-3">
              Present & Future Of Pest Control Application Technology
            </h2>
            <div className="col-span-1 hidden justify-center md:flex">
              <img src={guy} alt="logo" className="mt-4 h-60 object-contain" />
            </div>
            <p className="col-span-4 my-4 flex items-center md:col-span-3">
              Increased environmental awareness as well as concerns about safe
              food, increased health awareness has led to a need for sustainable
              agricultural production systems and stable health conditions. Good
              agricultural practices and Integrated Pest Management (IPM) have
              become essential components of sustainable agriculture and healthy
              urban living. The integration of various control measures, with
              minimal use of pesticides, ensures that pests remain below the
              economic threshold and keep human health at prime. The IPM
              approach limits the negative side effects pesticides can have on
              the environment as well as on occupational & public health.
            </p>
            <h2 className="col-span-4 mt-8 text-center text-3xl font-semibold text-blue-600">
              Benefits of the course.
            </h2>
            <div className="col-span-1 hidden justify-center md:flex">
              <img
                src={advantage}
                alt="logo"
                className="mt-4 h-48 object-contain"
              />
            </div>
            <ul className="col-span-3 ml-10 mt-7 list-disc">
              <li className="mb-035">Will open up social upliftment.</li>
              <li className="mb-0.5">
                Will bring in more interest in vocational format.
              </li>
              <li className="mb-0.5">Will further skill development.</li>
              <li className="mb-0.5">
                Will open up new horizons for new generations.
              </li>
              <li className="mb-0.5">Will improve employability.</li>
              <li className="mb-0.5">
                Will allow better acceptance in overseas employment.
              </li>
              <li>Recession proof employments.</li>
            </ul>
          </div>
          <Button
            href="https://res.cloudinary.com/epcorn/image/upload/v1701753414/signature/Skill_Based_Development_Course_13_q3wv2t.pdf"
            className="mt-10 w-full bg-green-500 sm:hidden"
          >
            Prospectus
          </Button>
        </div>
      </Container>
    </div>
  );
}
