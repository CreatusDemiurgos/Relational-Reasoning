class UserScore {
    constructor(dbName, storeName, initialID) {
        this.db = null;
        this.dbName = dbName;
        this.storeName = storeName;
        this.dbVersion = 3; 
    }

    createDatabase() {
            const request = window.indexedDB.open(this.dbName, this.dbVersion);
            request.onerror = (event) => {
                console.error("An error has occurred with indexedDB:", event.target.errorCode);
            };
            request.onsuccess = (event) => {
                this.db = event.target.result;
            };
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                this.db.createObjectStore(this.storeName, { autoIncrement:true });

            };
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
    
    
}

export default UserScore;
