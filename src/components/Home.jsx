import Product from "./Product";
import About from "./About";
// build homepage online shop
export default function HomePage() {
  return (
    <>
      <div className="relative bg-base-200 py-18 flex flex-col justify-between">
        {/* HERO CONTENT */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl text-center">
            {/* Breadcrumb */}
            <div className="flex justify-center mb-6">
              <div className="breadcrumbs text-sm">
                <ul>
                  <li>
                    <a className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      Home page
                    </a>
                  </li>
                  <li>
                    <a className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                      products
                    </a>
                  </li>
                  <li>
                    <span className="inline-flex items-center gap-2 font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                     About
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Title */}
            <h1 className="heading-logo text-7xl md:text-6xl font-extrabold mb-4">
              Welcome to our stores!
            </h1>

            {/* Description */}
            <p className="text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>

            {/* Button */}
            <button className="btn btn-primary px-8">Get Started</button>
          </div>
        </div>
      </div>
      <Product />
      <About />
    </>
  );
}
