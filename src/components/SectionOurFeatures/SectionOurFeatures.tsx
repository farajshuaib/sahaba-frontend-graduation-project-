import React, { FC } from "react";
import rightImg from "assets/images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "py-14",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
      <div className="flex-shrink-0 max-w-2xl mb-10 lg:mb-0 lg:pl-16 lg:w-2/5">
        <span className="text-sm tracking-widest text-gray-400 uppercase">
          BENnefits
        </span>
        <h2 className="mt-5 text-4xl font-semibold">Happening cities </h2>

        <ul className="mt-16 space-y-10">
          <li className="space-y-4">
            <Badge name="Advertising" />
            <span className="block text-xl font-semibold">
              Cost-effective advertising
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              With a free listing, you can advertise your rental with no upfront
              costs
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Exposure " />
            <span className="block text-xl font-semibold">
              Reach millions with Chisfis
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Millions of people are searching for unique places to stay around
              the world
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Secure" />
            <span className="block text-xl font-semibold">
              Secure and simple
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              A Holiday Lettings listing gives you a secure and easy way to take
              bookings and payments online
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
