**Update Review**
----
  Update a single EventHawk event review.

* **URL**

  /reviews/:id

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
 
   `{ "review" : { <one_or_more_optional> } }`
   
   **Optional:**
   
   `{ "host_prep" : [integer] }` <br/>
   `{ "matched_desc" : [integer] }` <br/>
   `{ "would_ret" : [integer] }`

* **Success Response:**

  * **Code:** 202 ACCEPTED <br />
    **Content:** `{ "review" : { "reviewer_id" : "[string]", "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer], "review_id" : "[string]", "event_id" : [string], "is_active" : "true" } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
