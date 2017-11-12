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
    **Content:** `[ { "event" : { "name" : "[string]", "description" : "[string]", "time" : "[string]", "location" : "[string]", "current_capacity" : [integer], "total_capacity" : [integer], "interest_rating" : [integer], "category" : "[string]", "host_id" : "[string]" } } ]`
    
    An array containing exactly 0 or 1 item.
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
