## Next.js
- React.js full-stack framework for web-development
- In addition to building UI, next.js also provides features like routing, rendering, optimization, data fetching, etc.
- It uses react server component
- Opinionated framework(file, folder conventions)

## Features
1. Routing:file based routing
2. Rendering:Server-side rendering (ssr), client-side rendering(csr), static site generation(ssg)
3. Optimization : Image, files
4. Data fetching/file system
4. ApI routes
5. Styling

## React server component

### 1. Server component(default)
- All react component in Next.js are server component by default
- Server side tasks like data fetching, files read, database data fetching, async tasks.
- Cannot use react hooks, events, user interaction 

### 2. Client component
- Can use react hooks, event user interaction
- Traditional react components
- Use the directive `use client` at the top of component file

## Routing
- File based routing
- All routes must be inside `src/app` directory
- Every route must have `page.js` or `page.tsx` file
- `page.js` or `page.tsx` must have a default export

1. simple routes
- create a folder inside/src/app/ and add a page.js files

- /src/app/about/page.js
- /src/app/contact/page.js

## 2. Nested routes
- create a folder inside folder for nested router
- /src/app/courses/frontend/react/page.js
- /src/app/courses/frontend/next/page.js
- /src/app/courses/frontend/express/page.js

 ## 3. Dynamic routes
 - Create a folder enclosed by []
 - /src/app/products/[id]/page.js

 ## Nested Dynamic routes
 -/src/app/products/[id]/reviews/[reviewId]/page.js

## Catch all segments
- /src/app/blogs/[...slug]/page.js

## private folders
-/src/app/_folder/

## route groups
- /src/app/(auth)


## Layouts
- UI component that is shared among different pages
- `layout.js` or `layout.tsx`

## Special files of Next.js
- page.js
- layout.js
- not-found.js
- loading.js
- error.js // always client component

## Link
- <Link> for navigation, similar to <a>
- For programmatic navigation, use the `useRouter` hook.

## Params & SearchParams
1. for server component
- params: dynamic route params, available on page.js & layout.js
- searchParams: query available on page.js

2. for client component
- useParams()
- useSearchParams()

## Metadata
- Metadata api is used to define metadata of the page
- page.js / layout.js
- Useful of search engine optimization (SEO)
- static: metadata
- dynamic: generateMetadata

## Rendering: SSR, CSR, SSG
- Process of converting/transforming component code into UI.
- Client side rendering (CSR) and server side rendering (SSR)
- Static site generation (SSG) are generated during app build
- Note : Components are server side rendered in Next.js, and client side rendered in React.js


## CSR
- iF rendering id done in browser->CSR


## SSR
- If rendering is done in server -> SSR


## Client component
-  Interactivity
- Event, User interaction
- State management
- TO make client component, `use client ` directive
- client components can be both CSR OR SSR
 
 ## Server component
- Fetch data from API
- Send API request
- Metadata
- By default, all components in Next.js are server component
- Only SSR

## Products cart
- Cart are locally stored in state
- No need for auth to add products to cart
- Needs auth for checkout products (create order)

## Products orders
- Products list are added to cart with quantity
- A total price is calculated(price of products + discount + external charges + tax)
- All the products, with total price 