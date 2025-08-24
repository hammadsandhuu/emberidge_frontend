import Container from "@/components/shared/container";
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import BestSidebarFeed from "@/components/product/feeds/best-seller-sidebar-feed";
import LatestblogSidebar from "@/components/blog/latestblog-sidebar";
import NewSidebarFeed from "@/components/product/feeds/new-sidebar-feed";
import BestDealsFeed from "@/components/product/feeds/best-deals-feed";
import { homeThreeHeroCarousel as bannerHeroCarousel } from "@/components/banner/data";
import { homeThreeHeroSlider as heroSlider } from "@/components/hero/data";
import ServiceFeature from "@/components/common/service-featured";
import { fetchCategories } from "@/services/category/get-all-categories";
import CategoriesSection from "@/components/product/listingtabs/categories-section";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <>
      <Container variant={"Large"}>
        <div className="grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(65%,_1fr)_1fr] 2xl:grid-cols-[minmax(68%,_1fr)_1fr]">
          <HeroSliderBlock
            heroBanner={heroSlider}
            showHeroContent={false}
            className={`lg:mb-7`}
            contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 xs:min-h-[150px] md:min-h-[320px] xl:min-h-[380px] 2xl:min-h-[448px]"
          />
          <BannerGrid
            data={bannerHeroCarousel}
            grid={1}
            className="mb-7 staticBanner--slider"
            girdClassName={"xl:gap-6"}
          />
        </div>
        <ServiceFeature />
      </Container>

      <Container variant={"Large"}>
        <div className="grid grid-cols-12 gap-4 xl:gap-8">
          {/* Main Content */}
          <div className="maincontent-right col-span-12 order-1 lg:order-2 lg:col-span-9 2xl:col-span-10">
            <BestDealsFeed />
            <CategoriesSection initialCategories={categories} />
          </div>

          {/* Sidebar */}
          <div className="maincontent-left col-span-12 order-2 lg:order-1 lg:col-span-3 2xl:col-span-2">
            <BestSidebarFeed />
            <NewSidebarFeed className="mb-0" />
            <LatestblogSidebar />
          </div>
        </div>
      </Container>
    </>
  );
}
