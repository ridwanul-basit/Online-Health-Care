import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { router } from './routes/Routes';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <RouterProvider router={router} />
       <Toaster
  position="top-right"
  reverseOrder={false}
/>
  </StrictMode>,
)
