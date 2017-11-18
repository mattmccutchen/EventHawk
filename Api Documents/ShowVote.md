**Show Vote**
----
  Returns JSON data about a single EventHawk event vote.

* **URL**

  /votes/:id

* **Method:**
  
  GET
 
*  **URL Params**

   **Required:**
    
   `id=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "vote" : { "value" : [integer], "voter_id" : "[string]", "event_id" : [string], "vote_id" : [string], "is_active" : "true" } }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
