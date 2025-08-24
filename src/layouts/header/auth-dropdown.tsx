"use client";

import React, { useCallback, useRef } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { User, ShoppingBag, Heart, HelpCircle, LogOut } from "lucide-react";
import AccountIcon from "@/components/icons/account-icon";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { useModal } from "@/hooks/use-modal";
import { useUI } from "@/hooks/use-UI";
import { useLogoutMutation } from "@/services/auth/use-logout";
import { useCurrentUserQuery } from "@/services/customer/use-current-user";
import Cookies from "js-cookie";
import cn from "classnames";

interface UserDropdownProps {
  hideLabel?: boolean;
}

export default function AuthDropdown({ hideLabel }: UserDropdownProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { openModal } = useModal();
  const { isAuthorized } = useUI();
  const { mutate: logout } = useLogoutMutation();
  const { data: currentUser, refetch } = useCurrentUserQuery();
  const isLoggedIn = isAuthorized ?? !!Cookies.get("auth_token");

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  // Login handler
  const handleLogin = useCallback(() => {
    openModal("LOGIN_VIEW");
  }, [openModal]);

  if (!isLoggedIn) {
    return (
      <button
        className={cn(
          "hidden lg:flex items-center focus:outline-none group",
          hideLabel ? "" : "text-sm font-normal"
        )}
        onClick={handleLogin}
      >
        <div
          className={cn(
            "cart-button w-11 h-11 flex justify-center items-center rounded-full border-2 border-brand-light/20 group-hover:border-primary-500"
          )}
        >
          <AccountIcon className="w-5 h-5 text-primary-500" />
        </div>
        {!hideLabel && (
          <span className="text-sm font-normal ms-2">Sign in</span>
        )}
      </button>
    );
  }

  // Menu configuration
  const mainMenu = [
    {
      icon: <User className="w-5 h-5" />,
      label: "My Account",
      action: () => router.push(ROUTES.ACCOUNT),
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "My Orders",
      action: () => router.push(ROUTES.ORDERS),
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Wishlist",
      action: () => router.push(ROUTES.SAVELISTS),
    },
  ];

  const footerMenu = [
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help" },
    {
      icon: <LogOut className="w-5 h-5" />,
      label: "Log out",
      action: handleLogout,
    },
  ];

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            ref={buttonRef}
            className="hidden lg:flex items-center focus:outline-none group"
          >
            <div
              className={cn(
                "cart-button w-11 h-11 flex justify-center items-center rounded-full border-2 group-hover:border-primary-500",
                open ? "border-primary-500" : "border-brand-light/20"
              )}
            >
              <AccountIcon className="w-5 h-5 text-primary-500" />
            </div>
            {!hideLabel && (
              <span className="text-sm font-normal ms-2">My Account</span>
            )}
          </PopoverButton>

          <PopoverPanel
            transition
            className="absolute end-0 z-10 mt-4 w-70 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition duration-200 ease-in-out"
          >
            <div className="pt-4">
              <UserProfile user={currentUser} />
              <div className="py-1">
                {mainMenu.map((item) => (
                  <MenuItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    onClick={item.action}
                  />
                ))}
              </div>
              <div className="border-t border-gray-400 py-1">
                {footerMenu.map((item) => (
                  <MenuItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    onClick={item.action}
                  />
                ))}
              </div>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="flex items-center w-full px-4 py-3 text-sm text-body hover:bg-gray-50 hover:text-primary-500"
      onClick={onClick}
    >
      <span className="me-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function UserProfile({
  user,
}: {
  user?: { avatar?: string; name?: string; email?: string };
}) {
  return (
    <div className="flex items-center gap-3 px-4 pb-4 border-b border-gray-400">
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user?.name || "User"}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 flex items-center justify-center rounded-full border bg-gray-200 text-gray-700 font-medium">
          <AccountIcon className="w-6 h-6" />
        </div>
      )}
      <div>
        <h3 className="font-medium text-brand-dark">{user?.name}</h3>
        <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
      </div>
    </div>
  );
}
