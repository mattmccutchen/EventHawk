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
    **Content:** `{ "event" : { "name" : "[string]", "description" : "[string]", "time" : "[string]", "location" : "[string]", "total_capacity" : [integer], "category" : "[string]", "host_id" : "[string]", "event_id" : "[string]", "_current_capacity" : "[integer]", "_interest_raing" : "[integer]", "_review_matched_desc" : [integer], "_review_host_prep" : "[integer], "_review_would_ret" : "[integer], "_my_vote" : "[string]", "_my_review" : "[string]", "_my_ticket" : "[string]" } }`
    
    An array containing exactly 0 or 1 item.
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
