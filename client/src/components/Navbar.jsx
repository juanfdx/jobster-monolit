import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft } from 'react-icons/fa';
//redux
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
//components
import { Logo } from './Logo';
import { LogoutContainer } from './LogoutContainer';
import { ThemeToggle } from './ThemeToggle';


export const Navbar = () => {

  const dispatch = useDispatch();
  
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={()=>dispatch(toggleSidebar())}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  )
}