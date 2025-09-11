"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useQueryParam from "@/utils/use-query-params";

const STORAGE_KEY = "filters";
const DEFAULT_PRICE_RANGE: [number, number] = [0, 500];
const MIN_PRICE = 0;
const MAX_PRICE = 1000;

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

  // -------------------- INIT: URL → STATE OR LOCALSTORAGE --------------------
  useEffect(() => {
    const fromUrl = {
      onSale: searchParams.get("on_sale") === "true",
      minPrice: Number(searchParams.get("min_price")) || DEFAULT_PRICE_RANGE[0],
      maxPrice: Number(searchParams.get("max_price")) || DEFAULT_PRICE_RANGE[1],
      categories: Object.fromEntries(
        (searchParams.get("categories")?.split(",") || []).map((id) => [
          id,
          true,
        ])
      ),
      colors: Object.fromEntries(
        (searchParams.get("colors")?.split(",") || []).map((id) => [id, true])
      ),
      sizes: Object.fromEntries(
        (searchParams.get("sizes")?.split(",") || []).map((id) => [id, true])
      ),
    };

    const hasUrlParams =
      searchParams.get("on_sale") ||
      searchParams.get("min_price") ||
      searchParams.get("max_price") ||
      searchParams.get("categories") ||
      searchParams.get("colors") ||
      searchParams.get("sizes");

    if (hasUrlParams) {
      // ✅ Prefer URL params
      setIsOnSale(fromUrl.onSale);
      setPriceRange([fromUrl.minPrice, fromUrl.maxPrice]);
      setSelectedFilters({
        categories: fromUrl.categories,
        colors: fromUrl.colors,
        sizes: fromUrl.sizes,
      });
    } else {
      // ✅ Fallback to localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setIsOnSale(parsed.isOnSale || false);
          setPriceRange(parsed.priceRange || DEFAULT_PRICE_RANGE);
          setSelectedFilters(
            parsed.selectedFilters || { categories: {}, colors: {}, sizes: {} }
          );
        } catch {
          // ignore broken localStorage
        }
      }
    }
  }, []); // run only once on mount

  // -------------------- STATE → URL + LOCALSTORAGE --------------------
  useEffect(() => {
    const current = searchParams.get("on_sale") || "";
    const next = isOnSale ? "true" : "";
    if (current !== next) {
      updateQueryparams("on_sale", next);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ isOnSale, priceRange, selectedFilters })
    );
  }, [isOnSale]);

  useEffect(() => {
    const currentMin = searchParams.get("min_price") || "";
    const currentMax = searchParams.get("max_price") || "";

    const nextMin = priceRange[0] !== MIN_PRICE ? priceRange[0].toString() : "";
    const nextMax = priceRange[1] !== MAX_PRICE ? priceRange[1].toString() : "";

    if (currentMin !== nextMin) updateQueryparams("min_price", nextMin);
    if (currentMax !== nextMax) updateQueryparams("max_price", nextMax);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ isOnSale, priceRange, selectedFilters })
    );
  }, [priceRange]);

  useEffect(() => {
    const updateFilterParam = (key: "categories" | "colors" | "sizes") => {
      const selected = Object.keys(selectedFilters[key]).filter(
        (id) => selectedFilters[key][id]
      );
      const current = searchParams.get(key) || "";
      const next = selected.length > 0 ? selected.join(",") : "";
      if (current !== next) {
        updateQueryparams(key, next);
      }
    };
    updateFilterParam("categories");
    updateFilterParam("colors");
    updateFilterParam("sizes");

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ isOnSale, priceRange, selectedFilters })
    );
  }, [selectedFilters]);

  // -------------------- CLEAR FUNCTIONS --------------------
  const clearAllFilters = () => {
    setIsOnSale(false);
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSelectedFilters({ categories: {}, colors: {}, sizes: {} });
    clearQueryParam([
      "on_sale",
      "min_price",
      "max_price",
      "categories",
      "colors",
      "sizes",
    ]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const clearCategories = () => {
    setSelectedFilters((prev) => ({ ...prev, categories: {} }));
    clearQueryParam(["categories"]);
  };

  const clearColors = () => {
    setSelectedFilters((prev) => ({ ...prev, colors: {} }));
    clearQueryParam(["colors"]);
  };

  const clearSizes = () => {
    setSelectedFilters((prev) => ({ ...prev, sizes: {} }));
    clearQueryParam(["sizes"]);
  };

  const clearPriceRange = () => {
    setPriceRange(DEFAULT_PRICE_RANGE);
    clearQueryParam(["min_price", "max_price"]);
  };

  const clearOnSale = () => {
    setIsOnSale(false);
    clearQueryParam(["on_sale"]);
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
