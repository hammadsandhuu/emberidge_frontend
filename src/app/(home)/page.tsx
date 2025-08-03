import { Metadata } from "next";

import Container from "@/components/shared/container";
import HeroSliderBlock from "@/components/hero/hero-slider-block";
import BannerGrid from "@/components/banner/banner-grid";
import BestSidebarFeed from "@/components/product/feeds/best-seller-sidebar-feed";
import LatestblogSidebar from "@/components/blog/latestblog-sidebar";
import NewSidebarFeed from "@/components/product/feeds/new-sidebar-feed";
import Testimonial from "@/components/collection/testimonial";
import BestDealsFeed from "@/components/product/feeds/best-deals-feed";
import BrandCarousel from "@/components/brand/brand-carousel";
import GridBaseCarousel from "@/components/collection/grid-base-carousel";
import ListingElectronic from "@/components/product/listingtabs/listing-electronic";
import ListingFashion from "@/components/product/listingtabs/listing-fashion";
import { homeThreeHeroCarousel as bannerHeroCarousel } from "@/components/banner/data";
import {
  homeGridHero as gridHero,
  homeTwoGridHero2 as gridHero2,
  homeTwoSidebar as heroSidebar,
} from "@/components/banner/data";
import { homeThreeHeroSlider as heroSlider } from "@/components/hero/data";
import ListingCellPhone from "@/components/product/listingtabs/listing-cellphone";
import ListingComputer from "@/components/product/listingtabs/listing-computer";
import SuppercategoryElectronic from "@/components/product/suppercategory/suppercategory-electronic";
import SuppercategoryCloth from "@/components/product/suppercategory/suppercategory-cloth";
import ServiceFeature from "@/components/common/service-featured";

export const metadata: Metadata = {
  title: "Emberidge",
};

export default async function Page() {
  return (
    <>
      <Container variant={"Large"}>
        <div className="grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(65%,_1fr)_1fr] 2xl:grid-cols-[minmax(68%,_1fr)_1fr]">
          <HeroSliderBlock
            heroBanner={heroSlider}
            showHeroContent={false}
            className={`lg:mb-7 `}
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
          <div className="maincontent-left col-span-12 lg:col-span-3 2xl:col-span-2">
            <BannerGrid
              data={heroSidebar}
              grid={1}
              className="relative mb-8 lg:mb-10"
            />
            <BestSidebarFeed />
            <LatestblogSidebar />
            <NewSidebarFeed />
            <Testimonial />
          </div>
          <div className="maincontent-right col-span-12  lg:col-span-9 2xl:col-span-10">
            <BestDealsFeed />
            <SuppercategoryCloth />
            <BannerGrid
              data={gridHero2}
              grid={2}
              className="mb-8 "
              girdClassName="xl:gap-6 xl:grid-cols-[minmax(654px,_1fr)_1fr] 2xl:grid-cols-[minmax(935px,_1fr)_1fr] "
            />
            <SuppercategoryElectronic />
            <ListingCellPhone variant={"outBorder"} showBanner={"left"} />
            <ListingComputer variant={"outBorder"} showBanner={"right"} />
            <GridBaseCarousel />
          </div>
        </div>
      </Container>
    </>
  );
}
