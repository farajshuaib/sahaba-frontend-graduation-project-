import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import Avatar from "shared/Avatar/Avatar";
import { onMessageListener } from "firebase";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "app/hooks";
import notificationSound from "assets/notification-alert.mp3";
import { setNotifications, setNotificationsLength } from "app/general/reducers";

const solutions = [
  {
    name: "Eden Tuan",
    description: "Measure actions your users take",
    time: "3 minutes ago",
    href: "##",
  },
  {
    name: "Leo Messi",
    description: "Create your own targeted content",
    time: "1 minute ago",
    href: "##",
  },
  {
    name: "Leo Kante",
    description: "Keep track of your growth",
    time: "3 minutes ago",
    href: "##",
  },
];

export default function NotifyDropdown() {
  const audio = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.general.notifications);
  const notificationsLength = useAppSelector(
    (state) => state.general.notificationsLength
  );
  onMessageListener()
    .then(async (payload: any) => {
      const promise = audio.current?.play();
      if (promise !== undefined) {
        promise
          .then((_) => {
            // Autoplay started!
          })
          .catch((error) => {
            console.log("error playing notifications sound", error);
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
          });
      }
      // set notification data on the notification section of the store and update the notifications length
      dispatch(setNotifications([...notifications, payload.data]));
      dispatch(setNotificationsLength(notificationsLength + 1));
    })
    .catch((err) => console.log("failed: ", err));

  useEffect(() => {
    if (!("Notification" in window)) {
      toast.warn("your browser doesn't support notifications");
    } else {
      Notification.requestPermission();
    }
  }, []);

  const requestNotificationPermission = () => {
    localStorage.clear();
    window.open(
      "https://support.google.com/chrome/answer/3220216?hl=ar&co=GENIE.Platform%3DAndroid"
    );
  };
  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                 group  p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
            >
              <span className="absolute w-2 h-2 bg-blue-500 rounded-full top-2 right-2"></span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 6.43994V9.76994"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M15.33 18.8201C15.33 20.6501 13.83 22.1501 12 22.1501C11.09 22.1501 10.25 21.7701 9.65004 21.1701C9.05004 20.5701 8.67004 19.7301 8.67004 18.8201"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </svg>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-xs px-4 mt-3 sm:max-w-sm -right-28 sm:right-0 sm:px-0">
                <div className="overflow-hidden shadow-lg rounded-2xl ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7">
                    <h3 className="text-xl font-semibold">Notifications</h3>
                    {solutions.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="relative flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <Avatar sizeClass="w-8 h-8 sm:w-12 sm:h-12" />
                        <div className="ml-3 space-y-1 sm:ml-4">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                            {item.description}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-400">
                            {item.time}
                          </p>
                        </div>
                        <span className="absolute w-2 h-2 transform -translate-y-1/2 bg-blue-500 rounded-full right-1 top-1/2"></span>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <audio ref={audio} controls={false}>
        <source src={notificationSound} type="audio/mp3"></source>
      </audio>
    </div>
  );
}
