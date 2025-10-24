import { Outlet, redirect, useLoaderData, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard';
import customFetch from '../utils/customFetch';
//components
import { Navbar, BigSidebar, SmallSidebar, Loading } from '../components';



export const loader = async () => {
  try {
    const {data} = await customFetch.get('/users/current-user');
    //we can use useLoaderData() to get user data from loader
    return data;

  } catch (error) {
    return redirect('/');
  }
}


export const DashboardLayout = () => {

  const { user } = useLoaderData();

  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  

  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
          {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
          </div>
        </div>
      </main>
    </Wrapper>
  )
}