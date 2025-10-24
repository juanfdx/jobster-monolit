import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';


export const loader = async () => {
  // try {
  //   const response = await customFetch.get('/jobs/stats');
  //   return response.data;

  // } catch (error) {
  //   return error;
  // }

  //Another approach. Without try catch when the error is thrown error will bubble up
  //so ErrorElement in app.jsx L70 will catch the error 
  const response = await customFetch.get('/jobs/stats');
  return response.data;
};


export const Stats = () => {
  
  const { defaultStats, monthlyApplications } = useLoaderData();


  return (
    <>
      <StatsContainer defaultStats={defaultStats} />

      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  )
}