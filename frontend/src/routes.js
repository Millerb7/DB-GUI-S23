import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import {Courses} from './pages/Courses';
import {AssignmentPage} from './pages/AssignmentPage';
import NotFound from './pages/Page404';
import { Calendar } from './pages/Calendar';
import { IndividualCoursePage } from './pages/IndividualCoursePage';
import { CourseEditor } from './pages/CourseEditor';
import { AssignmentEditor } from './pages/AssignmentEditor';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <DashboardApp /> },
        { path: 'courses', element: <Courses /> },
        { path: 'courses/new', element: <CourseEditor/>},
        { path: 'courses/edit/:course_id', element: <CourseEditor/>},
        { path: 'courses/:course_id', element: <IndividualCoursePage/>},
        { path: 'courses/:course_id/new', element: <AssignmentEditor/>},
        { path: 'assignments/:assignment_id', element: <AssignmentPage/>},
        { path: 'calendar', element: <Calendar /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
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
