import logo from '../images/logo1.png'
import logo1 from '../images/logo2.png'

export function Logo(props) {
  const { width1 = "w-20", width2 = "w-40" } = props;

  return (
    <div className='flex'>
      <img src={logo} alt="logo" className={width1} />
      <img src={logo1} alt="logo" className={width2} />
    </div>
  );
}
