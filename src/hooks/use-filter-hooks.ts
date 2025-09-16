"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useQueryParam from "@/utils/use-query-params";

const STORAGE_KEY = "filters";
const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const DEFAULT_PRICE_RANGE: [number, number] = [MIN_PRICE, MAX_PRICE];

export const useFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams, clearQueryParam } = useQueryParam(pathname || "/");

  // -------------------- STATES --------------------
  const [isOnSale, setIsOnSale] = useState(false);
  const [priceRange, setPriceRange] =
    useState<[number, number]>(DEFAULT_PRICE_RANGE);
  const [selectedFilters, setSelectedFilters] = useState<{
    categories: Record<string, boolean>;
    colors: Record<string, boolean>;
    sizes: Record<string, boolean>;
  }>({
    categories: {},
    colors: {},
    sizes: {},
  });

  const [sectionsOpen, setSectionsOpen] = useState({
    categories: true,
    colors: true,
    sizes: true,
    price: true,
  });

  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  // -------------------- INIT: RESTORE FROM LOCALSTORAGE --------------------
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (typeof parsed.isOnSale === "boolean") {
          setIsOnSale(parsed.isOnSale);
        }
        if (
          Array.isArray(parsed.priceRange) &&
          parsed.priceRange.length === 2
        ) {
          setPriceRange(parsed.priceRange as [number, number]);
        }
        if (parsed.selectedFilters) {
          setSelectedFilters(parsed.selectedFilters);
        }
      } catch (e) {
        console.error("Failed to parse filters from storage:", e);
      }
    }
  }, []);

  // -------------------- STATE → URL + LOCALSTORAGE --------------------
  useEffect(() => {
    const current = searchParams.get("on_sale") || "";
    const next = isOnSale ? "true" : "";
    if (current !== next) updateQueryparams("on_sale", next);

    persistFilters();
  }, [isOnSale]);

  useEffect(() => {
    const currentMin = searchParams.get("min_price") || "";
    const currentMax = searchParams.get("max_price") || "";

    const nextMin = priceRange[0] === MIN_PRICE ? "" : priceRange[0].toString();
    const nextMax = priceRange[1] === MAX_PRICE ? "" : priceRange[1].toString();

    if (currentMin !== nextMin) updateQueryparams("min_price", nextMin);
    if (currentMax !== nextMax) updateQueryparams("max_price", nextMax);

    persistFilters();
  }, [priceRange]);

  useEffect(() => {
    // Handle categories
    const selectedCats = Object.keys(selectedFilters.categories).filter(
      (slug) => selectedFilters.categories[slug]
    );

    // Clear category params first
    clearQueryParam(["parent", "child"]);

    if (selectedCats.length > 0) {
      // Find parent categories (those that have subcategories selected)
      const parentCats = selectedCats.filter((slug) => {
        // This logic depends on your category structure
        // You might need to adjust this based on how you identify parent vs child categories
        return true; // Placeholder - adjust as needed
      });

      // Find child categories
      const childCats = selectedCats.filter(
        (slug) => !parentCats.includes(slug)
      );

      if (parentCats.length > 0) {
        updateQueryparams("parent", parentCats.join(","));
      }
      if (childCats.length > 0) {
        updateQueryparams("child", childCats.join(","));
      }
    }

    // Handle colors and sizes
    const updateFilterParam = (key: "colors" | "sizes") => {
      const selected = Object.keys(selectedFilters[key]).filter(
        (id) => selectedFilters[key][id]
      );
      const current = searchParams.get(key) || "";
      const next = selected.length > 0 ? selected.join(",") : "";
      if (current !== next) updateQueryparams(key, next);
    };

    updateFilterParam("colors");
    updateFilterParam("sizes");

    persistFilters();
  }, [selectedFilters]);

  // -------------------- HELPERS --------------------
  const persistFilters = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ isOnSale, priceRange, selectedFilters })
    );
  };

  const resetState = () => {
    setIsOnSale(false);
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSelectedFilters({ categories: {}, colors: {}, sizes: {} });
  };

  // -------------------- CLEAR FUNCTIONS --------------------
  const clearAllFilters = () => {
    resetState();
    clearQueryParam([
      "on_sale",
      "min_price",
      "max_price",
      "parent",
      "child",
      "colors",
      "sizes",
    ]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const clearCategories = () => {
    setSelectedFilters((prev) => ({ ...prev, categories: {} }));
    clearQueryParam(["parent", "child"]);
    persistFilters();
  };

  const clearColors = () => {
    setSelectedFilters((prev) => ({ ...prev, colors: {} }));
    clearQueryParam(["colors"]);
    persistFilters();
  };

  const clearSizes = () => {
    setSelectedFilters((prev) => ({ ...prev, sizes: {} }));
    clearQueryParam(["sizes"]);
    persistFilters();
  };

  const clearPriceRange = () => {
    setPriceRange(DEFAULT_PRICE_RANGE);
    clearQueryParam(["min_price", "max_price"]);
    persistFilters();
  };

  const clearOnSale = () => {
    setIsOnSale(false);
    clearQueryParam(["on_sale"]);
    persistFilters();
  };

  // -------------------- TOGGLE HANDLERS --------------------
  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategoryExpand = (id: string) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFilterChange = (
    section: "categories" | "colors" | "sizes",
    id: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [section]: { ...prev[section], [id]: checked },
    }));
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  // -------------------- RETURN --------------------
  return {
    isOnSale,
    setIsOnSale,
    sectionsOpen,
    toggleSection,
    selectedFilters,
    handleFilterChange,
    priceRange,
    handlePriceRangeChange,
    expandedCategories,
    toggleCategoryExpand,
    clearAllFilters,
    clearCategories,
    clearColors,
    clearSizes,
    clearPriceRange,
    clearOnSale,
    MIN_PRICE,
    MAX_PRICE,
  };
};
