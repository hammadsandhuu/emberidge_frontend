import cn from "classnames";
import { colorMap } from "@/data/color-settings";
import { Category } from "@/services/types";
import { usePanel } from "@/hooks/use-panel";

const DesktopTabs = ({
  childrenData,
  activeTab,
  onNavClick,
}: {
  childrenData: Category[];
  activeTab: string | null;
  onNavClick: (slug: string) => void;
}) => {
  const { selectedColor } = usePanel();

  return (
    <div className="ltabs-tabs-wrap flex flex-wrap justify-end xl:basis-[70%]">
      <ul className="flex text-sm">
        {childrenData.slice(0, 4).map((currentItem, idx) => (
          <li
            className={`ps-2 ${
              activeTab === currentItem.slug
                ? "text-skin-primary"
                : "text-fill-base "
            }`}
            key={`${idx}`}
          >
            <button
              onClick={() => onNavClick(currentItem.slug)}
              className={cn(
                "px-4 py-2 rounded-full",
                activeTab === currentItem.slug
                  ? `${colorMap[selectedColor].bg} text-brand-light`
                  : `text-gray-700 ${colorMap[selectedColor].hoverLink}`
              )}
            >
              {currentItem.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DesktopTabs;
