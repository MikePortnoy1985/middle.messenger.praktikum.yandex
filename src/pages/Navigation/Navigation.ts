const nav = document.createElement("nav");

const links = [
  { href: "/login", linkTitle: "Login" },
  { href: "/registration", linkTitle: "Registration" },
  { href: "/404", linkTitle: "Page not found" },
  { href: "/500", linkTitle: "Error page" },
  { href: "/chat", linkTitle: "Chat page" },
  { href: "/user-profile", linkTitle: "User profile page" },
  { href: "/user-edit", linkTitle: "User edit page" },
  { href: "/user-edit-password", linkTitle: "User edit password page" },
].map(({ href, linkTitle }) => `<a href="${href}">${linkTitle}</a>`);

export const renderNavigation = () => {
  nav.insertAdjacentHTML("afterbegin", links.join(""));

  return nav;
};
