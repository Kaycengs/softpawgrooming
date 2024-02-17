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
import { textAlign, textStyle } from "styled-system";
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
      className={`mx-auto flex flex-col ${
        itemsVisible ? "fade-in active" : "fade-in"
      }`}
      onClick={handleClick}
    >
      {action === "expand" && children}
      {action === "link" && <a href={item.href}>{children}</a>}
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
            name: "Our bath package includes: massaging shampoo, conditioning treatment, blowout, brush out, deshed if needed, nail trim, nail file, ear clean, and vanilla berry perfume ",
            href: "",
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
            href: "",
          },
        ],
      },
      {
        name: "Extras",
        dropdown: [
          {
            name: "hello",
            href: "",
          },
        ],
      },
    ],
  },

  ,
  ,
  ,
  {
    name: "Whos the stylist",
    href: "/stylist",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [expandDropdown, setExpandDropdown] = useState(
    navigationData.map((navItem) =>
      navItem.dropdown ? new Array(navItem.dropdown.length).fill(false) : []
    )
  );
  const [isOpen, setOpen] = useState(false);
  const handleNavOpen = (isOpen) => {
    setOpen(isOpen);
  };
  const [openItems, setOpenItems] = useState([]);

  const handleToggleOpen = (itemName) => {
    setOpenItems((currentOpenItems) => {
      if (currentOpenItems.includes(itemName)) {
        // Remove the item if it's already in the array
        return currentOpenItems.filter((item) => item !== itemName);
      } else if (currentOpenItems.length === 0) {
        // If there are no items, add the new one
        return [itemName];
      } else if (currentOpenItems.length === 1) {
        // If there's only one item, add the new one alongside it
        return [...currentOpenItems, itemName];
      } else {
        // If there are two or more items, replace the last item
        return [currentOpenItems[0], itemName];
      }
    });
  };

  const [expandedDropdown, setExpandedDropdown] = useState(null);

  const handleDropdownToggle = (dropdownName) => {
    if (expandedDropdown === dropdownName) {
      setExpandedDropdown(null); // Close if it's already open
    } else {
      setExpandedDropdown(dropdownName); // Open the clicked dropdown
    }
  };

  const handleDropdownClick = (navIndex, dropdownIndex) => {
    setExpandDropdown(
      expandDropdown.map((subArray, idx) => {
        if (idx === navIndex) {
          const newSubArray = [...subArray];
          newSubArray[dropdownIndex] = !newSubArray[dropdownIndex];
          return newSubArray;
        }
        return subArray;
      })
    );
  };
  return (
    <Disclosure
      as="nav"
      className="custom-navbar bg-[#922098] absolute z-[1000] align-center transition-all duration-1000 h-fit top-0 left-0 right-0 shadow-xl shadow-pink-600"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-fill px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button and company logo */}
              <div className="relative inset-y-2 left-0 flex h-[50px] items-center ">
                {/* Mobile menu button */}
                <Disclosure.Button className="hover:rotate-12 duration-700 flex">
                  <Image
                    alt="Logo"
                    src="/smalllogo.png"
                    className="mx-auto"
                    height={1}
                    width={100}
                  />
                </Disclosure.Button>
                <Link
                  className="hover:rotate-12 duration-700 text-4xl my-auto h-full self-center flex"
                  href="/"
                >
                  {" "}
                  <FaHome className=" text-gray-400" />{" "}
                  <span className="sr-only">Open main menu</span>
                </Link>
              </div>

              {/* Nav Items */}
              <div className="hidden sm:ml-6 md:block">
                <div className="flex space-x-4 mobile-menu-button">
                  {/* Desktop */}
                  {navigationData.map((navItem, navIndex) => (
                    <Menu
                      as="div"
                      className="relative inline-block text-left"
                      key={navItem.name}
                    >
                      <div className="flex right-0">
                        {" "}
                        {/* Add flex alignment styles here */}
                        {navItem.href ? (
                          <Link
                            href={navItem.href}
                            className={classNames(
                              "text-pink-400 hover:hue-rotate-12 transition-all duration-700",
                              "rounded-md px-3 py-2 text-[1rem] xl:text-lg font-large capitalize"
                            )}
                          >
                            {navItem.name}
                          </Link>
                        ) : (
                          <Menu.Button
                            className={classNames(
                              "text-pink-400 hover:hue-rotate-12 transition-all duration-700",
                              "rounded-md px-2 py-2 text-[1rem] xl:text-lg font-medium capitalize"
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
                        <Menu.Items className="absolute left-[50%] translate-x-[-50%] mt-5 w-[300px] origin-top-left rounded-md bg-black/80 shadow-lg shadow-black/80 ring-1 ring-black ring-opacity-5 focus:outline-none.">
                          {navItem.dropdown &&
                            navItem.dropdown.map((dropdownItem, i) => (
                              <Fragment key={dropdownItem.name}>
                                <Menu.Item>
                                  {({ active }) =>
                                    dropdownItem.href ? (
                                      <Link
                                        href={dropdownItem.href}
                                        className={classNames(
                                          active ? "bg-black/80" : "",
                                          "block px-4 py-2 text-sm text-gray-100 rounded-md hover:bg-black/90 transition-all duration-200 hover:no-underline"
                                        )}
                                      >
                                        {dropdownItem.name}
                                      </Link>
                                    ) : (
                                      <div
                                        onClick={(e) => [
                                          [
                                            e.preventDefault(),
                                            handleDropdownToggle(
                                              dropdownItem.name,
                                              e
                                            ),
                                          ],
                                        ]}
                                        className={classNames(
                                          active ? "bg-black/80" : "",
                                          "cursor-pointer  px-4 py-2  text-gray-100 text-xl rounded-md hover:bg-black/90 transition-all duration-200 flex flex-row"
                                        )}
                                      >
                                        {dropdownItem.name}{" "}
                                        {i == 0 ? (
                                          <FaBath
                                            className={`my-auto ml-auto transition-all duration-100 ${
                                              expandedDropdown ===
                                                dropdownItem.name &&
                                              "rotate-12 "
                                            }`}
                                          />
                                        ) : i == 1 ? (
                                          <PiScissors
                                            className={`my-auto ml-auto transition-all duration-100 ${
                                              expandedDropdown ===
                                                dropdownItem.name &&
                                              "rotate-12 "
                                            }`}
                                          />
                                        ) : i == 2 ? (
                                          <FaPaw
                                            className={`my-auto ml-auto transition-all duration-100 ${
                                              expandedDropdown ===
                                                dropdownItem.name &&
                                              "rotate-12 "
                                            }`}
                                          />
                                        ) : i == 3 ? (
                                          <FaDog
                                            className={`my-auto ml-auto transition-all duration-100 ${
                                              expandedDropdown ===
                                                dropdownItem.name &&
                                              "rotate-12 "
                                            }`}
                                          />
                                        ) : i == 4 ? (
                                          <FaCat
                                            className={`my-auto ml-auto transition-all duration-100 ${
                                              expandedDropdown ===
                                                dropdownItem.name &&
                                              "rotate-12 "
                                            }`}
                                          />
                                        ) : (
                                          <GiToothbrush
                                            className={`my-auto ml-auto transition-all duration-100 ${
                                              expandedDropdown ===
                                                dropdownItem.name &&
                                              "rotate-12 "
                                            }`}
                                          />
                                        )}
                                      </div>
                                    )
                                  }
                                </Menu.Item>
                                {dropdownItem.dropdown &&
                                  expandedDropdown === dropdownItem.name &&
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
                                            <Link href={subDropdownItem.href}>
                                              {subDropdownItem.name}
                                            </Link>
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
              <div className=" scale-125 rounded-lg px-3 py-3 CTA-hide transition-all duration-400">
                <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0 bg-clip-text bg-white  ">
                  <Link
                    href=""
                    className="scale-x-100 scale-y-100 inline-flex items-center justify-center px-4 py-2 border border-transparent text-pretty font-semibold rounded-xl hover:scale-110 duration-700"
                    style={{
                      background: "-webkit-linear-gradient(#9999, #555);",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Request Appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className={` mobile-menu-hide`}>
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
                          [
                            e.stopPropagation(),
                            e.preventDefault(),
                            handleToggleOpen(navItem.name),
                          ]; // Ensure correct order of arguments
                        }
                      }}
                    >
                      {navItem.href ? (
                        <Link
                          href={navItem.href}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {navItem.name}
                        </Link>
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
                            <Link
                              href={dropdownItem.href}
                              className=" text-gray-300 hover:bg-black/80 hover:text-white transition-all duration-200 px-3 py-2 rounded-md text-base font-medium flex flex-row"
                            >
                              {dropdownItem.name}
                              {dropdownItem.dropdown && (
                                <FaChevronDown
                                  className={`my-auto ml-4 transition-all duration-100 ${
                                    openItems.includes(dropdownItem.name) &&
                                    "rotate-12 "
                                  }`}
                                />
                              )}
                            </Link>
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
