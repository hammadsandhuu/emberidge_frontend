"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { siteNavigation } from "@/data/navigation-settings";
import { useUI } from "@/hooks/use-UI";
import { useActiveScroll } from "@/utils/use-active-scroll";

import Container from "@/components/shared/container";
import Logo from "@/components/shared/logo";
import Text from "@/components/shared/text";
import MenuIcon from "@/components/icons/menu-icon";
import SearchIcon from "@/components/icons/search-icon";
import Search from "@/components/top-search/search";
import cn from "classnames";
import { FiMenu } from "react-icons/fi";

import MainMenu from "@/layouts/header/main-menu";
import HeaderMenutop from "@/layouts/header/header-menutop";

import CategoryDropdownNav from "@/components/category/category-dropdown-nav";
import { MainMenuType } from "@/services/types";

const AuthDropdown = dynamic(() => import("@/layouts/header/auth-dropdown"), {
  ssr: false,
});
const CartButton = dynamic(() => import("@/layouts/header/cart-button"), {
  ssr: false,
});

interface HeaderProps {
  className?: string;
  variant?: string;
}

const Header: React.FC<HeaderProps> = ({ className, variant }) => {
  const { openSidebar, displaySearch, openSearch, displayMobileSearch } =
    useUI();
  const siteHeaderRef = useRef<HTMLDivElement>(null);
  const [toggleAllCategory, setToggleAllCategory] = useState(false);

  useActiveScroll(siteHeaderRef as React.RefObject<HTMLElement>);

  function handleMobileMenu() {
    return openSidebar();
  }

  function handleCategoryMenu() {
    setToggleAllCategory(!toggleAllCategory);
  }

  return (
    <>
      <header
        id="siteHeader"
        ref={siteHeaderRef}
        className={cn(
          "header-one sticky-header sticky top-0 z-50 lg:relative w-full bg-fill-one",
          displayMobileSearch && "active-mobile-search",
          className
        )}
      >
        <div
          className={cn(
            "innerSticky z-20 w-full transition duration-200 ease-in-out body-font",
            { "bg-fill-one text-brand-light": variant === "home5" }
          )}
        >
          {/* 🔹 Top Bar */}
          <Search
            searchId="mobile-search"
            className="topbar-search hidden lg:max-w-[600px] absolute z-30 px-4 md:px-6 top-12 xl:top-1"
          />
          <div className="top-bar text-13px text-gray-300 dark:text-gray-700 border-b border-brand-light/8">
            <Container variant={"Large"}>
              <div className="h-12 flex justify-between items-center">
                <Text
                  className="hidden md:block truncate m-0 text-13px"
                  variant={"small"}
                >
                  Free International Shipping. No Minimum Purchase Required*
                </Text>
                <div className="flex flex-shrink-0 smx-auto pace-s-5">
                  <HeaderMenutop
                    data={siteNavigation.topmenu}
                    className="flex transition-all duration-200 ease-in-out"
                    classNameLink="text-gray-300 dark:text-gray-700 hover:text-primary-500"
                  />
                </div>
              </div>
            </Container>
          </div>

          {/* 🔹 Main Header */}
          <div className="border-b border-brand-light/8">
            <Container variant={"Large"}>
              <div className="flex items-center justify-between py-2 md:py-5">
                {/* Mobile Menu Button */}
                <div className="relative flex-shrink-0 lg:hidden">
                  <button
                    aria-label="Menu"
                    className="bg-fill-one text-brand-light rounded focus:outline-none flex-shrink-0 text-sm px-2.5 md:px-3 lg:px-[18px] py-2.5 md:py-2.5 lg:py-3 flex items-center transition-all"
                    onClick={handleMobileMenu}
                  >
                    <MenuIcon />
                  </button>
                </div>

                {/* Logo */}
                <Logo variant={"dark"} className="logo ps-3 md:ps-0 lg:mx-0" />

                {/* Desktop Search */}
                <Search
                  searchId="top-search"
                  variant={"dark"}
                  className="hidden lg:flex lg:max-w-[450px] xl:max-w-[650px] 2xl:max-w-[900px] lg:mx-10"
                />

                {/* Auth & Cart */}
                <div className="text-brand-light flex text-sm space-x-5 xl:space-x-10 lg:max-w-[33%] xl:min-w-[240px]">
                  <AuthDropdown />
                  <CartButton className="hidden lg:flex" />
                </div>
              </div>
            </Container>
          </div>

          {/* 🔹 Navbar */}
          <div className="hidden navbar lg:block bg-fill-one">
            <Container variant={"Large"}>
              <div className="flex justify-between items-center">
                <Logo
                  variant={"dark"}
                  className="navbar-logo w-0 opacity-0 transition-all duration-200 ease-in-out"
                />

                {/* 🔹 Shop by Department Button */}
                {/* <div className="categories-header-button relative me-8 flex-shrink-0 w-72">
                  <button
                    className="text-brand-light rounded-t min-h-[50px] focus:outline-none w-full uppercase font-medium px-[18px] py-4 flex items-center bg-primary-500 hover:bg-primary-600 transition"
                    onClick={handleCategoryMenu}
                  >
                    <FiMenu className="text-2xl me-3" />
                    Shop by Department
                  </button>
                  {toggleAllCategory && <CategoryDropdownNav />}
                </div> */}
                <div
                  className="categories-header-button relative me-8 flex-shrink-0 w-72"
                  onMouseEnter={() => setToggleAllCategory(true)}
                  onMouseLeave={() => setToggleAllCategory(false)}
                >
                  <button className="text-brand-light rounded-t min-h-[50px] focus:outline-none w-full uppercase font-medium px-[18px] py-4 flex items-center bg-primary-500 hover:bg-primary-600 transition">
                    <FiMenu className="text-2xl me-3" />
                    Shop by Department
                  </button>
                  {toggleAllCategory && <CategoryDropdownNav />}
                </div>

                {/* 🔹 Main Menu */}
                <MainMenu
                  navigations={siteNavigation.menu as MainMenuType[]}
                  className="flex transition-all duration-200 ease-in-out"
                  classLink="md:text-brand-light group-hover:text-primary-500"
                />

                {/* 🔹 Search Overlay */}
                {displaySearch && (
                  <div className="sticky-search w-full absolute top-0 left-0 px-4 flex items-center justify-center h-full">
                    <Search className="max-w-[780px] xl:max-w-[830px]" />
                  </div>
                )}

                {/* 🔹 Right Side */}
                <div className="text-brand-light ms-auto flex items-center xl:min-w-[200px] flex-shrink-0">
                  <div className="navbar-right flex items-center w-0 opacity-0">
                    <button
                      type="button"
                      aria-label="Search Toggle"
                      onClick={() => openSearch()}
                      title="Search toggle"
                      className="outline-none me-2 xl:me-6 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-primary-500"
                    >
                      <SearchIcon className="w-[24px] h-[24px] text-base" />
                    </button>
                    <div className="flex-shrink-0 flex items-center">
                      <AuthDropdown hideLabel />
                    </div>
                    <CartButton hideLabel className="ms-5 xl:ms-8" />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </header>

      {/* 🔹 Category Menu Overlay */}
      {toggleAllCategory && (
        <div
          className="shadow_bkg_show fixed w-full h-full inset-0 bg-black/60 z-40 backdrop-blur-xs"
          onClick={handleCategoryMenu}
        ></div>
      )}
    </>
  );
};

export default Header;
