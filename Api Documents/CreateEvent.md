**Create New Event**
----
  Create a new EventHawk event.

* **URL**

  /events

* **Method:**
  
  POST

* **Headers:**

  `Content-Type: application/json`

  `Authorization: Bearer [token]`

* **Data Params**

   **Required:**
 
   `{ "event" : { "name" : "[string]", "description" : "[string]", "time" : "[string]", "location" : "[string]", "total_capacity" : [integer], "category" : "[string]" } }`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ "event" : { "name" : "[string]", "description" : "[string]", "time" : "[string]", "location" : "[string]", "total_capacity" : [integer], "category" : "[string]", "host_id" : "[string]", "event_id" : "[string]", "_current_capacity" : "[integer]", "_interest_raing" : "[integer]", "_review_matched_desc" : [integer], "_review_host_prep" : "[integer], "_review_would_ret" : "[integer], "_my_vote" : "[string]", "_my_review" : "[string]", "_my_ticket" : "[string]" } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
  * **Code:** 409 CONFLICT <br />
    **Content:** `{ "event" : { "name" : "[string]", "description" : "[string]", "time" : "[string]", "location" : "[string]", "total_capacity" : [integer], "category" : "[string]", "host_id" : "[string]", "event_id" : "[string]", "_current_capacity" : "[integer]", "_interest_raing" : "[integer]", "_review_matched_desc" : [integer], "_review_host_prep" : "[integer], "_review_would_ret" : "[integer], "_my_vote" : "[string]", "_my_review" : "[string]", "_my_ticket" : "[string]" } }`
