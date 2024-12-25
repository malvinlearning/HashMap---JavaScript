class HashMap {

    constructor(initialCapacity = 8, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity).fill(null).map(() => []);
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
    
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
    
        return hashCode;
      }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []); // Reset the buckets
        this.size = 0;
    }

    keys() {
        const keys = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(elements =>{
                keys.push(elements[0]);
            });
        });
        return keys;
    }

    values() {
        const values = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(elements =>{
                values.push(elements[1]);
            });
        });
        return values;
    }

    entries() {
        const entries = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(elements =>{
                entries.push(elements);
            });
        });
        return entries;
    }
    

    resize() {
        this.capacity *= 2;
        const oldBuckets = this.buckets;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);

        this.size = 0;

        for (const bucket of oldBuckets) {
            for (const [key,value] of bucket){
                this.set(key,value);
            }
        }
    }
}

class HashSet {
    constructor(initialCapacity = 8, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity).fill(null).map(() => []);
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
    
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
    
        return hashCode;
    }

    add(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Avoid adding duplicates
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === key) {
                return; // Key already exists, so do nothing
            }
        }

        bucket.push(key);
        this.size++;

        // Resize if load factor exceeds
        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        return bucket.includes(key);
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i] === key) {
                bucket.splice(i, 1); // Remove the key from the bucket
                this.size--;
                return true;
            }
        }

        return false;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        const keysArray = [];
        this.buckets.forEach(bucket => {
            bucket.forEach(key => {
                keysArray.push(key);
            });
        });
        return keysArray;
    }

    resize() {
        this.capacity *= 2;
        const oldBuckets = this.buckets;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);

        this.size = 0;

        // Rehash all existing keys into the new bucket array
        for (const bucket of oldBuckets) {
            for (const key of bucket) {
                this.add(key);
            }
        }
    }
}


const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('elephant', 'blue')
test.set('frog', 'green')
test.set('grape', 'purple')
console.log(test.get('elephant'));
console.log(test.has('elephant'))
console.log(test.remove('elephant'))
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
    
    