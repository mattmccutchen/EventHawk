**Update Review**
----
  Update a single EventHawk event review.

* **URL**

  /reviews/:review_id

* **Method:**
  
  PUT
  
*  **URL Params**

   **Required:**
    
   `review_id=[string]`
 
* **Data Params**

   **Required:**
 
   `{ "review" : { <one_or_more_optional> } }`
   
   **Optional:**
   
   `{ "host_prep" : [integer] }` <br/>
   `{ "matched_desc" : [integer] }` <br/>
   `{ "would_ret" : [integer] }`

* **Success Response:**

  * **Code:** 202 ACCEPTED <br />
    **Content:** `{ "review" : { "reviewer_id" : "[string]", "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer], "event_id" : [string] } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
