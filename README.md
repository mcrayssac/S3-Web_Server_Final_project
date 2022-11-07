# S3-Web_Server_Final_project : A REST API project with Node.js, Express and Handlebars

## *What is this project ?* 
&nbsp;&nbsp;&nbsp;&nbsp;In this project, we created a REST API with NodeJS to serve data from a JSON database.

## *What is the database ?*
&nbsp;&nbsp;&nbsp;&nbsp;The database to be used in this project is a JSON file that contains information about Nobel Prizes and Nobel Laureates.

## *Tasks to do :*
* Create a new NodeJS project.  
* Create a REST API using the RCS or RCSM template.  
  * RCS: Routers - Controllers - Services
  * RCSM: Routers - Controllers - Services - Models  
* Try to refer to work done in the first three weeks to structure your application.  
  * Week 1: Read/Write to a file  
  * Week 2: Express + RCS  
  * Week 3: Express + RCSM  
* Create the API entry point, routers, controllers and services (ormodels). Be careful that you can have multiple routers. Think of the number of entities that this JSON document contains.  

## *API must provide the following features :*
* F1: List all winners (id, first name, last name).
  * Consider paging.
  * Watch out for duplicates
* F2: Given an identifier, display the winner's information with this identifier (first name, last name).
* F3: Count the number of prizes offered.
  * Please note that there have been years when no Nobel Prize has been awarded.
  * Please note that the number of prizes offered is not the same as the number of winners. For example in 2021, 13 people have won Nobel Prizes in Chemistry, Physics, Economics, Peace, medicine and literature. The number of prizes must be 6 (one for each category) and not 13.
* F4: Count the number of laureates who received nobel prizes.
  * Watch out for duplicates!!
* F5: How many have won more than one Nobel Prize?
  * (first name, last name, number of prizes won)
  * Ex: Marie Curie, 2
* F6: List all Nobel Prize categories
  * Chemistry, economics, etc.
* F7: Determine which category produced the highest number of Nobel laureates.
* F8: For each year, indicate how many winners had won a Nobel Prize.
  * Ex: 2021, 13
* F9: For a given winner ID, display the prizes won (first name, last name, year, category and motivation).
  * Ex: ID = 6
  * Marie Curie
  * 1911 chemistry in recognition of her services to the…
  * 1903 physics in recognition of the extraordinary services…
* F10: Display all years in which no Nobel Prize was awarded been awarded.
* F11: Display all nobel prize years sorted by number of ascending/descending laureates.
  * ?sort=+laureates ⇒ ascending ⇒ start with years with the smallest number of winners
  * ?sort=-laureates ⇒ descending ⇒ start with years with most winners
  * Exclude years when no Nobel Prize was awarded
* F12: From first name, or last name, or category, display all winners that match the filter.
  * We should be able to filter by different fields.
* F13: Delete a laureate with a given identifier in a year given and a given category.
* F14: Update the motivation of a winner with a given identifier in a given year and a given category.
* F15: Add a new winner to a given year and category given.
  * If both first and last name exist, use the existing recipient ID. Otherwise, create a new unique identifier (ex: max(id) + 1).

## *Documentation :*
&nbsp;&nbsp;&nbsp;&nbsp;Add Swagger documentation to all F1-F15 features. Dedicate the `/api-docs` route for Swagger documentation.

## *Views :*
* Create a model (template) using Handlebars or EJS, in which there is a drop-down list with all categories filled in. When the user chooses a category from the list, display all Nobel laureates in this category (first name, last name, year).
* Create a template using Handlebars or EJS with a form where you can create a new winner for a given year and category.
  * If the first and last name exist, use the existing awardee ID. Otherwise, create a new unique identifier (ex: max(id) + 1).
  * Consider validation middleware.
    * Consider validation middleware.





