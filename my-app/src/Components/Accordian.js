import React from "react";

function Accordian() {
  return (
    <div id="accordionContainer" className="d-flex justify-content-center mb-5">
      <div className="accordion w-75" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
            >
              Why choose us?
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse">
            <div className="accordion-body">because you should</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
            >
              How do we make sure our products meet high standards?
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse">
            <div className="accordion-body">don't ask</div>
          </div>
        </div>
      </div>

      <div className="mb-5"></div>
    </div>
  );
}

export default Accordian;
