class UserScore {
    constructor(dbName, storeName, initialID) {
        this.db = null;
        this.dbName = dbName;
        this.storeName = storeName;
        this.dbVersion = 3; 
    }

    createDatabase() {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(this.dbName, this.dbVersion);
            request.onerror = (event) => {
                console.error("An error has occurred with indexedDB:", event.target.errorCode);
                reject(new Error(`IndexedDB error: ${event.target.errorCode}`));
            };
            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(); // Resolve the promise once the db is successfully assigned
            };
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                this.db.createObjectStore(this.storeName, { autoIncrement: true });
            };
        });
    }
    

    async addItem(item) {
        try {
            this.createDatabase();
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            store.add(item);
        } catch (error) {
            console.error("addItem error:", error);
        }
    }

    async getLatestElement() {
        try {
            await this.createDatabase(); 
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
    
            return await new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const items = event.target.result;
                    if (items.length > 0) {
                        resolve(items[items.length - 1]); 
                    } else {
                        resolve(null); 
                    }
                };
    
                request.onerror = (event) => {
                    reject(event.target.error); 
                };
            });
        } catch (error) {
            console.error("getLatestElement error:", error);
            throw error; 
        }
    }

    async allScores(){
        try{
            await this.createDatabase();
            const transaction = this.db.transaction([this.storeName], "readonly");
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
            let scoreNav = document.getElementById("scoreNav");
            request.onsuccess = function(event) {
                for(let value of event.target.result) {
                    let newDiv = document.createElement("div");
                    newDiv.classList.add('scoreDiv');
                    let nameDiv = document.createElement("div");
                    let nameText = document.createTextNode(`Score: ${value.name}`);
                    nameDiv.appendChild(nameText);
                    newDiv.appendChild(nameDiv);
                
                    let timeDiv = document.createElement("div");
                    let timeText = document.createTextNode(`Time: ${value.time}s`);
                    timeDiv.appendChild(timeText);
                    newDiv.appendChild(timeDiv);
                
                    let scorePerSecDiv = document.createElement("div");
                    let scorePerSecText = document.createTextNode(`Score/s: ${value.scorePerSec}`);
                    scorePerSecDiv.appendChild(scorePerSecText);
                    newDiv.appendChild(scorePerSecDiv);
                    if(scoreNav.firstChild){
                        scoreNav.insertBefore(newDiv, scoreNav.firstChild);
                    }else{
                        scoreNav.appendChild(newDiv);
                    }
                }
            };
            
            request.onerror = function(event) {
                console.error("Error fetching data from IndexedDB:", event.target.errorCode);
            };
            

        }catch(error){
            console.error("getLatestElement error:", error);
            throw error; 
        }
    }
    
    
}

export default UserScore;
