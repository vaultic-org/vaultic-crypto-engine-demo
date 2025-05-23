/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SecurityHandlerImport } from './routes/security-handler'
import { Route as EnvImport } from './routes/env'
import { Route as DotEnvImport } from './routes/dot-env'
import { Route as DirectDotEnvImport } from './routes/direct-dot-env'
import { Route as R404Import } from './routes/_404'
import { Route as SecretGameRouteImport } from './routes/secret-game/route'
import { Route as IndexImport } from './routes/index'
import { Route as SecretGameIndexImport } from './routes/secret-game/index'
import { Route as DocumentationIndexImport } from './routes/documentation/index'
import { Route as DemoIndexImport } from './routes/demo/index'
import { Route as DocumentationSectionImport } from './routes/documentation/$section'

// Create/Update Routes

const SecurityHandlerRoute = SecurityHandlerImport.update({
  id: '/security-handler',
  path: '/security-handler',
  getParentRoute: () => rootRoute,
} as any)

const EnvRoute = EnvImport.update({
  id: '/env',
  path: '/env',
  getParentRoute: () => rootRoute,
} as any)

const DotEnvRoute = DotEnvImport.update({
  id: '/dot-env',
  path: '/dot-env',
  getParentRoute: () => rootRoute,
} as any)

const DirectDotEnvRoute = DirectDotEnvImport.update({
  id: '/direct-dot-env',
  path: '/direct-dot-env',
  getParentRoute: () => rootRoute,
} as any)

const R404Route = R404Import.update({
  id: '/_404',
  getParentRoute: () => rootRoute,
} as any)

const SecretGameRouteRoute = SecretGameRouteImport.update({
  id: '/secret-game',
  path: '/secret-game',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SecretGameIndexRoute = SecretGameIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => SecretGameRouteRoute,
} as any)

const DocumentationIndexRoute = DocumentationIndexImport.update({
  id: '/documentation/',
  path: '/documentation/',
  getParentRoute: () => rootRoute,
} as any)

const DemoIndexRoute = DemoIndexImport.update({
  id: '/demo/',
  path: '/demo/',
  getParentRoute: () => rootRoute,
} as any)

const DocumentationSectionRoute = DocumentationSectionImport.update({
  id: '/documentation/$section',
  path: '/documentation/$section',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/secret-game': {
      id: '/secret-game'
      path: '/secret-game'
      fullPath: '/secret-game'
      preLoaderRoute: typeof SecretGameRouteImport
      parentRoute: typeof rootRoute
    }
    '/_404': {
      id: '/_404'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof R404Import
      parentRoute: typeof rootRoute
    }
    '/direct-dot-env': {
      id: '/direct-dot-env'
      path: '/direct-dot-env'
      fullPath: '/direct-dot-env'
      preLoaderRoute: typeof DirectDotEnvImport
      parentRoute: typeof rootRoute
    }
    '/dot-env': {
      id: '/dot-env'
      path: '/dot-env'
      fullPath: '/dot-env'
      preLoaderRoute: typeof DotEnvImport
      parentRoute: typeof rootRoute
    }
    '/env': {
      id: '/env'
      path: '/env'
      fullPath: '/env'
      preLoaderRoute: typeof EnvImport
      parentRoute: typeof rootRoute
    }
    '/security-handler': {
      id: '/security-handler'
      path: '/security-handler'
      fullPath: '/security-handler'
      preLoaderRoute: typeof SecurityHandlerImport
      parentRoute: typeof rootRoute
    }
    '/documentation/$section': {
      id: '/documentation/$section'
      path: '/documentation/$section'
      fullPath: '/documentation/$section'
      preLoaderRoute: typeof DocumentationSectionImport
      parentRoute: typeof rootRoute
    }
    '/demo/': {
      id: '/demo/'
      path: '/demo'
      fullPath: '/demo'
      preLoaderRoute: typeof DemoIndexImport
      parentRoute: typeof rootRoute
    }
    '/documentation/': {
      id: '/documentation/'
      path: '/documentation'
      fullPath: '/documentation'
      preLoaderRoute: typeof DocumentationIndexImport
      parentRoute: typeof rootRoute
    }
    '/secret-game/': {
      id: '/secret-game/'
      path: '/'
      fullPath: '/secret-game/'
      preLoaderRoute: typeof SecretGameIndexImport
      parentRoute: typeof SecretGameRouteImport
    }
  }
}

// Create and export the route tree

interface SecretGameRouteRouteChildren {
  SecretGameIndexRoute: typeof SecretGameIndexRoute
}

