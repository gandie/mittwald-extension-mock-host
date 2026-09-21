# Mittwald Extension Mock Host

This project is a lightweight local host for testing Mittwald mStudio extension frontend fragments without having to run the full mStudio application.

It is useful when you are developing a fragment that is meant to be embedded in mStudio and want to validate the UI, rendering behavior, and communication flow in isolation. Instead of launching the whole product shell, this app starts a small React host that loads a remote extension URL inside a `RemoteRenderer` and provides the mock bridge configuration expected by the extension runtime.

## Purpose

The mock host simulates the environment an extension fragment expects from mStudio:

- it renders the extension in an iframe-like remote host
- it provides mock values for session and installation metadata
- it lets you point the host at any extension frontend URL for local testing

This allows you to test extension frontend fragments quickly and independently, for example while developing against a locally served or tunneled extension build.

## How it works

The app in `src/App.jsx` exposes an input field for an extension URL and passes it to the Mittwald remote renderer. The host also provides a minimal mock bridge implementation with values such as:

- extensionId
- extensionInstanceId
- sessionId
- userId
- appInstallationId
- customerId
- projectId
- session token

This is enough to let the remote extension render as if it were running inside mStudio.

## Requirements

- Node.js 18+
- npm

## Installation

From the project root, install dependencies:

```bash
npm install
```

## Running the mock host

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually something like:

```text
http://localhost:5173
```

In the app, enter the URL of the extension frontend you want to test and let the host load it.

## Typical workflow

1. Start the extension frontend you want to test locally or via a tunnel.
2. Start this mock host with `npm run dev`.
3. Enter the extension URL in the input field.
4. Validate the fragment as it renders and behaves in the mock mStudio environment.

## Production build

To create a production bundle:

```bash
npm run build
```

You can then preview it with:

```bash
npm run preview
```

## Notes

- This is intentionally a testing host, not a full mStudio environment.
- The default URL in the app is just a convenient placeholder and can be replaced with whatever frontend fragment you are debugging.
- You can modify the mock configuration in `src/App.jsx` if your extension expects additional metadata or behavior.
