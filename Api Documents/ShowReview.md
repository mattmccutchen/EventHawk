**Show Review**
----
  Returns JSON data about a single EventHawk event review.

* **URL**

  /events/:event_id/reviews/:review_id

* **Method:**
  
  GET
 
*  **URL Params**

   **Required:**
 
   `event_id=[string]`
   
   `review_id=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "review" : { "reviewer_id" : "[string]", "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer] } }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`