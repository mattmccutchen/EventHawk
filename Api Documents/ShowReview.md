**Show Review**
----
  Returns JSON data about a single EventHawk event review.

* **URL**

  /reviews/:review_id

* **Method:**
  
  GET
 
*  **URL Params**

   **Required:**
    
   `review_id=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "review" : { "reviewer_id" : "[string]", "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer], "review_id" : [string], "event_id" : [string] } }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
