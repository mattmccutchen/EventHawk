**Update Vote**
----
  Update a single EventHawk event vote.

* **URL**

  /votes/:id

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
 
   `{ "vote" : { "value" : [integer] } }`

* **Success Response:**

  * **Code:** 202 ACCEPTED <br />
    **Content:** `{ "vote" : { "value" : [integer], "voter_id" : "[string]", "event_id" : [string], "vote_id" : [string], "is_active" : "true" } }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** ``
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** ``
  * **Code:** 403 FORBIDDEN <br />
    **Content:** ``
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
