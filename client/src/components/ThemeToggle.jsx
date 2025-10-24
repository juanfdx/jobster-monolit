import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice';


export const ThemeToggle = () => {
  
  const { isDarkTheme } = useSelector(state => state.themeState);
  const dispatch = useDispatch();


  return (
    <Wrapper onClick={() => dispatch(toggleTheme())}>
      {isDarkTheme ? (
        <BsFillSunFill className='toggle-icon' />
      ) : (
        <BsFillMoonFill className='toggle-icon' />
      )}
    </Wrapper>
  );
}