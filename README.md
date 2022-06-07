# quanto-api
Restaurant inventory management api

## Goal of the project
REST API to manage the inventory of a small restaurant using MongoDB as NoSQL database. It allows a restaurant owner to create, read and update inventory items and to calculate the inventory value for each of the items or the total inventory value based on the valuation method that has been set for each of the items, i.e. LIFO or FIFO.

When items are being taken from stock, the api will take into consideration the selected valuation method on the iventory item to decide which items it should pick first. This is very important to allow an accurate calculation of the inventory value for accounting purposes.

## Usage

This section describes the various endpoints of the API and their purpose.
