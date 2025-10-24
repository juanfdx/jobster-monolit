import { useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/BigSidebar'
//components
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';


export const BigSidebar = () => {

  const { isOpened } = useSelector(state => state.sidebarState);

  return (
    <Wrapper>
      <div
        className={
          isOpened ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
}