import { routes } from "@/config/routes";
import { DUMMY_ID, DUMMY_ID1 } from "@/config/constants";
import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiCurrencyDollarDuotone,
  PiSquaresFourDuotone,
  PiGridFourDuotone,
  PiFeatherDuotone,
  PiChartLineUpDuotone,
  PiMapPinLineDuotone,
  PiUserGearDuotone,
  PiBellSimpleRingingDuotone,
  PiUserDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiStepsDuotone,
  PiCreditCardDuotone,
  PiTableDuotone,
  PiBrowserDuotone,
  PiHourglassSimpleDuotone,
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
  PiFolderLockDuotone,
  PiBinocularsDuotone,
  PiHammerDuotone,
  PiNoteBlankDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiCalendarPlusDuotone,
  PiEnvelopeDuotone,
  PiCurrencyCircleDollarDuotone,
  PiBriefcaseDuotone,
  PiHouseLineDuotone,
  PiAirplaneTiltDuotone,
  PiFolderNotchDuotone,
  PiCaretCircleUpDownDuotone,
  PiListNumbersDuotone,
  PiCoinDuotone,
  PiUserSquareDuotone,
  PiCurrencyCircleDollarFill,
  PiDoorOpenFill,
  PiPresentationChartFill,
  PiCalendarCheckLight,
  PiHandshake,
  PiMapPinLine,
  PiBuildingsFill,
  PiUsers,
  PiUserGear,
  PiCalendarCheckThin,
  PiTagThin,
  PiFolderUser,
  PiUserFocus,
  PiGifThin,
  PiShieldStarThin,
  PiBookBookmarkBold
} from "react-icons/pi";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: "Resort",
  },
  // label end
  {
    name: "Resort Dashboard",
    href: routes.resort.dashboard,
    icon: <PiPresentationChartFill />,
  },
 
  // label start
  {
    name: "Property Management",
  },
  // label end
  {
    name: "Resorts",
    href: routes.resort.resort,
    icon: <PiBuildingsFill />,
  },
  {
    name: "Room Categories",
    href: routes.resort.roomCategories,
    icon: <PiDoorOpenFill />,
  },
  {
    name: "Inventory",
    href: routes.resort.inventories,
    icon: <PiShoppingCartDuotone />,
  },
  {
    name: "Special rates",
    href: routes.resort.voidDate,
    icon: <PiCurrencyCircleDollarFill />,
  },
  {
    name: "Customers",
  },
  {
    name: "Profiles",
    href: routes.resort.profiles,
    icon: <PiFolderUser />,
  },
  {
    name: "Guests",
    href: routes.resort.guests,
    icon: <PiUserFocus />,
  },
  {
    name: "CRS",
  },
  {
    name: "Booking",
    href: routes.resort.booking,
    icon: <PiBookBookmarkBold />,
  },
  {
    name: "Booking Calendar",
    href: routes.resort.eventCalendar,
    icon: <PiCalendarCheckThin />,
  },
  {
    name: "Setup",
  },
  {
    name: "Geo Location",
    href: routes.resort.geo,
    icon: <PiMapPinLine />,
  },
  {
    name: "Vendor",
    href: routes.resort.vendor,
    icon: <PiHandshake />,
  },
  {
    name: "Complements",
    href: routes.resort.complements,
    icon: <PiGifThin />,
  },
  {
    name: "Promotions",
  },
  {
    name: "Membership",
    href: routes.resort.memberships,
    icon: <PiShieldStarThin />,
  },
  {
    name: "Coupons",
    href: routes.resort.coupons,
    icon: <PiTagThin />,
  },
  {
    name: "Human Resource",
    icon: <PiUserGear />,
  },
  {
    name: "Employees",
    href: routes.resort.employees,
    icon: <PiUsers />,
  },
  {
    name: "Notification Management",
  },
  // label end
  {
    name: "Notifications",
    href: "#",
    icon: <PiDoorOpenFill />,
    dropdownItems: [
      {
        name: "SMS Notifications",
        href: routes.resort.sms,
        badge: "",
      },
      {
        name: "Email Notification",
        href: routes.resort.email,
      },
      {
        name: "Push Notifications",
        href: routes.resort.pushnotification,
      },
    ],
  },
  // label start
  // {
  //   name: "Overview",
  // },
  // // label end
  // {
  //   name: "Aminities",
  //   href: "/aminities",
  //   icon: <PiFolderNotchDuotone />,
  // },
  // {
  //   name: "File Manager",
  //   href: "/",
  //   icon: <PiFolderNotchDuotone />,
  // },
  // {
  //   name: "Executive",
  //   href: routes.executive.dashboard,
  //   icon: <PiBriefcaseDuotone />,
  //   badge: "New",
  // },
  // {
  //   name: "Financial",
  //   href: routes.financial.dashboard,
  //   icon: <PiCurrencyCircleDollarDuotone />,
  //   badge: "New",
  // },
  // {
  //   name: "Logistics",
  //   href: routes.logistics.dashboard,
  //   icon: <PiPackageDuotone />,
  // },
  // {
  //   name: "E-Commerce",
  //   href: routes.eCommerce.dashboard,
  //   icon: <PiShoppingCartDuotone />,
  // },
  // {
  //   name: "Analytics",
  //   href: routes.analytics,
  //   icon: <PiChartBarDuotone />,
  //   badge: "",
  // },
  // {
  //   name: "Support",
  //   href: routes.support.dashboard,
  //   icon: <PiHeadsetDuotone />,
  // },

  // // label start
  // {
  //   name: "Apps Kit",
  // },
  // // label end
  // {
  //   name: "E-Commerce",
  //   href: "#",
  //   icon: <PiShoppingCartDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Products",
  //       href: routes.eCommerce.products,
  //       badge: "",
  //     },
  //     {
  //       name: "Product Details",
  //       href: routes.eCommerce.productDetails(DUMMY_ID),
  //     },
  //     {
  //       name: "Create Product",
  //       href: routes.eCommerce.createProduct,
  //     },
  //     {
  //       name: "Edit Product",
  //       href: routes.eCommerce.ediProduct(DUMMY_ID),
  //     },
  //     {
  //       name: "Categories",
  //       href: routes.eCommerce.categories,
  //     },
  //     {
  //       name: "Create Category",
  //       href: routes.eCommerce.createCategory,
  //     },
  //     {
  //       name: "Edit Category",
  //       href: routes.eCommerce.editCategory(DUMMY_ID),
  //     },
  //     {
  //       name: "Orders",
  //       href: routes.eCommerce.orders,
  //     },
  //     {
  //       name: "Order Details",
  //       href: routes.eCommerce.orderDetails(DUMMY_ID),
  //     },
  //     {
  //       name: "Create Order",
  //       href: routes.eCommerce.createOrder,
  //     },
  //     {
  //       name: "Edit Order",
  //       href: routes.eCommerce.editOrder(DUMMY_ID),
  //     },
  //     {
  //       name: "Reviews",
  //       href: routes.eCommerce.reviews,
  //     },
  //     {
  //       name: "Shop",
  //       href: routes.eCommerce.shop,
  //     },
  //     {
  //       name: "Cart",
  //       href: routes.eCommerce.cart,
  //     },
  //     {
  //       name: "Checkout & Payment",
  //       href: routes.eCommerce.checkout,
  //     },
  //   ],
  // },
  // {
  //   name: "Support",
  //   href: "#",
  //   icon: <PiHeadsetDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Inbox",
  //       href: routes.support.inbox,
  //     },
  //     {
  //       name: "Snippets",
  //       href: routes.support.snippets,
  //     },
  //     {
  //       name: "Templates",
  //       href: routes.support.templates,
  //     },
  //   ],
  // },
  // {
  //   name: "Invoice",
  //   href: "#",
  //   icon: <PiCurrencyDollarDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "List",
  //       href: routes.invoice.home,
  //     },
  //     {
  //       name: "Details",
  //       href: routes.invoice.details(DUMMY_ID),
  //     },
  //     {
  //       name: "Create",
  //       href: routes.invoice.create,
  //     },
  //     {
  //       name: "Edit",
  //       href: routes.invoice.edit(DUMMY_ID),
  //     },
  //   ],
  // },
  // {
  //   name: "Logistics",
  //   href: "#",
  //   icon: <PiPackageDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Shipment List",
  //       href: routes.logistics.shipmentList,
  //     },
  //     {
  //       name: "Shipment Details",
  //       href: routes.logistics.shipmentDetails(DUMMY_ID),
  //     },
  //     {
  //       name: "Create Shipment",
  //       href: routes.logistics.createShipment,
  //     },
  //     {
  //       name: "Edit Shipment",
  //       href: routes.logistics.editShipment(DUMMY_ID),
  //     },
  //     {
  //       name: "Customer Profile",
  //       href: routes.logistics.customerProfile,
  //     },
  //     {
  //       name: "Tracking",
  //       href: routes.logistics.tracking(DUMMY_ID),
  //     },
  //   ],
  // },
  // {
  //   name: "File Manager",
  //   href: routes.file.manager,
  //   icon: <PiFolderNotchDuotone />,
  // },
  // {
  //   name: "Event Calendar",
  //   href: routes.eventCalendar,
  //   icon: <PiCalendarPlusDuotone />,
  // },
  // {
  //   name: "Roles & Permissions",
  //   href: routes.rolesPermissions,
  //   icon: <PiFolderLockDuotone />,
  // },
  // {
  //   name: "Point of Sale",
  //   href: routes.pos.index,
  //   icon: <PiCreditCardDuotone />,
  //   badge: "Update",
  // },
  // // label start
  // {
  //   name: "Search & Filters",
  // },
  // {
  //   name: "Real Estate",
  //   href: routes.searchAndFilter.realEstate,
  //   icon: <PiHouseLineDuotone />,
  // },
  // {
  //   name: "Flight Booking",
  //   href: routes.searchAndFilter.flight,
  //   icon: <PiAirplaneTiltDuotone />,
  //   badge: "Update",
  // },
  // {
  //   name: "NFT",
  //   href: routes.searchAndFilter.nft,
  //   icon: <PiCoinDuotone />,
  // },
  // // label end
  // // label start
  // {
  //   name: "Widgets",
  // },
  // // label end
  // {
  //   name: "Cards",
  //   href: routes.widgets.cards,
  //   icon: <PiSquaresFourDuotone />,
  // },
  // {
  //   name: "Icons",
  //   href: routes.widgets.icons,
  //   icon: <PiFeatherDuotone />,
  // },
  // {
  //   name: "Charts",
  //   href: routes.widgets.charts,
  //   icon: <PiChartLineUpDuotone />,
  // },
  // // {
  // //   name: 'Banners',
  // //   href: routes.widgets.banners,
  // //   icon: <PiImageDuotone />,
  // // },
  // {
  //   name: "Maps",
  //   href: routes.widgets.maps,
  //   icon: <PiMapPinLineDuotone />,
  // },
  // {
  //   name: "Email Templates",
  //   href: routes.emailTemplates,
  //   icon: <PiEnvelopeDuotone />,
  // },
  // // label start
  // {
  //   name: "Forms",
  // },
  // // label end
  // {
  //   name: "Account Settings",
  //   href: routes.forms.profileSettings,
  //   icon: <PiUserGearDuotone />,
  // },
  // {
  //   name: "Notification Preference",
  //   href: routes.forms.notificationPreference,
  //   icon: <PiBellSimpleRingingDuotone />,
  // },
  // {
  //   name: "Personal Information",
  //   href: routes.forms.personalInformation,
  //   icon: <PiUserDuotone />,
  // },
  // {
  //   name: "Newsletter",
  //   href: routes.forms.newsletter,
  //   icon: <PiEnvelopeSimpleOpenDuotone />,
  // },
  // {
  //   name: "Multi Step",
  //   href: routes.multiStep,
  //   icon: <PiStepsDuotone />,
  // },
  // {
  //   name: "Payment Checkout",
  //   href: routes.eCommerce.checkout,
  //   icon: <PiCreditCardDuotone />,
  // },
  // // label start
  // {
  //   name: "Tables",
  // },
  // // label end
  // {
  //   name: "Basic",
  //   href: routes.tables.basic,
  //   icon: <PiGridFourDuotone />,
  // },
  // {
  //   name: "Collapsible",
  //   href: routes.tables.collapsible,
  //   icon: <PiCaretCircleUpDownDuotone />,
  // },
  // {
  //   name: "Enhanced",
  //   href: routes.tables.enhanced,
  //   icon: <PiTableDuotone />,
  // },
  // {
  //   name: "Sticky Header",
  //   href: routes.tables.stickyHeader,
  //   icon: <PiBrowserDuotone />,
  // },
  // {
  //   name: "Pagination",
  //   href: routes.tables.pagination,
  //   icon: <PiListNumbersDuotone />,
  // },
  // {
  //   name: "Search",
  //   href: routes.tables.search,
  //   icon: <PiHourglassSimpleDuotone />,
  // },
  // // label start
  // {
  //   name: "Pages",
  // },
  // {
  //   name: "Profile",
  //   href: routes.profile,
  //   icon: <PiUserCircleDuotone />,
  // },
  // {
  //   name: "Welcome",
  //   href: routes.welcome,
  //   icon: <PiShootingStarDuotone />,
  // },
  // {
  //   name: "Coming soon",
  //   href: routes.comingSoon,
  //   icon: <PiRocketLaunchDuotone />,
  // },
  // {
  //   name: "Access Denied",
  //   href: routes.accessDenied,
  //   icon: <PiFolderLockDuotone />,
  // },
  // {
  //   name: "Not Found",
  //   href: routes.notFound,
  //   icon: <PiBinocularsDuotone />,
  // },
  // {
  //   name: "Maintenance",
  //   href: routes.maintenance,
  //   icon: <PiHammerDuotone />,
  // },
  // {
  //   name: "Blank",
  //   href: routes.blank,
  //   icon: <PiNoteBlankDuotone />,
  // },

  // // label start
  // {
  //   name: "Authentication",
  // },
  // // label end
  // {
  //   name: "Sign Up",
  //   href: "#",
  //   icon: <PiUserPlusDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Modern Sign up",
  //       href: routes.auth.signUp1,
  //     },
  //     {
  //       name: "Vintage Sign up",
  //       href: routes.auth.signUp2,
  //     },
  //     {
  //       name: "Trendy Sign up",
  //       href: routes.auth.signUp3,
  //     },
  //     {
  //       name: "Elegant Sign up",
  //       href: routes.auth.signUp4,
  //     },
  //     {
  //       name: "Classic Sign up",
  //       href: routes.auth.signUp5,
  //     },
  //   ],
  // },
  // {
  //   name: "Sign In",
  //   href: "#",
  //   icon: <PiShieldCheckDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Modern Sign in",
  //       href: routes.auth.signIn1,
  //     },
  //     {
  //       name: "Vintage Sign in",
  //       href: routes.auth.signIn2,
  //     },
  //     {
  //       name: "Trendy Sign in",
  //       href: routes.auth.signIn3,
  //     },
  //     {
  //       name: "Elegant Sign in",
  //       href: routes.auth.signIn4,
  //     },
  //     {
  //       name: "Classic Sign in",
  //       href: routes.auth.signIn5,
  //     },
  //   ],
  // },
  // {
  //   name: "Forgot Password",
  //   href: "#",
  //   icon: <PiLockKeyDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Modern Forgot password",
  //       href: routes.auth.forgotPassword1,
  //     },
  //     {
  //       name: "Vintage Forgot password",
  //       href: routes.auth.forgotPassword2,
  //     },
  //     {
  //       name: "Trendy Forgot password",
  //       href: routes.auth.forgotPassword3,
  //     },
  //     {
  //       name: "Elegant Forgot password",
  //       href: routes.auth.forgotPassword4,
  //     },
  //     {
  //       name: "Classic Forgot password",
  //       href: routes.auth.forgotPassword5,
  //     },
  //   ],
  // },
  // {
  //   name: "OTP Pages",
  //   href: "#",
  //   icon: <PiChatCenteredDotsDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Modern OTP page",
  //       href: routes.auth.otp1,
  //     },
  //     {
  //       name: "Vintage OTP page",
  //       href: routes.auth.otp2,
  //     },
  //     {
  //       name: "Trendy OTP page",
  //       href: routes.auth.otp3,
  //     },
  //     {
  //       name: "Elegant OTP page",
  //       href: routes.auth.otp4,
  //     },
  //     {
  //       name: "Classic OTP page",
  //       href: routes.auth.otp5,
  //     },
  //   ],
  // },
];
