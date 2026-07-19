//
// Nextcloud Groupfolders UI Patch
// Tested with:
// - Nextcloud 33.0.5
// - Groupfolders 21.0.9
//

const router = window.OCP?.Files?.Router?.router;

//
// -----------------------------------------------------------------------------
// Core functionality
// -----------------------------------------------------------------------------

// Redirect the default "All files" view to "Team folders" while preserving
// Unified Search and direct file/folder links.
function redirectToTeamFolders() {

    if (
        router &&
        router.currentRoute?.name === "filelist" &&
        router.currentRoute?.params?.view === "files" &&
        !router.currentRoute?.params?.fileid &&
        !router.currentRoute?.query?.openfile &&
        !router.currentRoute?.query?.dir
    ) {

        router.replace({
            name: "filelist",
            params: {
                ...router.currentRoute.params,
                view: "groupfolders",
            },
        });

    }

}

//
// -----------------------------------------------------------------------------
// Optional UI customization
// -----------------------------------------------------------------------------

// Customize the Files navigation.
// Feel free to adapt this function to your preferred layout.
function applyLayout() {

    const files = document.querySelector(
        '[data-cy-files-navigation-item="files"]'
    );

    const teamfolders = document.querySelector(
        '[data-cy-files-navigation-item="groupfolders"]'
    );

    const favorites = document.querySelector(
        '[data-cy-files-navigation-item="favorites"]'
    );

    const personal = document.querySelector(
        '[data-cy-files-navigation-item="personal"]'
    );

    const recent = document.querySelector(
        '[data-cy-files-navigation-item="recent"]'
    );

    const shareoverview = document.querySelector(
        '[data-cy-files-navigation-item="shareoverview"]'
    );

    if (!teamfolders) {
        return;
    }

    const list = teamfolders.parentElement;

    if (!list) {
        return;
    }

    if (list.firstElementChild !== teamfolders) {
        list.prepend(teamfolders);
    }

    if (
        favorites &&
        teamfolders.nextElementSibling !== favorites
    ) {
        teamfolders.after(favorites);
    }

    if (
        personal &&
        favorites &&
        favorites.nextElementSibling !== personal
    ) {
        favorites.after(personal);
    }

    files?.remove();
    recent?.remove();
    shareoverview?.remove();

}

//
// -----------------------------------------------------------------------------
// Core functionality
// -----------------------------------------------------------------------------

// Remove redundant root breadcrumbs displayed when browsing Team folders
// or opening search results.
function applyBreadcrumb() {

    document
        .querySelectorAll(".breadcrumb__crumbs .button-vue__text")
        .forEach(el => {

            const text = el.textContent.trim();

            if (
                text === "Team-Ordner" ||
                text === "Alle Dateien"
            ) {
                el.closest("li.vue-crumb")?.remove();
            }

        });

}

// Keep the Team folders navigation entry highlighted while browsing
// Team folders or redirected "All files" routes.
function applyFocus() {

    const view = router?.currentRoute?.params?.view;

    const teamfolders = document.querySelector(
        '[data-cy-files-navigation-item="groupfolders"]'
    );

    if (!teamfolders) {
        return;
    }

    const entry = teamfolders.querySelector(".app-navigation-entry");
    const link = teamfolders.querySelector("a");

    const active =
        view === "groupfolders" ||
        view === "files";

    teamfolders.classList.toggle(
        "app-navigation-entry--opened",
        active
    );

    entry?.classList.toggle(
        "active",
        active
    );

    if (active) {
        link?.setAttribute("aria-current", "page");
    } else {
        link?.removeAttribute("aria-current");
    }

}

//
// -----------------------------------------------------------------------------
// Apply all patches
// -----------------------------------------------------------------------------

function applyPatches() {

    applyLayout();
    applyBreadcrumb();

    requestAnimationFrame(() =>
        requestAnimationFrame(applyFocus)
    );

}

//
// -----------------------------------------------------------------------------
// Initialization
// -----------------------------------------------------------------------------

redirectToTeamFolders();

applyPatches();

new MutationObserver(applyPatches).observe(document.body, {
    childList: true,
    subtree: true,
});
