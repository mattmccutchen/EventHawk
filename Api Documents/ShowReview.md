**Show Review**
----
  Returns JSON data about a single EventHawk event review.

* **URL**

  /reviews/:id

* **Method:**
  
  GET
 
*  **URL Params**

   **Required:**
    
   `id=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "review" : { "reviewer_id" : "[string]", "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer], "review_id" : "[string]", "event_id" : [string], "is_active" : "true" } }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
