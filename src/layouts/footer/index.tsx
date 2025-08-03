import Widgets from "@/layouts/footer/widget";
import Copyright from "@/layouts/footer/copyright";
import { footerSettings } from "@/data/footer-settings";
import React from "react";
import cn from "classnames";
import WidgetSignup from "@/layouts/footer/widget/widget-signup";

const { widgets, payment } = footerSettings;

interface FooterProps {
  variant?: string;
  className?: string;
  showWidgetServices?: boolean;
  showWidgetSubscription?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  variant = "default",
  className,
  showWidgetServices = false,
  showWidgetSubscription = false,
}) => {
  return (
    <footer className={cn("", className)}>
      <WidgetSignup
        variant={variant}
        className="newsletterFooter items-center p-4 pt-10 md:pt-16"
      />
      <Widgets
        widgets={widgets}
        variant={variant}
        showWidgetServices={showWidgetServices}
        showWidgetSubscription={showWidgetSubscription}
      />
      <Copyright payment={payment} variant={variant} />
    </footer>
  );
};

export default Footer;
