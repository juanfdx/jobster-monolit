import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { 
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats, 
} from './pages';
import { ErrorElement } from './components';


//LOADERS
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { loader as allJobsLoader } from './pages/AllJobs'
import { loader as editJobLoader } from './pages/EditJob'
import { loader as adminLoader } from './pages/Admin';
import { loader as statsLoader } from './pages/Stats'
//ACTIONS
import { action as loginAction } from './pages/Login'
import { action as registerAction } from './pages/Register'
import { action as addJobAction } from './pages/AddJob'
import { action as editJobAction } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { action as profileAction } from './pages/Profile'



const router = createBrowserRouter([

  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,//for 404
    children: [
      { 
        index: true, 
        element: <Landing /> 
      },
      { 
        path: 'login', 
        element: <Login />,
        action: loginAction
      },
      { 
        path: 'register', 
        element: <Register />,
        action: registerAction 
      },
      {
        path: 'dashboard', 
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          { 
            index: true, 
            element: <AddJob />,
            action: addJobAction
          },
          { 
            path: 'stats', 
            element: <Stats />,
            loader: statsLoader,
            errorElement: <ErrorElement />
          },
          { 
            path: 'all-jobs', 
            element: <AllJobs />,
            loader: allJobsLoader
          },
          { 
            path: 'profile', 
            element: <Profile />,
            action: profileAction
          },
          { 
            path: 'admin', 
            element: <Admin />,
            loader: adminLoader
          },
          { 
            path: 'edit-job/:id', 
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction
          },
          { 
            path: 'delete-job/:id', 
            action: deleteJobAction
          },
        ] 
      },
    ]
  },

]);


function App() {

  return <RouterProvider router={router}  />
}

export default App
