# Nextcloud Groupfolders UI Patch

A lightweight JavaScript patch for the Nextcloud Files app that improves the integration and usability of Groupfolders. The patch is designed to be loaded through JSONLoader and does **not** modify the Nextcloud or Groupfolders source code.

## Features

### Navigation

- Open **Team folders** by default instead of **All files**.
- Hide the default **All files** navigation entry.
- Reorder the navigation *(optional)*:
  - Team folders
  - Favorites
  - Personal files
- Hide unused navigation entries *(optional)*:
  - Recent
  - Shares

### User Interface

- Keep the **Team folders** navigation entry highlighted while browsing Team folders.
- Remove redundant root breadcrumbs:
  - *Team folders*
  - *All files*

### Compatibility

- Preserve Unified Search functionality.
- No server-side modifications required.
- No changes to Nextcloud or Groupfolders core files.

## Tested with

| Component | Version |
|-----------|---------|
| Nextcloud | 33.0.5 |
| Groupfolders | 21.0.9 |

## Installation

1. Install the JSONLoader app (or any equivalent solution capable of loading custom JavaScript).
2. Use the `groupfolders.js` file from this repository, either:
   - by using its raw GitHub URL, or
   - by copying the script into your JavaScript loader.
3. Configure JSONLoader to load the script.
4. Reload the Files app.

## Configuration

### Core functionality

These changes implement the Team-folder-first workflow and should normally remain unchanged.

- Default Team folders view
- Navigation highlighting
- Unified Search compatibility
- Breadcrumb handling
- Hiding the default **All files** entry

### Optional UI customization

The `applyLayout()` function can be adapted to match your preferred navigation layout.

Examples:

- reorder navigation items
- hide unused navigation entries
- customize the navigation structure

## Why this project?

Groupfolders are often used as the primary workspace within organizations.

This patch provides a cleaner and more intuitive navigation experience while remaining completely client-side and easy to maintain.

## License

MIT License
