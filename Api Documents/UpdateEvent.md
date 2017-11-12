**Update Event**
----
  Update a single EventHawk event.

* **URL**

  /events/:id

* **Method:**
  
  PUT

* **Headers:**

  `Content-Type: application/json`

  `Authorization: Bearer [token]`

*  **URL Params**

   **Required:**
 
   `id=[string]`
 
* **Data Params**

   **Required:**
 
   `{ "event" : { <one_or_more_optional> } }`
   
   **Optional:**
   
   `{ "name" : "[string]" }`<br/>
   `{ "description" : "[string]" }`<br/>
   `{ "time" : "[string]" }`<br/>
   `{ "location" : "[string]" }`<br/>
   `{ "current_capacity" : [integer] }`<br/>
   `{ "total_capacity" : [integer] }` <br/>
   `{ "category" : "[string]" }`<br/>

* **Success Response:**

  * **Code:** 202 ACCEPTED <br />
    **Content:** `{ "event" : { "name" : "[string]", "description" : "[string]", "time" : "[string]", "location" : "[string]", "current_capacity" : [integer], "total_capacity" : [integer], "interest_rating" : [integer], "category" : "[string]", "host_id" : "[string]" } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
