import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button>
        <Link to="/">Go back to Home</Link>
      </Button>
    </section>
  );
}
