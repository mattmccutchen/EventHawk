**Show Vote**
----
  Returns JSON data about a single EventHawk event vote.

* **URL**

  /votes/:vote_id

* **Method:**
  
  GET
 
*  **URL Params**

   **Required:**
    
   `vote_id=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "vote" : { "value" : [integer], "voter_id" : "[string]", "event_id" : "[string]" } }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
