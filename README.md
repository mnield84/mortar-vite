# Mortar IO Vite Project

This project is built using Vite, React, and Tailwind CSS. It's designed to visualize coordinates on a map, provided by the Mortar IO API, with functionality to zoom into specific continents and display markers with geolocation information.

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Installation

To get the project up and running on your local machine, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/mortar-io-vite-project.git
   cd mortar-io-vite-project
   npm install
   npm run dev
   ```

## Improvement Notes

Having more time I would improve the following:

- The colour coding feature is pretty basic. I've used a caluculation to work out how close the coords are to the Equartor to apply the coloured markers. If had more time I would have used the bounding box key that is returned from the geolocation api call to calculate the area and apply colours to those areas that way.
- The initial map view before selecting a region, I would have a clusters feature here to indicate there are more than 1 marker in this location and I'd like to make an onclick feature here that once the user clicks on the cluster they are zoomed to the region.
- Have more specific error messages that are more userful.
- More user friendly UI, for example refresh buttons after error, logo being a link.
- Apply accessability.

Outside of the scope but would like to have implimented a mock server to handle an auth flow and apply some prefetching so the user doesn't need to wait for the server to respond
