import React, { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { GiToothbrush } from "react-icons/gi";
import {
  FaBath,
  FaCat,
  FaChevronDown,
  FaDog,
  FaHome,
  FaPaw,
} from "react-icons/fa";
import Image from "next/image";
import { PiDogFill, PiScissors } from "react-icons/pi";
import Link from "next/link";

const ItemWithFadeIn = ({
  item,
  dropdownItem,
  handleToggleOpen,
  children,
  i,
  action,
  openItems,
}) => {
  const [itemsVisible, setItemsVisible] = useState(false);

  useEffect(() => {
    const delay = 1000 * i; // Delay between each item appearance (in ms)
    const timeout = setTimeout(() => {
      setItemsVisible(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [i]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (action === "expand") {
      handleToggleOpen(item.name);
    }
  };

  const NestedItemWithFadeIn = ({ nestedItem, handleToggleOpen, index }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const delay = 1000 * index;
      const timeout = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timeout);
    }, [index]);

    return (
      <div
        key={nestedItem.name}
        className={`pl-4 ${isVisible ? "fade-in active" : "fade-in"}`}
        onClick={(e) => {
          e.stopPropagation();
          if (nestedItem.dropdown) {
            handleToggleOpen(nestedItem.name);
          }
        }}
      >
        {nestedItem.dropdown ? (
          <div className="cursor-pointer">
            {nestedItem.name}
            {openItems.includes(nestedItem.name) &&
              renderNestedDropdown(nestedItem.dropdown)}
          </div>
        ) : (
          <a
            href={nestedItem.href}
            className="block text-gray-400 hover:bg-black/80 hover:text-white transition-all duration-200 px-3 py-2 rounded-md text-base font-medium"
          >
            - {nestedItem.name}
          </a>
        )}
      </div>
    );
  };

  const renderNestedDropdown = (nestedItems) => {
    return nestedItems.map((nestedItem, nestedIndex) => (
      <NestedItemWithFadeIn
        key={nestedIndex}
        nestedItem={nestedItem}
        handleToggleOpen={handleToggleOpen}
        index={nestedIndex}
      />
    ));
  };

  return (
    <div
      key={item.slug}
      className={`mx-auto flex flex-co ${
        itemsVisible ? "fade-in active" : "fade-in"
      }`}
      onClick={handleClick}
    >
      {action === "expand" && children}
      {action === "Link" && <a href={item.href}>{children}</a>}
      {/* Render nested dropdown if it exists */}
      {item.dropdown &&
        dropdownItem &&
        openItems.includes(dropdownItem.name) &&
        renderNestedDropdown(item.dropdown)}
    </div>
  );
};

// Placeholder JSON data for navigation
const navigationData = [
  {
    name: "Services",
    dropdown: [
      {
        name: "Bath",
        dropdown: [
          {
            name: "Our bath package includes: massaging shampoo, conditioning treatment, blowout, brush out, deshed if needed, nail trim, nail file, ear clean, and vanilla berry perfume",
            href: "/",
          },
        ],
      },
      {
        name: "Tidy Up",
        dropdown: [
          {
            name: "Our tidy up package includes: massaging shampoo, conditioning treatment, blowout, brush out, deshed if needed, nail trim, nail file, ear clean, pawpad shave, scissoring of the body, sanitary shave, and berry perfume",
            href: "/stylist",
          },
        ],
      },
      {
        name: "Nail Trim",
        dropdown: [
          {
            name: "hello",
            href: "/somepage",
          },
        ],
      },
      {
        name: "Full Grooms",
        dropdown: [
          {
            name: "hello",
            href: "/stylist",
          },
        ],
      },
      {
        name: "Cats",
        dropdown: [
          {
            name: "hello",
            href: "/",
          },
        ],
      },
      {
        name: "Extras",
        dropdown: [
          {
            name: "hello",
            href: "/",
          },
        ],
      },
    ],
  },
  {
    name: "Whos the stylist",
    href: "/stylist",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [openItems, setOpenItems] = useState([]);

  const handleToggleOpen = (itemName) => {
    setOpenItems((currentOpenItems) => {
      if (currentOpenItems.includes(itemName)) {
        return currentOpenItems.filter((item) => item !== itemName);
      } else {
        return [...currentOpenItems, itemName];
      }
    });
  };

  const renderNestedDropdown = (nestedItems) => {
    return nestedItems.map((nestedItem, nestedIndex) => (
      <ItemWithFadeIn
        key={nestedIndex}
        item={nestedItem}
        dropdownItem={nestedItem}
        handleToggleOpen={handleToggleOpen}
        i={nestedIndex}
        action={nestedItem.dropdown ? "expand" : "link"}
        openItems={openItems}
      >
        <a
          href={nestedItem.href}
          className="text-gray-300 hover:bg-black/80 hover:text-white transition-all duration-200 px-3 py-2 rounded-md text-base font-medium flex flex-row"
        >
          {nestedItem.name}
          {nestedItem.dropdown && (
            <FaChevronDown
              className={`my-auto ml-4 transition-all duration-100 ${
                openItems.includes(nestedItem.name) && "rotate-12"
              }`}
            />
          )}
        </a>
      </ItemWithFadeIn>
    ));
  };

  return (
    <Disclosure as="nav" className="custom-navbar">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-fill px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button and company logo */}
              <div className="relative inset-y-0 left-0 flex h-[50px] items-center">
                {/* Mobile menu button */}
                <Disclosure.Button className="flex">
                  <Image
                    alt="Logo"
                    src="/smalllogo.png"
                    className="h-8 w-8"
                    height={32}
                    width={32}
                  />
                </Disclosure.Button>
                <Link href="/" className="text-4xl my-auto h-full self-center flex">
                  <FaHome className="text-pink-600" />
                </Link>
              </div>

              {/* Nav Items */}
              <div className="hidden sm:ml-6 md:block">
                <div className="flex space-x-4">
                  {/* Desktop */}
                  {navigationData.map((navItem, navIndex) => (
                    <Menu
                      as="div"
                      className="relative inline-block text-left"
                      key={navItem.name}
                    >
                      <div className="flex">
                        {navItem.href ? (
                          <a
                            href={navItem.href}
                            className={classNames(
                              "text-pink-400 rounded-md px-3 py-2 text-[1rem] xl:text-lg font-large capitalize"
                            )}
                          >
                            {navItem.name}
                          </a>
                        ) : (
                          <Menu.Button
                            className={classNames(
                              "text-pink-400 rounded-md px-2 py-2 text-[1rem] xl:text-lg font-medium capitalize"
                            )}
                          >
                            {navItem.name}
                          </Menu.Button>
                        )}
                      </div>

                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute left-[50%] translate-x-[-50%] mt-5 w-[300px] origin-top-left rounded-md bg-black/80 shadow-lg shadow-black/80 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {navItem.dropdown &&
                            navItem.dropdown.map((dropdownItem, i) => (
                              <Fragment key={dropdownItem.name}>
                                <Menu.Item>
                                  {({ active }) =>
                                    dropdownItem.href ? (
                                      <a
                                        href={dropdownItem.href}
                                        className={classNames(
                                          active ? "bg-black/80" : "",
                                          "block px-4 py-2 text-sm text-gray-100 rounded-md hover:bg-black/90 transition-all duration-200 hover:no-underline"
                                        )}
                                      >
                                        {dropdownItem.name}
                                      </a>
                                    ) : (
                                      <div
                                        onClick={(e) => [
                                          e.stopPropagation(),
                                          handleToggleOpen(dropdownItem.name),
                                        ]}
                                        className={classNames(
                                          active ? "bg-black/80" : "",
                                          "cursor-pointer  px-4 py-2 text-gray-100 text-xl rounded-md hover:bg-black/90 transition-all duration-200 flex flex-row"
                                        )}
                                      >
                                        {dropdownItem.name}{" "}
                                        <FaChevronDown
                                          className={`my-auto ml-auto transition-all duration-100 ${
                                            openItems.includes(
                                              dropdownItem.name
                                            ) && "rotate-12 "
                                          }`}
                                        />
                                      </div>
                                    )
                                  }
                                </Menu.Item>
                                {dropdownItem.dropdown &&
                                  openItems.includes(dropdownItem.name) &&
                                  dropdownItem.dropdown.map(
                                    (subDropdownItem) => (
                                      <Menu.Item key={subDropdownItem.name}>
                                        {({ active }) => (
                                          <div
                                            className={classNames(
                                              active ? "bg-black/80" : "",
                                              "ml-4 cursor-pointer block px-4 py-2 text-sm text-gray-100 rounded-md hover:bg-black/90 transition-all duration-200"
                                            )}
                                          >
                                            <a href={subDropdownItem.href}>
                                              {subDropdownItem.name}
                                            </a>
                                          </div>
                                        )}
                                      </Menu.Item>
                                    )
                                  )}
                              </Fragment>
                            ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ))}
                </div>
              </div>

              {/* CTA button */}
              <div className="rounded-lg px-3 py-3">
                <div className="flex items-center bg-clip-text bg-white">
                  <a
                    href=""
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-pretty font-semibold rounded-xl hover:scale-110"
                    style={{
                      background: "-webkit-linear-gradient(#9999, #555);",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Request Appointment
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* mobile */}
              {navigationData.map((navItem, i) => (
                <ItemWithFadeIn
                  key={navItem.name}
                  item={navItem}
                  handleToggleOpen={handleToggleOpen}
                  i={i}
                  action={navItem.dropdown ? "expand" : "link"}
                  openItems={openItems}
                >
                  <div key={navItem.name} className="py-1">
                    <Disclosure.Button
                      className={classNames(
                        navItem.current
                          ? "bg-black/[.85] text-white"
                          : "text-gray-300 hover:bg-black/80 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                      )}
                      aria-haspopup={navItem.dropdown ? "true" : undefined}
                      onClick={(e) => {
                        if (!navItem.href) {
                          e.stopPropagation();
                          e.preventDefault();
                          handleToggleOpen(navItem.name);
                        }
                      }}
                    >
                      {navItem.href ? (
                        <a href={navItem.href}>{navItem.name}</a>
                      ) : (
                        <span className="flex flex-row">
                          {navItem.name}
                          <FaChevronDown
                            className={`my-auto ml-4 transition-all duration-100 ${
                              openItems.includes(navItem.name) && "rotate-12"
                            }`}
                          />
                        </span>
                      )}
                    </Disclosure.Button>

                    {navItem.dropdown && openItems.includes(navItem.name) && (
                      <div className="pl-4">
                        {navItem.dropdown.map((dropdownItem, i) => (
                          <ItemWithFadeIn
                            key={dropdownItem.name}
                            item={dropdownItem}
                            dropdownItem={dropdownItem}
                            handleToggleOpen={handleToggleOpen}
                            i={i}
                            action={dropdownItem.dropdown ? "expand" : "link"}
                            openItems={openItems}
                          >
                            <a
                              href={dropdownItem.href}
                              className=" text-gray-300 hover:bg-black/20 hover:text-white transition-all duration-200 px-3 py-2 rounded-md text-base font-medium flex flex-row"
                            >
                              {dropdownItem.name}
                              {dropdownItem.dropdown && (
                                <FaChevronDown
                                  className={`my-auto ml-4 transition-all duration-100 ${
                                    openItems.includes(dropdownItem.name) &&
                                    "hover:rotate-12"
                                  }`}
                                />
                              )}
                            </a>
                          </ItemWithFadeIn>
                        ))}
                      </div>
                    )}
                  </div>
                </ItemWithFadeIn>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}