export function isNavChildActive(pathname: string, child: { href: string; exact?: boolean }): boolean {
  if (!child.exact) return isNavItemActive(pathname, child.href);
  // trailingSlash: true means pathname may be "/products/" for href "/products".
  return pathname.replace(/\/+$/, "") === child.href.replace(/\/+$/, "");
}

export function isNavItemActive(
  pathname: string,
  href: string,
  children?: { href: string }[]
): boolean {
  if (pathname === href) return true;

  if (
    children?.some(
      (child) =>
        pathname === child.href || pathname.startsWith(`${child.href}/`)
    )
  ) {
    return true;
  }

  if (href !== "/" && pathname.startsWith(`${href}/`)) return true;

  return false;
}
