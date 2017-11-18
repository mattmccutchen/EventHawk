**Index Events**
----
  Returns JSON data about all future EventHawk events.

* **URL**

  /events

* **Method:**
  
  GET
  
*  **URL Params**

	**Required:**

	`category=[string]`
	`hostedBy=[string]`
	`attendedBy=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ [ [string], ... ] }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "error" : ["string"] }`
