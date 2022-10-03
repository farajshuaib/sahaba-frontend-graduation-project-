import { SocialType } from "shared/SocialsShare/SocialsShare";
import React, { FC } from "react";
import facebook from "assets/images/socials/facebook.svg";
import twitter from "assets/images/socials/twitter.svg";
import telegram from "assets/images/socials/telegram.svg";
import website from "assets/images/socials/website.svg";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  facebook_url?: string;
  twitter_url?: string;
  telegram_url?: string;
  website_url?: string;
}

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6",
  facebook_url,
  twitter_url,
  telegram_url,
  website_url,
}) => {
  const socials: SocialType[] = [
    { name: "Facebook", icon: facebook, href: facebook_url },
    { name: "Twitter", icon: twitter, href: twitter_url },
    { name: "website", icon: website, href: website_url },
    { name: "Telegram", icon: telegram, href: telegram_url },
  ];
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials
        .filter((item) => !!item.href)
        .map((item, i) => (
          <a
            key={i}
            className={`${itemClass}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
          >
            <img src={item.icon} alt="" />
          </a>
        ))}
    </nav>
  );
};

export default SocialsList;
