# Wiivv - EtsyQuery - NodeJS

This project is a server-side REST API built in NodeJS with Express. Users can query the `/products` endpoint to return a list of featured products from etsy.com.

When specifying a currency parameter, the API will convert the price of each item returned to the desired currency. Currency rates are stored locally and updated on a configurable interval, or on demand by calling the `/updateCurrency` endpoint. 

## Usage

All endpoints listed are open, require no authentication.

### Products

*  `GET /products`
Gets a list of featured products from the Etsy `/featured_treasuries/listings` endpoint. If the `currency` parameter is passed, prices will be converted from their listed currency to the specified currency.

#### Query Parameters
| Name | Required | Default | Type
|--|--|--|--|
|currency|No|None|enum(USD,GBP,CAD,EUR)
|limit|No|10|int
|offset|No|0|int

### Currencies

* `GET /updateCurrency`
Queries the `api.exchangeratesapi.io/latest` endpoint for all required currencies(`USD,GBP,CAD,EUR`) and build that JSON object that is written to a file.

This JSON object contains a timestamp from when the query was performed. When a currency exchange is performed from the `/products` route, this timestamp is checked, if it is more than an hour old, the rates are updated. 

## Configuration

1. Clone repo
2. Run `npm install`
3. Create `config.json` in project root.
4. Run node `server.js` from project root directory.

### `Config.json`:
This repo contains a `config.json.sample` file which outlines a suggested configuration. Any API keys have been omitted from the config sample and would need to be requested from the API provider(Currently only Etsy).

### Testing 
Run: `npm test`
