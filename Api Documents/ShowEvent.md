**Show Event**
----
  Returns JSON data about a single EventHawk event.

* **URL**

  /events/:id

* **Method:**
  
  GET
 
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "event" : { "name" : "[string]", "description" : "[string]", "time" : "[string]", "location" : "[string]", "current_capacity" : [integer], "total_capacity" : [integer], "interest_rating" : [integer], "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer], "category" : "[string]", "host_id" : "[string]" } }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
