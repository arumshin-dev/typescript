/* LocalStorage API */
interface SStorage<T> {
  [key:string]: T;
}

class LocalStorage<T> {
  private storage: SStorage<T> = {}
  setItem(key:string, value:T){
    this.storage[key] = value;
  }
  getItem(key:string):T{
    return this.storage[key]
  }
  clearItem(key:string){
    delete this.storage[key]
  }
  clear(){
    this.storage = {}
  }
  
}

const stringsStorage = new LocalStorage<string>()
console.log(stringsStorage)//LocalStorage { storage: {} }
console.log(stringsStorage.getItem('name'))//undefined
console.log(stringsStorage.setItem('name', 'John'))//undefined
console.log(stringsStorage.getItem('name'))//John
console.log(stringsStorage)//LocalStorage { storage: { name: 'John' } }
console.log(stringsStorage.setItem('test', 'TEST'))//undefined
console.log(stringsStorage)//LocalStorage { storage: { name: 'John', test: 'TEST' } }
//stringsStorage.clearItem('name')
stringsStorage.clear()
console.log(stringsStorage)//LocalStorage { storage: { name: 'John' } }//LocalStorage { storage: {} }

const booleansStorage = new LocalStorage<boolean>();
console.log(booleansStorage.getItem('isLoggedIn'))//undefined
console.log(booleansStorage.setItem('isLoggedIn', true))//undefined
console.log(booleansStorage.getItem('isLoggedIn'))//true
console.log(booleansStorage)//LocalStorage { storage: { isLoggedIn: true } }

