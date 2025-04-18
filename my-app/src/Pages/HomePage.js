import React, { useEffect } from "react";
import { useState } from "react";

import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Accordian from "../Components/Accordian";
import Card from "../Components/Card";
import HomeCard from "../Components/HomeCard";

function HomePage() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      {
        <>
          {/* Favicon*/}
          <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
          {/* Bootstrap icons*/}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
            rel="stylesheet"
          />
          {/* Core theme CSS (includes Bootstrap)*/}
          <link href="css/styles.css" rel="stylesheet" />

          {/* Navigation*/}
          <NavBar></NavBar>

          {/* Header*/}
          {/* <header class="bg-dark py-5">
			<div class="container px-4 px-lg-5 my-5">
				<div class="text-center text-white">
					<h1 class="display-4 fw-bolder">Shop in style</h1>
					<p class="lead fw-normal text-white-50 mb-0">
						With this shop hompeage template
					</p>
				</div>
			</div>
		</header> */}
          <header>
            <div
              id="carouselExampleDark"
              className="carousel carousel-dark slide"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={0}
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={2}
                  aria-label="Slide 3"
                />
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval={10000}>
                  <img
                    src="assets/img/carousel/wedding_diamond.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item" data-bs-interval={2000}>
                  <img
                    src="assets/img/carousel/lovebird_diamond.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="assets/img/carousel/peppa_pig.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </header>
          <div id="but" className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-outline-warning"
              data-bs-toggle="modal"
              data-bs-target="#window"
            >
              Learn about 25% off promotion.
            </button>
          </div>
          <br />
          <br />
          <Accordian/>

          {/* Section*/}
          <HomeCard/>
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <div>Some text</div>
              <div className="dropdown mt-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Dropdown button
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="progress"
            id="progressBar"
            role="progressbar"
            aria-label="Basic example"
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar"
              id="progress-bar"
              style={{ width: "100%" }}
            />
          </div>
          <div className="modal fade" id="window">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">test</h5>
                  <button className="btn-close" data-bs-dismiss="modal" />
                </div>
                <div className="modal-body">test content</div>
              </div>
            </div>
          </div>
          {/* Footer*/}
          <Footer />
          {/* Bootstrap core JS*/}
          {/* Core theme JS*/}
        </>
      }
    </>
  );
}

export default HomePage;
