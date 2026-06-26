export const INTRO_PREFLIGHT_ID = "intro-preflight";

/** Runs before hydration on full homepage loads — activates the server-rendered preflight node. */
export const introBlockScript = `(function(){try{var p=location.pathname.replace(/\\/$/,"")||"/";if(p!=="/")return;var el=document.getElementById("${INTRO_PREFLIGHT_ID}");if(el)el.setAttribute("data-active","")}catch(e){}})();`;

export function isIntroPreflightActive(): boolean {
  if (typeof document === "undefined") return false;
  return (
    document.getElementById(INTRO_PREFLIGHT_ID)?.hasAttribute("data-active") ??
    false
  );
}

export function clearIntroPreflight(): void {
  document.getElementById(INTRO_PREFLIGHT_ID)?.removeAttribute("data-active");
}
