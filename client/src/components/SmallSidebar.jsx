import Wrapper from '../assets/wrappers/SmallSidebar';
import { NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';
//components
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';



export const SmallSidebar = () => {

  const { isOpened } = useSelector(state => state.sidebarState);
  const dispatch = useDispatch();

  
  return (
    <Wrapper>
      <div
        className={
          isOpened ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>

          <button type='button' className='close-btn' onClick={()=>dispatch(toggleSidebar())}>
            <FaTimes />
          </button>

          <header>
            <Logo />
          </header>

          <NavLinks toggleSidebar={toggleSidebar} />

        </div>
      </div>
    </Wrapper>
  );
}