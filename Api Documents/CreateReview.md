**Create New Review**
----
  Create a new review for an EventHawk event.

* **URL**

  /reviews

* **Method:**
  
  POST

* **Headers:**

  `Content-Type: application/json`

  `Authorization: Bearer [token]`

* **Data Params**

   **Required:**
 
   `{ "review" : { "event_id" : [string], "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer], "reviewer_id" : [string] } }`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ "review" : { "reviewer_id" : "[string]", "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer], "review_id" : "[string]", "event_id" : [string], "is_active" : "true" } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
  * **Code:** 409 CONFLICT <br />
    **Content:** `{ "review" : { "reviewer_id" : "[string]", "host_prep" : [integer], "matched_desc" : [integer], "would_ret" : [integer], "review_id" : "[string]", "event_id" : [string], "is_active" : "true" } }`
