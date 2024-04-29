import logo from "../images/logo1.png";
import logo1 from "../images/logo2.png";

export function Logo(props) {
  const { width1 = "w-20 block mx-auto", width2 = "w-40" } = props;

  return (
    <div className="flex">
      <div className="flex-col flex-nowrap">
        <img src={logo} alt="logo" className={width1} />
        <p className="whitespace-nowrap text-blue-800 font-bold text-[20px]">
          SERAMPORE COLLEGE
        </p>
      </div>
      <img src={logo1} alt="logo" className={width2} />
    </div>
  );
}
//SERAMPORE COLLEGE
//Serampore College
