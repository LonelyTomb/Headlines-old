import idb from 'idb'

let dbPromise = idb.open('headlines', 4, (upgradeDb) => {
	switch (upgradeDb.oldVersion) {
		case 0:
			let keyVal = upgradeDb.createObjectStore('keyval')
			keyVal.put('world', 'hello')
		case 1:
			upgradeDb.createObjectStore('people', {keyPath: 'name'})
		case 2:
			let peopleStore = upgradeDb.transaction.objectStore('people')
			peopleStore.createIndex('animal', 'favoriteAnimal')
		case 3:
			let ageStore = upgradeDb.transaction.objectStore('people')
			ageStore.createIndex('age', 'age')
	}
})
dbPromise.then(db => {
	let tx = db.transaction('keyval')
	let keyValStore = tx.objectStore('keyval')
	return keyValStore.get('hello')
}).then(val => {
	console.log(`The value of "hello" is ${val}`)
})

dbPromise.then(db => {
	let tx = db.transaction('keyval', 'readwrite')
	let keyValStore = tx.objectStore('keyval')
	keyValStore.put('bar', 'foo')
	return tx.complete
}).then(() => {
	console.log('Added foo:bar to keyval')
})

dbPromise.then(db => {
	let tx = db.transaction('keyval', 'readwrite')
	let keyValStore = tx.objectStore('keyval')
	keyValStore.put('cat', 'favoriteAnimal')
	return keyValStore.get('favoriteAnimal')
}).then(val => {
	console.log(`Favorite Animal: ${val}`)
})

dbPromise.then(db => {
	let tx = db.transaction('people', 'readwrite')
	let peopleStore = tx.objectStore('people')

	peopleStore.put({
		name: 'Vic',
		age: 22,
		favoriteAnimal: 'cat'
	})
	peopleStore.put({
		name: 'Fav',
		age: 19,
		favoriteAnimal: 'cat'
	})
	peopleStore.put({
		name: 'Tunji',
		age: 24,
		favoriteAnimal: 'dog'
	})
	peopleStore.put({
		name: 'Jw',
		age: 23,
		favoriteAnimal: 'dog'
	})
	return tx.complete
}).then(() => {
	console.log('done')
})

dbPromise.then(db => {
	let tx = db.transaction('people')
	let peopleStore = tx.objectStore('people')
	// let animalIndex = peopleStore.index('animal')
	let ageIndex = peopleStore.index('age')

	return ageIndex.getAll('age')
}).then(vals => {
	console.log(vals)
})

dbPromise.then(db => {
	let tx = db.transaction('people')
	let peopleStore = tx.objectStore('people')
	let ageIndex = peopleStore.index('age')

	return ageIndex.openCursor()
}).then(function logPerson(cursor) {
	if (!cursor) return
	console.log(`Cursor at: ${cursor.value.name}`)
	return cursor.continue().then(logPerson)
}).then(() => {
	console.log('done')
})
