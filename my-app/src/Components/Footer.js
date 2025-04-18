import React from "react";

function Footer() {
  return (
    <div className="container-fluid p-0"> {/* Use container-fluid for full-width */}
      <footer className="py-5 bg-dark">
        <div className="container"> {/* You can keep this for inner content centering */}
          <p className="m-0 text-center text-white">
            Copyright © Jewelry shop 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
