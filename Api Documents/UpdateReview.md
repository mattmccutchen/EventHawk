**Update Review**
----
  Update a single EventHawk event review.

* **URL**

  /events/:event_id/reviews/:review_id

* **Method:**
  
  PUT
  
*  **URL Params**

   **Required:**
 
   `event_id=[string]`
   
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
    **Content:** `{ "review" : { "reviewer_id" : "[string]", "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer] } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`