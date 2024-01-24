
import logo from '../images/logo1.png'
import logo1 from '../images/logo2.png'

export function Logo(props) {
  return (
    <div className='flex'>
      <img src={logo} alt="logo" className="w-20" />
      <img src={logo1} alt="logo" className="w-40" />
    </div>
  );
}
