**Update Vote**
----
  Update a single EventHawk event vote.

* **URL**

  /votes/:vote_id

* **Method:**
  
  PUT
 
*  **URL Params**

   **Required:**
    
   `vote_id=[string]`
 
* **Data Params**

   **Required:**
 
   `{ "vote" : { "value" : [integer] } }`

* **Success Response:**

  * **Code:** 202 ACCEPTED <br />
    **Content:** `{ "vote" : { "value" : [integer], "voter_id" : "[string]", "event_id" : [string] } }`
 
* **Error Response:**

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ "error" : ["string"] }`
