## Configuration

API hosts are configured per environment with `REACT_APP_API_URL`:

- `.env.development` uses the documented backend default at `127.0.0.1:8000`.
- `.env.staging` and `.env.production` contain deployment placeholders that must be replaced with real API hosts.

The API client sends credentials for secure cookie sessions and temporarily supports the existing bearer-token response in `sessionStorage` for backend compatibility. The backend should migrate login to an HttpOnly, Secure, SameSite session cookie and stop returning a reusable token.

PayPal requires these backend endpoints:

- `POST /api/orders/:id/paypal/create` creates an order using backend-calculated amount and stock.
- `POST /api/orders/:id/paypal/capture` captures and verifies the PayPal order server-side, idempotently, then marks the order paid.
- `GET /api/config/paypal` returns the public client ID.

The client refreshes the order from `GET /api/orders/:id` after capture. Browser approval alone never marks an order paid.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
