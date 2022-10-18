import React, { FC } from "react";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  social_links: SocialLinks;
}

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6",
  social_links,
}) => {
  const socials = [
    {
      name: "Facebook",
      icon: <i className="text-base sm:text-xl bx bxl-facebook"></i>,
      href: social_links?.facebook_url,
    },
    {
      name: "Twitter",
      icon: <i className="text-base sm:text-xl bx bxl-twitter"></i>,
      href: social_links?.twitter_url,
    },
    {
      name: "Telegram",
      icon: <i className="text-base sm:text-xl bx bxl-telegram"></i>,
      href: social_links?.telegram_url,
    },
    {
      name: "Instagram",
      icon: <i className="text-base sm:text-xl bx bxl-instagram"></i>,
      href: social_links?.instagram_url,
    },
    {
      name: "Website",
      icon: <i className="text-base sm:text-xl bx bx-link"></i>,
      href: social_links?.website_url,
    },
  ];
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 gap-3 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials
        .filter((item) => !!item.href)
        .map((item, i) => (
          <a
            key={i}
            className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer md:w-10 md:h-10 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 ${itemClass}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
          >
            {item.icon}
          </a>
        ))}
    </nav>
  );
};

export default SocialsList;
