const Menuitems = [
  {
    navlabel: true,
    subheader: "DASHBOARDS",
    icon: "mdi mdi-dots-horizontal",
    href: "Dashboard",
  },
  {
    title: "Dashboard",
    icon: "pie-chart",
    href: "/dashboards/dashboard1",
  },
  {
    navlabel: true, 
    subheader: "LINKS",
    icon: "mdi mdi-dots-horizontal",
    href: "Apps",
  },
  {
    title: "My Wallet",
    icon: "message-square",
    href: "/dashboards/wallet",
  },
  {
    title: "Bonus",
    icon: "dollar-sign",
    href: "/dashboards/bonus",
  },
  {
    title: "Buy Airtime",
    icon: "refresh-ccw",
    href: "/dashboards/purchase/airtime",
  },
  {
    title: "Buy Data",
    icon: "refresh-cw",
    href: "/dashboards/purchase/data",
  },
  // {
  //   title: "Services",
  //   icon: "settings",
  //   href: "#",
  // },
  {
    title: "Services",
    icon: "clipboard",
    href: "/dashboards/services",
  },
  {
    title: "My Profile",
    icon: "user",
    href: "/dashboards/profile",
  },
  {
    navlabel: true,
    subheader: "AUTHENTICATION",
    icon: "mdi mdi-dots-horizontal",
    href: "Authentication",
  },
  {
    title: "Log Out",
    icon: "log-out",
    href: "/authentication/login",
  },
];

export default Menuitems;
