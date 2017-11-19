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
   `{ "total_capacity" : [integer] }` <br/>
   `{ "category" : "[string]" }`<br/>

* **Success Response:**

  * **Code:** 202 ACCEPTED <br />
    **Content:** `{ "event" : { "name" : "[string]", "description" : "[string]", "time" : "[string]", "location" : "[string]", "total_capacity" : [integer], "category" : "[string]", "host_id" : "[string]", "event_id" : "[string]", "_current_capacity" : "[integer]", "_interest_raing" : "[integer]", "_review_matched_desc" : [integer], "_review_host_prep" : "[integer], "_review_would_ret" : "[integer], "_my_vote" : "[string]", "_my_review" : "[string]", "_my_ticket" : "[string]" } }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** ``
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** ``
  * **Code:** 403 FORBIDDEN <br />
    **Content:** ``
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