const SecretGameRouteRouteChildren: SecretGameRouteRouteChildren = {
  SecretGameIndexRoute: SecretGameIndexRoute,
}

const SecretGameRouteRouteWithChildren = SecretGameRouteRoute._addFileChildren(
  SecretGameRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/secret-game': typeof SecretGameRouteRouteWithChildren
  '': typeof R404Route
  '/direct-dot-env': typeof DirectDotEnvRoute
  '/dot-env': typeof DotEnvRoute
  '/env': typeof EnvRoute
  '/security-handler': typeof SecurityHandlerRoute
  '/documentation/$section': typeof DocumentationSectionRoute
  '/demo': typeof DemoIndexRoute
  '/documentation': typeof DocumentationIndexRoute
  '/secret-game/': typeof SecretGameIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof R404Route
  '/direct-dot-env': typeof DirectDotEnvRoute
  '/dot-env': typeof DotEnvRoute
  '/env': typeof EnvRoute
  '/security-handler': typeof SecurityHandlerRoute
  '/documentation/$section': typeof DocumentationSectionRoute
  '/demo': typeof DemoIndexRoute
  '/documentation': typeof DocumentationIndexRoute
  '/secret-game': typeof SecretGameIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/secret-game': typeof SecretGameRouteRouteWithChildren
  '/_404': typeof R404Route
  '/direct-dot-env': typeof DirectDotEnvRoute
  '/dot-env': typeof DotEnvRoute
  '/env': typeof EnvRoute
  '/security-handler': typeof SecurityHandlerRoute
  '/documentation/$section': typeof DocumentationSectionRoute
  '/demo/': typeof DemoIndexRoute
  '/documentation/': typeof DocumentationIndexRoute
  '/secret-game/': typeof SecretGameIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/secret-game'
    | ''
    | '/direct-dot-env'
    | '/dot-env'
    | '/env'
    | '/security-handler'
    | '/documentation/$section'
    | '/demo'
    | '/documentation'
    | '/secret-game/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/direct-dot-env'
    | '/dot-env'
    | '/env'
    | '/security-handler'
    | '/documentation/$section'
    | '/demo'
    | '/documentation'
    | '/secret-game'
  id:
    | '__root__'
    | '/'
    | '/secret-game'
    | '/_404'
    | '/direct-dot-env'
    | '/dot-env'
    | '/env'
    | '/security-handler'
    | '/documentation/$section'
    | '/demo/'
    | '/documentation/'
    | '/secret-game/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SecretGameRouteRoute: typeof SecretGameRouteRouteWithChildren
  R404Route: typeof R404Route
  DirectDotEnvRoute: typeof DirectDotEnvRoute
  DotEnvRoute: typeof DotEnvRoute
  EnvRoute: typeof EnvRoute
  SecurityHandlerRoute: typeof SecurityHandlerRoute
  DocumentationSectionRoute: typeof DocumentationSectionRoute
  DemoIndexRoute: typeof DemoIndexRoute
  DocumentationIndexRoute: typeof DocumentationIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SecretGameRouteRoute: SecretGameRouteRouteWithChildren,
  R404Route: R404Route,
  DirectDotEnvRoute: DirectDotEnvRoute,
  DotEnvRoute: DotEnvRoute,
  EnvRoute: EnvRoute,
  SecurityHandlerRoute: SecurityHandlerRoute,
  DocumentationSectionRoute: DocumentationSectionRoute,
  DemoIndexRoute: DemoIndexRoute,
  DocumentationIndexRoute: DocumentationIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/secret-game",
        "/_404",
        "/direct-dot-env",
        "/dot-env",
        "/env",
        "/security-handler",
        "/documentation/$section",
        "/demo/",
        "/documentation/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/secret-game": {
      "filePath": "secret-game/route.tsx",
      "children": [
        "/secret-game/"
      ]
    },
    "/_404": {
      "filePath": "_404.tsx"
    },
    "/direct-dot-env": {
      "filePath": "direct-dot-env.tsx"
    },
    "/dot-env": {
      "filePath": "dot-env.tsx"
    },
    "/env": {
      "filePath": "env.tsx"
    },
    "/security-handler": {
      "filePath": "security-handler.tsx"
    },
    "/documentation/$section": {
      "filePath": "documentation/$section.tsx"
    },
    "/demo/": {
      "filePath": "demo/index.tsx"
    },
    "/documentation/": {
      "filePath": "documentation/index.tsx"
    },
    "/secret-game/": {
      "filePath": "secret-game/index.tsx",
      "parent": "/secret-game"
    }
  }
}
ROUTE_MANIFEST_END */
