import { NavLink, useLoaderData } from 'react-router-dom';
import { links } from '../utils/links'
//redux
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../features/sidebar/sidebarSlice';



export const NavLinks = ({ isBigSidebar }) => {

  const { user } = useLoaderData();
  const dispatch = useDispatch();

  const { role } = user;


  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        //show admin link only if is admin user
        if (path === 'admin' && role !== 'admin') return;

        return (
          <NavLink
            to={path}
            key={text}
            onClick={isBigSidebar ? null : ()=>dispatch(toggleSidebar())}
            className='nav-link'
            end //to avoid Add Job link stay always active
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}