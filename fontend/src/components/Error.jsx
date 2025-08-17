import React from 'react';
import { Link, useRouteError } from 'react-router';

const Error = ({ errorMessage }) => {
  const routeError = useRouteError();
  const error = routeError || { message: errorMessage || 'An unexpected error occurred' };

  return (
    <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl max-w-lg w-full">
        <div className="card-body text-center">
          <h1 className="text-4xl font-bold text-error mb-4">Oops!</h1>
          <p className="text-lg mb-4">Something went wrong.</p>
          <p className="text-sm text-gray-600 mb-6">{error.message}</p>
          <div className="card-actions justify-center gap-4">
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
            {errorMessage && (
              <button
                onClick={() => window.location.reload()}
                className="btn btn-outline btn-secondary"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;