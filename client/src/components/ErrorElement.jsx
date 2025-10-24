import { useRouteError } from 'react-router-dom';


export const ErrorElement = () => {

  const error = useRouteError();
  console.log(error?.message || error);

  return <h4>There was an error...</h4>;
}