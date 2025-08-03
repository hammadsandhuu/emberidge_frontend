export const siteNavigation = {
  topmenu: [
    {
      id: 1,
      path: "/account-savelists",
      label: "Wishlist",
    },
    {
      id: 2,
      path: "/checkout",
      label: "Checkout",
    },
  ],
  menu: [
    {
      id: 1,
      path: "/",
      label: "Home",
      type: "home",
    },
    {
      id: 2,
      path: "/",
      label: "Categories",
      type: "mega",
      mega_categoryCol: 5,
      mega_bannerMode: "none",
      mega_bannerImg: "/assets/images/mega/banner-menu.jpg",
      mega_bannerUrl: "/categories",
      mega_contentBottom:
        "<strong>30% Off</strong> the shipping of your first order with the code: <strong>-SALE30</strong>",
      subMenu: [
        {
          id: 1,
          path: "/category",
          label: "Phones & Tablets",
          image: {
            id: 1,
            thumbnail: "/assets/images/category/collection_1.jpg",
            original: "/assets/images/category/collection_1.jpg",
          },
          subMenu: [
            {
              id: 1,
              path: "/category",
              label: "Home Audio",
            },
            {
              id: 2,
              path: "/category",
              label: "Helicopters & Parts",
            },
            {
              id: 3,
              path: "/category",
              label: "Toys & Hobbies",
            },
            {
              id: 4,
              path: "/category",
              label: "Outdoor & Traveling",
            },
            {
              id: 5,
              path: "/category",
              label: "Garden",
            },
          ],
        },
        {
          id: 2,
          path: "/categories",
          label: "Fashion & Clothing",
          image: {
            id: 1,
            thumbnail: "/assets/images/category/collection_2.jpg",
            original: "/assets/images/category/collection_2.jpg",
          },
          subMenu: [
            {
              id: 1,
              path: "/category",
              label: "Automotive",
            },
            {
              id: 2,
              path: "/category",
              label: "Car Audio & Speakers",
            },
            {
              id: 3,
              path: "/category",
              label: "More Car Accessories",
            },
            {
              id: 4,
              path: "/category",
              label: "Car Alarms and Security",
            },
            {
              id: 5,
              path: "/category",
              label: "Battereries & Chargers",
            },
          ],
        },
        {
          id: 3,
          path: "/categories",
          label: "Garden & Kitchen",
          image: {
            id: 1,
            thumbnail: "/assets/images/category/collection_3.jpg",
            original: "/assets/images/category/collection_3.jpg",
          },
          subMenu: [
            {
              id: 1,
              path: "/category",
              label: "Audio & Video",
            },
            {
              id: 2,
              path: "/category",
              label: "Mobiles & Tablets",
            },
            {
              id: 3,
              path: "/category",
              label: "Bath",
            },
            {
              id: 4,
              path: "/category",
              label: "Garden",
            },
            {
              id: 5,
              path: "/category",
              label: "publications",
            },
          ],
        },
        {
          id: 4,
          path: "/categories",
          label: "Grocery",
          image: {
            id: 1,
            thumbnail: "/assets/images/category/collection_4.jpg",
            original: "/assets/images/category/collection_4.jpg",
          },
          subMenu: [
            {
              id: 1,
              path: "/category",
              label: "Battereries & Chargers",
            },
            {
              id: 2,
              path: "/category",
              label: "Headphones, Headsets",
            },
            {
              id: 3,
              path: "/category",
              label: "Accessories",
            },
            {
              id: 4,
              path: "/category",
              label: "Jewelry & Watches",
            },
            {
              id: 5,
              path: "/category",
              label: "Wedding Rings",
            },
          ],
        },
        {
          id: 5,
          path: "/categories",
          label: "TV & Video",
          image: {
            id: 1,
            thumbnail: "/assets/images/category/collection_5.jpg",
            original: "/assets/images/category/collection_5.jpg",
          },
          subMenu: [
            {
              id: 1,
              path: "/category",
              label: "Men Watches",
            },
            {
              id: 2,
              path: "/category",
              label: "Woman Watches",
            },
            {
              id: 3,
              path: "/category",
              label: "Gift Certificates",
            },
            {
              id: 4,
              path: "/category",
              label: "Gift for Man",
            },
            {
              id: 5,
              path: "/category",
              label: "Gift for Woman",
            },
          ],
        },
      ],
    },
    {
      id: 6,
      path: "/blog",
      label: "Blog",
    },
    {
      id: 7,
      path: "/contact-us",
      label: "Contact Us",
    },
  ],
};
