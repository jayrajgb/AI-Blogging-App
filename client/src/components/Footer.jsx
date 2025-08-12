import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-secondary/20 px-6 text-sm md:px-16 lg:px-24 xl:px-32">
      <div className="border-mytext/20 text-mytext flex flex-col items-start justify-between gap-10 border-b py-10 md:flex-row">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="mt-6 max-w-[410px] text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            delectus debitis alias earum rerum ratione doloremque voluptas dolor
            consequuntur quae.
          </p>
        </div>
        <div className="flex w-full flex-wrap justify-between gap-5 md:w-[45%]">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="text-mytext mb-2 text-base font-semibold md:mb-4">
                {section.title}
              </h3>
              <ul className="space-y-1 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="transition hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div></div>
      </div>
      <p className="text-mytext py-4 text-center">
        Copyright 2025 &copy; Blogger - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
