import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';


//the request comes from the FORM in <SearchContainer />
export const loader = async ({ request }) => {
  // console.log(request.url);
  try {
    //we create a params object from url query params send by the Form in <SearchContainer /> L13
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
  // console.log(params);  
    const { data } = await customFetch.get('/jobs', { params });//with query params
    //we can use useLoaderData() to get user data from loader
    return { data, searchParams: params };

  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Something went wrong');
    return error;
  }
}


export const AllJobs = () => {

  const { data, searchParams } = useLoaderData();

  
  return (
    <>
      <SearchContainer searchParams={searchParams} />
      <JobsContainer data={data} />
    </>
  )
}