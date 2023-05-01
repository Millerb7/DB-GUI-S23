import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts';
//
import Login from './pages/Login';
import Register from './pages/Register';
import {Courses} from './pages/Courses';
import {AssignmentPage} from './pages/AssignmentPage';
import NotFound from './pages/Page404';
import { Calendar } from './pages/Calendar';
import { IndividualCoursePage } from './pages/IndividualCoursePage';
import { CourseEditor } from './pages/CourseEditor';
import { AssignmentEditor } from './pages/AssignmentEditor';
import { Home } from './pages/Home';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'courses', element: <Courses /> },
        { path: 'courses/new', element: <CourseEditor/>},
        { path: 'courses/edit/:course_id', element: <CourseEditor/>},
        { path: 'courses/:course_id', element: <IndividualCoursePage/>},
        { path: 'courses/:course_id/new', element: <AssignmentEditor/>},
        { path: 'courses/:course_id/edit/:assignment_id', element: <AssignmentEditor/>},
        { path: 'assignments/:assignment_id', element: <AssignmentPage/>},
        { path: 'calendar', element: <Calendar /> }
      ]
    },
    {
      path: '/',
      element: <Outlet />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> },

  ]);
}
