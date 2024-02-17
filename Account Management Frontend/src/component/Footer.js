import React from "react";

const Footer = () => {
  return (
    <>
      <footer class="py-2 text-center text-black dark:text-darkmuted md:text-left">
        &copy;
        <script>
          var year = new Date(); document.write(year.getFullYear());
        </script>
        Sliced
        <span class="float-right hidden md:inline-block">
          Crafted with
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-4 h-4 inline-block relative -mt-[2px]"
          >
            <path
              d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"
              class="fill-purple"
            ></path>
          </svg>
          by SRBThemes
        </span>
      </footer>
    </>
  );
};

export default Footer;
